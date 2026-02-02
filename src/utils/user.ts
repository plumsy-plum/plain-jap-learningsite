import { db, auth } from "./firebase";
import { collection, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export interface UserData {
  userId: string;
  condition: "control" | "treatment";
  assignedAt: any;
  createdAt?: any;
}

export const initializeUser = async (): Promise<UserData | null> => {
  try {
    // Wait for user to be authenticated
    const user = await new Promise<any>((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(
        (currentUser) => {
          unsubscribe();
          if (currentUser) {
            resolve(currentUser);
          } else {
            reject(new Error("User not authenticated"));
          }
        },
        reject
      );
    });

    const userDocRef = doc(collection(db, "users"), user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("User exists in Firestore:", user.uid);
      return userDoc.data() as UserData;
    } else {
      // Create new user document
      const conditions = ["control", "treatment"];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)] as "control" | "treatment";

      const userData: UserData = {
        userId: user.uid,
        condition: randomCondition,
        assignedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      };

      await setDoc(userDocRef, userData);
      console.log(`New user created: ${user.uid} with condition: ${randomCondition}`);
      return userData;
    }
  } catch (error) {
    console.error("Error initializing user:", error);
    return null;
  }
};

export const getCurrentUser = async (): Promise<UserData | null> => {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const userDocRef = doc(collection(db, "users"), user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const getUserCondition = async (): Promise<"control" | "treatment" | null> => {
  const userData = await getCurrentUser();
  return userData?.condition || null;
};

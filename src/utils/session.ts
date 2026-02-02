import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { getTotalInteractions } from "./logger";

export interface SessionData {
  sessionId: string;
  level?: string;
  sessionStart: number;
  sessionEnd?: number;
  totalTime?: number;
  totalInteractions?: number;
}

let currentSession: SessionData | null = null;
let isEndingSession = false;

// Generate a unique session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const initSession = (level?: string): SessionData => {
  isEndingSession = false;
  currentSession = {
    sessionId: generateSessionId(),
    level,
    sessionStart: Date.now()
  };

  // Set up beforeunload listener to end session
  const handleBeforeUnload = () => {
    endSession();
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Also handle route changes in SPA
  const handlePageHide = () => {
    endSession();
  };

  window.addEventListener('pagehide', handlePageHide);

  console.log(`Session started: ${currentSession.sessionId}`);
  return currentSession;
};

export const endSession = async (): Promise<SessionData | null> => {
  // Prevent duplicate saves
  if (isEndingSession || !currentSession) {
    return currentSession || null;
  }

  isEndingSession = true;
  currentSession.sessionEnd = Date.now();
  currentSession.totalTime = currentSession.sessionEnd - currentSession.sessionStart;
  currentSession.totalInteractions = getTotalInteractions();

  try {
    const user = auth.currentUser;
    if (user) {
      // Write to Firestore
      await addDoc(collection(db, "sessions"), {
        userId: user.uid,
        ...currentSession,
        timestamp: serverTimestamp()
      });
    }
  } catch (error) {
    console.error("Error saving session to Firestore:", error);
  }

  console.log(`Session ended: ${currentSession.sessionId}. Duration: ${(currentSession.totalTime / 1000).toFixed(2)}s. Interactions: ${currentSession.totalInteractions}`);
  const sessionToReturn = { ...currentSession };
  currentSession = null;
  isEndingSession = false;
  return sessionToReturn;
};

export const getCurrentSession = (): SessionData | null => {
  return currentSession;
};

export const getSession = (): SessionData | null => {
  return currentSession ? { ...currentSession } : null;
};

export const getSessions = async (): Promise<SessionData[]> => {
  try {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(collection(db, "sessions"), where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        sessionId: data.sessionId,
        level: data.level,
        sessionStart: data.sessionStart,
        sessionEnd: data.sessionEnd,
        totalTime: data.totalTime
      } as SessionData;
    });
  } catch (error) {
    console.error("Error retrieving sessions from Firestore:", error);
    return [];
  }
};

export const clearSessions = (): void => {
  // Note: Clearing from Firestore would require batch delete
  // For now, just log - implement batch delete if needed
  console.log("clearSessions: Implement batch delete in Firestore if needed");
};

export const getSessionStats = async () => {
  const sessions = await getSessions();
  const totalSessions = sessions.length;
  const totalTimeSpent = sessions.reduce((sum, session) => sum + (session.totalTime || 0), 0);
  const avgSessionTime = totalSessions > 0 ? totalTimeSpent / totalSessions : 0;

  const sessionsByLevel: { [key: string]: number } = {};
  sessions.forEach(session => {
    if (session.level) {
      sessionsByLevel[session.level] = (sessionsByLevel[session.level] || 0) + 1;
    }
  });

  return {
    totalSessions,
    totalTimeSpent: Math.round(totalTimeSpent / 1000),
    avgSessionTime: Math.round(avgSessionTime / 1000),
    sessionsByLevel
  };
};

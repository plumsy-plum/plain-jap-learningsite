import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getCurrentSession } from "./session";

export interface LogEvent {
  userId?: string;
  sessionId?: string;
  eventType: string;
  level: string;
  questionId: number;
  responseTime: number;
  isCorrect: boolean;
  timestamp?: any;
}

// In-memory cache for performance
let eventLog: LogEvent[] = [];
let totalInteractions = 0;

export const logEvent = async (event: LogEvent): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn("User not authenticated, cannot log event");
      return;
    }

    const session = getCurrentSession();
    const sessionId = session?.sessionId || "unknown";

    // Create complete event with all required fields
    const completeEvent: LogEvent = {
      userId: user.uid,
      sessionId,
      eventType: event.eventType,
      level: event.level,
      questionId: event.questionId,
      responseTime: event.responseTime,
      isCorrect: event.isCorrect
    };

    // Add to Firestore
    await addDoc(collection(db, "interactions"), {
      ...completeEvent,
      timestamp: serverTimestamp()
    });

    // Also keep in-memory cache
    eventLog.push({
      ...completeEvent,
      timestamp: Date.now()
    });

    totalInteractions++;
  } catch (error) {
    console.error("Error logging event to Firestore:", error);
  }
};

export const getLogs = (): LogEvent[] => {
  return [...eventLog];
};

export const clearLogs = (): void => {
  eventLog = [];
};

export const getLogsByLevel = (level: string): LogEvent[] => {
  return eventLog.filter(log => log.level === level);
};

export const getLogStats = () => {
  const totalEvents = eventLog.length;
  const correctAnswers = eventLog.filter(log => log.isCorrect).length;
  const avgResponseTime = eventLog.length > 0
    ? eventLog.reduce((sum, log) => sum + log.responseTime, 0) / eventLog.length
    : 0;

  return {
    totalEvents,
    totalInteractions,
    correctAnswers,
    accuracy: totalEvents > 0 ? ((correctAnswers / totalEvents) * 100).toFixed(2) + '%' : '0%',
    avgResponseTime: Math.round(avgResponseTime / 1000 * 100) / 100
  };
};

export const getTotalInteractions = (): number => {
  return totalInteractions;
};

export const resetInteractionCount = (): void => {
  totalInteractions = 0;
};

import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hiragana } from "../data/hiragana";
import { katakana } from "../data/katakana";
import { kanji } from "../data/kanji";
import { logEvent } from "../utils/logger";
import "./Quiz.css";

interface ResponseTime {
  questionIndex: number;
  responseTime: number;
  correct: boolean;
}

const Quiz: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();

  // Load dataset based on level
  const getDataset = () => {
    switch (level) {
      case "hiragana":
        return hiragana;
      case "katakana":
        return katakana;
      case "kanji":
        return kanji;
      default:
        return [];
    }
  };

  // Generate random questions
  const questions = useMemo(() => {
    const dataset = getDataset();
    const shuffled = [...dataset].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);

    return selected.map((item: any) => {
      const isKanji = level === "kanji";
      const correctAnswer = isKanji ? item.meaning : item.romaji;
      const allItems = dataset;

      // Get 3 wrong answers
      const wrongAnswers = allItems
        .filter((x: any) => (isKanji ? x.meaning !== correctAnswer : x.romaji !== correctAnswer))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((x: any) => (isKanji ? x.meaning : x.romaji));

      // Shuffle options
      const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

      return {
        question: item.char,
        correct: correctAnswer,
        options,
      };
    });
  }, [level]);

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [responseTimes, setResponseTimes] = useState<ResponseTime[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);

  // Log quiz start
  useEffect(() => {
    const logStart = async () => {
      if (!quizStarted && questions.length > 0) {
        await logEvent({
          eventType: "quiz_start",
          level: level || "unknown",
          questionId: 0,
          responseTime: 0,
          isCorrect: false
        });
        setQuizStarted(true);
      }
    };
    logStart();
  }, [quizStarted, questions.length, level]);

  // Record time when question is shown
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQ]);

  // Log quiz complete when all questions answered
  useEffect(() => {
    const logComplete = async () => {
      if (currentQ >= questions.length && questions.length > 0) {
        const avgResponseTime = responseTimes.length > 0
          ? Math.round(responseTimes.reduce((sum: number, rt: ResponseTime) => sum + rt.responseTime, 0) / responseTimes.length / 1000 * 100) / 100
          : 0;

        await logEvent({
          eventType: "quiz_complete",
          level: level || "unknown",
          questionId: questions.length,
          responseTime: Math.round(avgResponseTime * 1000),
          isCorrect: score === questions.length
        });
      }
    };
    logComplete();
  }, [currentQ, questions.length, responseTimes, score, level]);

  const handleAnswer = async (selected: string) => {
    const responseTime = Date.now() - questionStartTime;
    const isCorrect = selected === questions[currentQ].correct;

    // Log the event
    await logEvent({
      eventType: "quiz_answer",
      level: level || "unknown",
      questionId: currentQ,
      responseTime,
      isCorrect
    });

    setResponseTimes([...responseTimes, {
      questionIndex: currentQ,
      responseTime,
      correct: isCorrect
    }]);
    setSelectedAnswer(selected);
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const handleNext = () => {
    setCurrentQ(currentQ + 1);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQ >= questions.length) {
    const avgResponseTime = responseTimes.length > 0
      ? Math.round(responseTimes.reduce((sum: number, rt: ResponseTime) => sum + rt.responseTime, 0) / responseTimes.length / 1000 * 100) / 100
      : 0;

    return (
      <div className="quiz-container">
        <h2>Quiz Complete!</h2>
        <p>Score: {score} / {questions.length}</p>
        <p>Average Response Time: {avgResponseTime}s</p>
        <button onClick={() => navigate(`/${level}`)}>Back to {level}</button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="quiz-container">
      <h2>{level?.charAt(0).toUpperCase()}{level?.slice(1)} Quiz</h2>
      <p>Question {currentQ + 1} / {questions.length}</p>
      <div className="question">{q.question}</div>
      <div className="options">
        {q.options.map((opt: string, idx: number) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            disabled={answered}
            className={
              answered
                ? opt === q.correct
                  ? "correct"
                  : opt === selectedAnswer
                  ? "incorrect"
                  : ""
                : ""
            }
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <button onClick={handleNext} className="next-button">
          {currentQ < questions.length - 1 ? "Next" : "Finish"}
        </button>
      )}
    </div>
  );
};

export default Quiz;

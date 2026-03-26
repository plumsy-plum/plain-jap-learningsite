import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hiragana } from "../data/hiragana";
import { katakana } from "../data/katakana";
import { kanji } from "../data/kanji";
import { APP_DATA } from "../data/levels";
import { logEvent, logSession } from "../utils/logger";
import "./Quiz.css";

interface ResponseTime {
  questionIndex: number;
  responseTime: number;
  correct: boolean;
}

interface QuizQuestion {
  prompt: string;
  choices: string[];
  correct: string;
}

interface QuizItem {
  character: string;
  romaji?: string;
  meaning?: string;
  example?: string;
}

const Quiz: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const navigate = useNavigate();

  const baseLevel = (level || "").toLowerCase().split("-")[0];

  const dataset: QuizItem[] = useMemo(() => {
    if (baseLevel === "hiragana") {
      return hiragana.map(item => ({ character: item.char, romaji: item.romaji }));
    }
    if (baseLevel === "katakana") {
      return katakana.map(item => ({ character: item.char, romaji: item.romaji }));
    }
    if (baseLevel === "kanji") {
      return kanji.map(item => ({ character: item.char, meaning: item.meaning, example: item.example }));
    }

    const levelEntry = APP_DATA.find(l => l.levelId.toLowerCase() === (level || "").toLowerCase());
    if (levelEntry) {
      return levelEntry.items.map(item => ({
        character: item.character,
        romaji: item.romaji,
        meaning: item.meaning,
        example: item.example
      }));
    }

    return [];
  }, [baseLevel, level]);

  const questions: QuizQuestion[] = useMemo(() => {
    if (!dataset.length) return [];

    const answerPool = dataset
      .map(item => item.romaji || item.meaning || item.example || item.character)
      .filter((v): v is string => Boolean(v));

    return dataset.map(item => {
      const correctAnswer = item.romaji || item.meaning || item.example || item.character || "";

      const wrongAnswers = answerPool
        .filter(ans => ans !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      while (wrongAnswers.length < 3 && answerPool.length > 1) {
        const candidate = answerPool[Math.floor(Math.random() * answerPool.length)];
        if (candidate !== correctAnswer && !wrongAnswers.includes(candidate)) {
          wrongAnswers.push(candidate);
        }
      }

      const choices = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

      return {
        prompt: item.character,
        choices,
        correct: correctAnswer
      };
    });
  }, [dataset]);

  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [responseTimes, setResponseTimes] = useState<ResponseTime[]>([]);
  const [incorrectClicks, setIncorrectClicks] = useState(0);
  const [timer, setTimer] = useState(0);
  const [streak, setStreak] = useState(0);
  const [streakBroken, setStreakBroken] = useState(false);

  const quizStartRef = useRef<number>(Date.now());

  useEffect(() => {
    quizStartRef.current = Date.now();
    setTimer(0);
  }, [questions.length]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer(Math.floor((Date.now() - quizStartRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (questions.length === 0) return;
    logEvent({ eventType: "quiz_start", level: level || "unknown" });
  }, [level, questions.length]);

  useEffect(() => {
    if (currentQ >= questions.length && questions.length > 0) {
      const avgResponseTimeMs =
        responseTimes.reduce((sum, rt) => sum + rt.responseTime, 0) / Math.max(responseTimes.length, 1);

      logSession({
        level: level || "unknown",
        score,
        totalQuestions: questions.length,
        incorrectClicks,
        avgResponseTime: Math.round(avgResponseTimeMs)
      });
    }
  }, [currentQ, incorrectClicks, level, questions.length, responseTimes, score]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQ]);

  const handleOptionSelect = async (choice: string) => {
    if (feedback) return;
    const responseTime = Date.now() - questionStartTime;
    const isCorrect = choice === questions[currentQ].correct;

    await logEvent({
      eventType: "quiz_answer",
      level: level || "unknown",
      questionId: currentQ,
      responseTime,
      isCorrect
    });

    if (!isCorrect) {
      setIncorrectClicks(prev => prev + 1);
      setStreak(0);
      setStreakBroken(true);
    }

    setResponseTimes(prev => [...prev, { questionIndex: currentQ, responseTime, correct: isCorrect }]);
    setSelectedOption(choice);
    setFeedback(isCorrect ? "Correct!" : "Incorrect!");
    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setStreakBroken(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQ >= questions.length) return;
    setCurrentQ(prev => prev + 1);
    setSelectedOption(null);
    setFeedback(null);
  };

  if (questions.length === 0) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center bg-[#2a303c] text-yellow-300 text-2xl animate-pulse"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        LOADING BATTLE...
      </div>
    );
  }

  const avgResponseTime = responseTimes.length > 0
    ? Math.round((responseTimes.reduce((sum, rt) => sum + rt.responseTime, 0) / responseTimes.length / 1000) * 100) / 100
    : 0;

  const progressPercent = Math.floor(((currentQ + 1) / questions.length) * 100);

  if (currentQ >= questions.length) {
    return (
      <div
        className="relative min-h-screen w-full flex flex-col items-center px-4 pt-24 pb-16"
        style={{ fontFamily: '"Press Start 2P", cursive' }}
      >
        <div
          className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/village bg.png')" }}
        />

        <div className="bg-[#fdf1d9] border-4 border-[#4a3018] rounded-xl p-10 shadow-[12px_12px_0_rgba(0,0,0,0.5)] max-w-xl w-full text-center text-[#4a3018] flex flex-col gap-4 relative z-10">
          <h2 className="text-3xl uppercase tracking-widest drop-shadow-sm">Quest Cleared!</h2>
          <p className="text-lg">Score: {score} / {questions.length}</p>
          <p className="text-sm">Average Response Time: {avgResponseTime}s</p>
          <button
            onClick={() => navigate(`/level/${level}`)}
            className="mt-2 inline-flex items-center justify-center gap-3 bg-[#ffe8a3] border-4 border-[#4a3018] px-8 py-4 rounded-md shadow-[6px_6px_0_#2d1a0b] hover:translate-y-[4px] hover:shadow-[2px_2px_0_#2d1a0b] active:translate-y-[6px] active:shadow-none transition-all cursor-pointer text-[#4a3018] font-bold uppercase"
          >
            Claim Rewards
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQ];

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center px-4 pt-24 pb-16"
      style={{ fontFamily: '"Press Start 2P", cursive' }}
    >
      <div
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/village bg.png')" }}
      />

      <div className="fixed top-0 left-0 w-full bg-[#1c0f13]/80 text-[#f8e8c4] border-b-4 border-[#f5c04f] shadow-[0_6px_0_#0c0508] px-4 py-3 flex items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-16 h-4 bg-[#3a1a0d] border-2 border-[#f5c04f]">
            <div
              className="h-full bg-gradient-to-r from-[#7cff7c] to-[#f5c04f]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs tracking-tight">Progress {progressPercent}%</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>Time {timer}s</span>
          <span>Score {score}</span>
          <span>Avg {avgResponseTime}s</span>
          <span className={streakBroken ? "text-red-300" : "text-[#f5c04f]"}>Streak {streakBroken ? "Broken" : streak}</span>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-8 items-start w-full max-w-5xl">
        <div className="bg-[#fdf1d9]/95 border-4 border-[#4a3018] rounded-xl p-8 shadow-[12px_12px_0_rgba(0,0,0,0.5)] min-h-[380px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_1px,_transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="relative flex flex-col gap-6 text-[#2d1a0b]">
            <div className="flex items-center justify-between">
              <span className="text-base uppercase tracking-widest">{level} Quiz</span>
              <span className="bg-[#ffe8a3] border-2 border-[#4a3018] px-3 py-2 text-xs rounded shadow-[4px_4px_0_#2d1a0b]">Q {currentQ + 1} / {questions.length}</span>
            </div>

            <div className="bg-white border-4 border-[#4a3018] rounded-lg p-6 shadow-[6px_6px_0_#2d1a0b] min-h-[120px] flex items-center text-lg leading-relaxed">
              {question.prompt}
            </div>

            <div className="w-full h-3 bg-[#3a1a0d] border-2 border-[#4a3018] rounded-sm overflow-hidden shadow-[4px_4px_0_#2d1a0b]">
              <div
                className="h-full bg-gradient-to-r from-[#7cff7c] via-[#f5c04f] to-[#f97316] transition-[width] duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {question.choices.map((choice, idx) => {
                const isSelected = selectedOption === choice;
                const isCorrect = feedback === "Correct!" && isSelected;
                const isIncorrect = feedback === "Incorrect!" && isSelected;

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(choice)}
                    disabled={!!feedback}
                    className={`relative w-full text-left px-4 py-5 border-4 rounded-lg shadow-[6px_6px_0_#2d1a0b] transition-all cursor-pointer bg-[#ffe8a3] border-[#4a3018] hover:-translate-y-1 hover:shadow-[8px_8px_0_#2d1a0b]
                      ${isSelected ? "bg-[#f5d35c]" : ""}
                      ${isCorrect ? "bg-[#7cff7c] border-[#2e6b2e] shadow-[6px_6px_0_#1f451f] hover:shadow-[6px_6px_0_#1f451f]" : ""}
                      ${isIncorrect ? "bg-[#ffb4b4] border-[#8c1c1c] shadow-[6px_6px_0_#4a0f0f] hover:shadow-[6px_6px_0_#4a0f0f]" : ""}
                    `}
                  >
                    <span className="text-sm">{choice}</span>
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div
                className={`text-center text-sm border-4 px-4 py-3 rounded-lg shadow-[6px_6px_0_#2d1a0b] uppercase tracking-wide
                  ${feedback === "Correct!" ? "bg-[#7cff7c] border-[#2e6b2e] text-[#1f451f]" : "bg-[#ffb4b4] border-[#8c1c1c] text-[#4a0f0f]"}
                `}
              >
                {feedback}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleNextQuestion}
                disabled={!selectedOption}
                className="inline-flex items-center justify-center gap-2 bg-[#ffe8a3] border-4 border-[#4a3018] px-6 py-3 rounded-md shadow-[6px_6px_0_#2d1a0b] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#2d1a0b] disabled:opacity-50 disabled:translate-y-0 disabled:shadow-[6px_6px_0_#2d1a0b] uppercase text-sm"
              >
                Next
              </button>
              <button
                onClick={() => navigate(`/level/${level}`)}
                className="inline-flex items-center justify-center gap-2 bg-[#ffb4b4] border-4 border-[#4a3018] px-6 py-3 rounded-md shadow-[6px_6px_0_#2d1a0b] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#2d1a0b] uppercase text-sm"
              >
                Run Back
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative bg-[#1c0f13]/90 border-4 border-[#f5c04f] text-[#f8e8c4] px-6 py-5 rounded-lg shadow-[8px_8px_0_#0c0508] text-xs w-72 text-center overflow-hidden flex flex-col gap-3">
            <p className="uppercase tracking-widest text-sm">Rewards</p>

            <div className="flex items-center justify-center gap-3 text-base">
              <span className="text-xl">🪙</span>
              <span className="font-semibold text-[#f5c04f]">+{feedback === "Correct!" ? 10 : 0} XP</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px]">
              <span className={`px-2 py-1 rounded border-2 ${streakBroken ? "border-red-300 bg-red-900/40 text-red-200" : "border-[#f5c04f] bg-[#f5c04f]/10 text-[#f5c04f]"}`}>
                {streakBroken ? "Streak broken" : `Streak ${streak}`}
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#f5c04f]">
              <img src="/coin.png" alt="Coin" className="h-8 w-8 object-contain drop-shadow-[0_0_6px_rgba(245,192,79,0.6)]" />
              <span className="text-[#f8e8c4]">Collect coins to power up</span>
            </div>

            {feedback === "Correct!" && (
              <div className="absolute inset-x-0 -top-1 flex justify-center animate-bounce text-lg font-bold text-[#f5c04f] drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">🪙 +10</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
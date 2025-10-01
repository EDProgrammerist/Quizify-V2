import { useState, useEffect } from 'react';
import { Clock, Check, X } from 'lucide-react';
import { QuizQuestion } from '../lib/supabase';

interface QuizGameProps {
  questions: QuizQuestion[];
  playerName: string;
  onComplete: (score: number, correctAnswers: number, timeTaken: number) => void;
}

export default function QuizGame({ questions, playerName, onComplete }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowFeedback(true);

    const isCorrect = answerIndex === currentQuestion.correct_answer;
    if (isCorrect) {
      setScore((prev) => prev + 10);
      setCorrectAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setShowFeedback(false);
      } else {
        onComplete(
          isCorrect ? score + 10 : score,
          isCorrect ? correctAnswers + 1 : correctAnswers,
          timeElapsed
        );
      }
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="mb-6 flex items-center justify-between text-white">
          <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-xl border border-white/20">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-300" />
              <span className="font-mono text-lg font-bold">{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-xl border border-white/20">
            <div className="text-center">
              <div className="text-sm text-blue-200">Score</div>
              <div className="text-2xl font-bold">{score}</div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-white/80 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up">
          <div className="mb-3 inline-block">
            <span className="px-4 py-1 bg-blue-500/30 text-blue-200 text-sm font-semibold rounded-full border border-blue-400/30">
              {currentQuestion.category}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = index === currentQuestion.correct_answer;
              const isSelected = index === selectedAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showIncorrect = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={`
                    relative p-5 rounded-xl text-left font-medium transition-all duration-300
                    ${!isAnswered && 'hover:scale-102 hover:shadow-xl'}
                    ${!showFeedback && 'bg-white/10 border border-white/20 text-white hover:bg-white/20'}
                    ${showCorrect && 'bg-green-500 border-green-400 text-white scale-102'}
                    ${showIncorrect && 'bg-red-500 border-red-400 text-white'}
                    ${showFeedback && !isSelected && !isCorrect && 'opacity-50'}
                    disabled:cursor-not-allowed
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex-1 text-lg">{option}</span>
                    {showCorrect && (
                      <Check className="w-6 h-6 ml-3 animate-scale-in" />
                    )}
                    {showIncorrect && (
                      <X className="w-6 h-6 ml-3 animate-scale-in" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 text-center text-white/60 text-sm">
          Playing as <span className="font-semibold text-white">{playerName}</span>
        </div>
      </div>
    </div>
  );
}

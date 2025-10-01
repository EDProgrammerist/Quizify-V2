import { useState } from 'react';
import { BookOpen, Trophy, Sparkles } from 'lucide-react';

interface QuizSetupProps {
  onStartQuiz: (playerName: string, questionCount: number) => void;
  onShowLeaderboard: () => void;
}

export default function QuizSetup({ onStartQuiz, onShowLeaderboard }: QuizSetupProps) {
  const [playerName, setPlayerName] = useState('');
  const [questionCount, setQuestionCount] = useState(10);

  const handleStart = () => {
    if (playerName.trim()) {
      onStartQuiz(playerName.trim(), questionCount);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-pulse-slow"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                Quizify V2
                <Sparkles className="w-6 h-6 animate-spin-slow" />
              </h1>
              <p className="text-blue-100 text-lg">Test your programming knowledge</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90">
                Your Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90">
                Number of Questions: {questionCount}
              </label>
              <input
                type="range"
                min="5"
                max="20"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-white/60">
                <span>5</span>
                <span>20</span>
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={!playerName.trim()}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
            >
              Start Quiz
            </button>

            <button
              onClick={onShowLeaderboard}
              className="w-full py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

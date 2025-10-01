import { Trophy, Clock, Target, Award, Home } from 'lucide-react';

interface QuizResultsProps {
  playerName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
}

export default function QuizResults({
  playerName,
  score,
  totalQuestions,
  correctAnswers,
  timeTaken,
  onPlayAgain,
  onViewLeaderboard,
}: QuizResultsProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: 'Outstanding!', color: 'text-yellow-300', emoji: '🌟' };
    if (percentage >= 70) return { message: 'Great Job!', color: 'text-green-300', emoji: '🎉' };
    if (percentage >= 50) return { message: 'Good Effort!', color: 'text-blue-300', emoji: '👍' };
    return { message: 'Keep Practicing!', color: 'text-orange-300', emoji: '💪' };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="relative w-full max-w-2xl animate-fade-in">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-pulse-slow"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-4 backdrop-blur animate-bounce-slow">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <h1 className={`text-5xl font-bold mb-2 ${performance.color} animate-scale-in`}>
                {performance.emoji} {performance.message}
              </h1>
              <p className="text-blue-100 text-xl">
                Congratulations, <span className="font-bold">{playerName}</span>!
              </p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center mb-8">
              <div className="text-7xl font-bold text-white mb-2 animate-scale-in">
                {score}
              </div>
              <div className="text-white/60 text-lg">Total Points</div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-2">
                  <Target className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {correctAnswers}/{totalQuestions}
                </div>
                <div className="text-white/60 text-sm">Correct</div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-2">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {percentage}%
                </div>
                <div className="text-white/60 text-sm">Accuracy</div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 transition-transform">
                <div className="flex justify-center mb-2">
                  <Clock className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {formatTime(timeTaken)}
                </div>
                <div className="text-white/60 text-sm">Time</div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={onViewLeaderboard}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                View Leaderboard
              </button>

              <button
                onClick={onPlayAgain}
                className="w-full py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

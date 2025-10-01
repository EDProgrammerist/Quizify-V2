import { useEffect, useState } from 'react';
import { Trophy, Medal, Award, ArrowLeft, Clock, Target } from 'lucide-react';
import { supabase, QuizScore } from '../lib/supabase';

interface LeaderboardProps {
  onBack: () => void;
}

export default function Leaderboard({ onBack }: LeaderboardProps) {
  const [scores, setScores] = useState<QuizScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_scores')
        .select('*')
        .order('score', { ascending: false })
        .order('time_taken', { ascending: true })
        .limit(10);

      if (error) throw error;
      setScores(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMedalIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-300" />;
    if (index === 2) return <Award className="w-6 h-6 text-orange-400" />;
    return <span className="w-6 text-center font-bold text-white/60">{index + 1}</span>;
  };

  const getRowStyle = (index: number) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30';
    if (index === 1) return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-300/30';
    if (index === 2) return 'bg-gradient-to-r from-orange-400/20 to-orange-500/20 border-orange-400/30';
    return 'bg-white/5 border-white/10';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 animate-pulse-slow"></div>
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 backdrop-blur">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
              <p className="text-blue-100">Top 10 Quiz Masters</p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-white/60 mt-4">Loading leaderboard...</p>
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 text-lg">No scores yet. Be the first to play!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {scores.map((score, index) => (
                  <div
                    key={score.id}
                    className={`
                      border rounded-xl p-4 transition-all duration-300 hover:scale-102
                      ${getRowStyle(index)}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 flex items-center justify-center">
                        {getMedalIcon(index)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-lg truncate">
                          {score.player_name}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/60 mt-1">
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {score.correct_answers}/{score.total_questions}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(score.time_taken)}
                          </span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <div className="text-3xl font-bold text-white">
                          {score.score}
                        </div>
                        <div className="text-xs text-white/60">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

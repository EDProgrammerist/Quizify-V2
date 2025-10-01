import { useState, useEffect } from 'react';
import QuizSetup from './components/QuizSetup';
import QuizGame from './components/QuizGame';
import QuizResults from './components/QuizResults';
import Leaderboard from './components/Leaderboard';
import { supabase, QuizQuestion } from './lib/supabase';

type Screen = 'setup' | 'game' | 'results' | 'leaderboard';

function App() {
  const [screen, setScreen] = useState<Screen>('setup');
  const [playerName, setPlayerName] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [questionCount, setQuestionCount] = useState(10);

  const handleStartQuiz = async (name: string, count: number) => {
    setPlayerName(name);
    setQuestionCount(count);

    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .limit(count);

      if (error) throw error;

      const shuffled = data.sort(() => Math.random() - 0.5);
      setQuestions(shuffled.slice(0, count));
      setScreen('game');
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleQuizComplete = async (finalScore: number, correct: number, time: number) => {
    setScore(finalScore);
    setCorrectAnswers(correct);
    setTimeTaken(time);

    try {
      await supabase.from('quiz_scores').insert({
        player_name: playerName,
        score: finalScore,
        total_questions: questionCount,
        correct_answers: correct,
        time_taken: time,
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }

    setScreen('results');
  };

  const handlePlayAgain = () => {
    setScreen('setup');
    setScore(0);
    setCorrectAnswers(0);
    setTimeTaken(0);
    setQuestions([]);
  };

  return (
    <>
      {screen === 'setup' && (
        <QuizSetup
          onStartQuiz={handleStartQuiz}
          onShowLeaderboard={() => setScreen('leaderboard')}
        />
      )}
      {screen === 'game' && (
        <QuizGame
          questions={questions}
          playerName={playerName}
          onComplete={handleQuizComplete}
        />
      )}
      {screen === 'results' && (
        <QuizResults
          playerName={playerName}
          score={score}
          totalQuestions={questionCount}
          correctAnswers={correctAnswers}
          timeTaken={timeTaken}
          onPlayAgain={handlePlayAgain}
          onViewLeaderboard={() => setScreen('leaderboard')}
        />
      )}
      {screen === 'leaderboard' && (
        <Leaderboard onBack={() => setScreen('setup')} />
      )}
    </>
  );
}

export default App;

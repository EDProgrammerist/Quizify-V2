import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  difficulty: string;
  category: string;
}

export interface QuizScore {
  id?: string;
  player_name: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  time_taken: number;
  created_at?: string;
}

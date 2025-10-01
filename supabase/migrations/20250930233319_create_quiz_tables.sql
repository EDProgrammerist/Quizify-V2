/*
  # Programming Quiz App Database Schema

  1. New Tables
    - `quiz_questions`
      - `id` (uuid, primary key)
      - `question` (text) - The quiz question text
      - `options` (jsonb) - Array of answer options
      - `correct_answer` (integer) - Index of correct answer
      - `difficulty` (text) - easy, medium, hard
      - `category` (text) - Programming category (JavaScript, Python, etc)
      - `created_at` (timestamptz)
    
    - `quiz_scores`
      - `id` (uuid, primary key)
      - `player_name` (text) - Name of the player
      - `score` (integer) - Final score
      - `total_questions` (integer) - Number of questions attempted
      - `correct_answers` (integer) - Number of correct answers
      - `time_taken` (integer) - Time in seconds
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Allow public read access to questions
    - Allow public insert for scores (for leaderboard submissions)
    - Allow public read access to scores for leaderboard display

  3. Important Notes
    - Questions are pre-populated for the quiz
    - Scores are publicly readable for leaderboard functionality
    - No authentication required for quiz gameplay
*/

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer integer NOT NULL,
  difficulty text DEFAULT 'medium',
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

-- Create quiz_scores table
CREATE TABLE IF NOT EXISTS quiz_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL,
  correct_answers integer NOT NULL DEFAULT 0,
  time_taken integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quiz_questions
CREATE POLICY "Anyone can read quiz questions"
  ON quiz_questions
  FOR SELECT
  USING (true);

-- RLS Policies for quiz_scores
CREATE POLICY "Anyone can read quiz scores"
  ON quiz_scores
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert quiz scores"
  ON quiz_scores
  FOR INSERT
  WITH CHECK (true);

-- Insert sample programming questions
INSERT INTO quiz_questions (question, options, correct_answer, difficulty, category) VALUES
  ('What does HTML stand for?', '["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"]', 0, 'easy', 'Web Development'),
  ('Which symbol is used for single-line comments in JavaScript?', '["//", "/*", "#", "--"]', 0, 'easy', 'JavaScript'),
  ('What is the correct way to declare a variable in Python 3?', '["var x = 5", "let x = 5", "x = 5", "int x = 5"]', 2, 'easy', 'Python'),
  ('What does CSS stand for?', '["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"]', 2, 'easy', 'Web Development'),
  ('Which data type is used to store true/false values?', '["Integer", "String", "Boolean", "Float"]', 2, 'easy', 'General'),
  
  ('What is the time complexity of binary search?', '["O(n)", "O(log n)", "O(n^2)", "O(1)"]', 1, 'medium', 'Algorithms'),
  ('Which JavaScript method is used to add elements to the end of an array?', '["push()", "pop()", "shift()", "unshift()"]', 0, 'medium', 'JavaScript'),
  ('What does SQL stand for?', '["Structured Query Language", "Simple Question Language", "Statement Query Language", "System Quality Language"]', 0, 'medium', 'Databases'),
  ('In React, what hook is used for side effects?', '["useState", "useEffect", "useContext", "useReducer"]', 1, 'medium', 'React'),
  ('What is the purpose of Git?', '["Version control", "Database management", "Web hosting", "Code compilation"]', 0, 'medium', 'Development Tools'),
  
  ('What is a closure in JavaScript?', '["A type of loop", "A function with access to outer scope", "A CSS property", "A database connection"]', 1, 'medium', 'JavaScript'),
  ('Which HTTP status code represents "Not Found"?', '["200", "301", "404", "500"]', 2, 'medium', 'Web Development'),
  ('What does API stand for?', '["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interaction", "Applied Program Interface"]', 0, 'easy', 'General'),
  ('Which Python keyword is used to define a function?', '["function", "def", "func", "define"]', 1, 'easy', 'Python'),
  ('What is the output of: console.log(typeof [])?', '["array", "object", "list", "undefined"]', 1, 'medium', 'JavaScript'),
  
  ('What is polymorphism in OOP?', '["Using multiple classes", "Ability to take multiple forms", "Inheriting properties", "Encapsulating data"]', 1, 'hard', 'Object-Oriented Programming'),
  ('Which sorting algorithm has O(n log n) average time complexity?', '["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"]', 2, 'hard', 'Algorithms'),
  ('What is the virtual DOM in React?', '["A database", "A lightweight copy of the real DOM", "A CSS framework", "A testing tool"]', 1, 'hard', 'React'),
  ('What does REST stand for in API design?', '["Representational State Transfer", "Remote Execution State Transfer", "Request State Transfer", "Resource Execution Service Transfer"]', 0, 'medium', 'Web Development'),
  ('What is the purpose of async/await in JavaScript?', '["To handle asynchronous operations", "To create loops", "To define classes", "To import modules"]', 0, 'medium', 'JavaScript');

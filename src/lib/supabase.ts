import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  level: number;
  is_premium: boolean;
  total_games: number;
  total_wins: number;
  total_goals: number;
  total_assists: number;
  rating: number;
  badges: number;
  created_at: string;
  updated_at: string;
};

export type GameDiary = {
  id: string;
  user_id: string;
  opponent_name: string;
  result: 'win' | 'loss' | 'draw';
  score_user: number;
  score_opponent: number;
  goals: number;
  assists: number;
  rating: number | null;
  notes: string | null;
  game_date: string;
  created_at: string;
};

export type Workout = {
  id: string;
  title: string;
  description: string | null;
  category: 'resistance' | 'speed' | 'technique' | 'strength';
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  exercises_count: number;
  created_at: string;
};

export type WarmupRoutine = {
  id: string;
  title: string;
  duration: number;
  exercises_count: number;
  difficulty: 'easy' | 'medium' | 'hard';
  routine_type: 'warmup' | 'cooldown';
  created_at: string;
};

export type Achievement = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  icon: string | null;
  unlocked_at: string;
};

export type CommunityPost = {
  id: string;
  user_id: string;
  content: string;
  action_type: string | null;
  likes_count: number;
  created_at: string;
  profiles?: Profile;
};

import { createClient } from '@supabase/supabase-js';

// Função para verificar se está no ambiente do navegador
const isBrowser = typeof window !== 'undefined';

// Função para verificar se as variáveis estão configuradas
const hasValidConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && url.startsWith('https://') && key.length > 20);
};

// Cliente Supabase com verificação segura
// Retorna null se não estiver no browser ou se as variáveis não estiverem configuradas
export const supabase = (isBrowser && hasValidConfig())
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    )
  : null;

// Função helper para verificar se Supabase está configurado
export const isSupabaseConfigured = () => {
  return isBrowser && hasValidConfig();
};

// Função helper para obter cliente Supabase com fallback seguro
export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    if (isBrowser) {
      console.warn('⚠️ Supabase não está configurado. Configure as variáveis de ambiente.');
    }
    return null;
  }
  return supabase;
};

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  level: number;
  is_premium: boolean;
  subscription_tier: 'free' | 'premium_monthly' | 'premium_annual' | null;
  subscription_status: 'active' | 'canceled' | 'expired' | null;
  subscription_end_date: string | null;
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
  is_premium: boolean;
  created_at: string;
};

export type WarmupRoutine = {
  id: string;
  title: string;
  duration: number;
  exercises_count: number;
  difficulty: 'easy' | 'medium' | 'hard';
  routine_type: 'warmup' | 'cooldown';
  is_premium: boolean;
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

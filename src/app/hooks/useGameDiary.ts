"use client";

import { useEffect, useState } from 'react';
import { supabase, type GameDiary } from '@/lib/supabase';

export function useGameDiary(userId: string | undefined) {
  const [games, setGames] = useState<GameDiary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId || !supabase) {
      setLoading(false);
      return;
    }

    loadGames();
  }, [userId]);

  const loadGames = async () => {
    if (!supabase || !userId) return;

    try {
      const { data, error } = await supabase
        .from('game_diary')
        .select('*')
        .eq('user_id', userId)
        .order('game_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setGames(data || []);
    } catch (error) {
      console.error('Erro ao carregar jogos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (game: Omit<GameDiary, 'id' | 'created_at' | 'user_id'>) => {
    if (!userId || !supabase) return;

    try {
      const { data, error } = await supabase
        .from('game_diary')
        .insert({ ...game, user_id: userId })
        .select()
        .single();

      if (error) throw error;
      setGames([data, ...games]);
      return data;
    } catch (error) {
      console.error('Erro ao adicionar jogo:', error);
      throw error;
    }
  };

  return { games, loading, addGame, refresh: loadGames };
}

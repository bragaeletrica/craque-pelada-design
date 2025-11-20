"use client";

import { useEffect, useState } from 'react';
import { supabase, type Workout, type WarmupRoutine } from '@/lib/supabase';

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkouts(data || []);
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
    } finally {
      setLoading(false);
    }
  };

  return { workouts, loading };
}

export function useWarmupRoutines() {
  const [routines, setRoutines] = useState<WarmupRoutine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from('warmup_routines')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRoutines(data || []);
    } catch (error) {
      console.error('Erro ao carregar rotinas:', error);
    } finally {
      setLoading(false);
    }
  };

  return { routines, loading };
}

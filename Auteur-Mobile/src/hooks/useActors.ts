import { useEffect, useState, useCallback } from 'react';
import { Actor, auteurAPI } from '../services/api';

export interface ActorsState {
  actors: Actor[];
  selectedActor: Actor | null;
  loading: boolean;
  error: string | null;
}

export interface ActorsActions {
  fetchPopularActors: (page?: number) => Promise<void>;
  fetchActorDetails: (actorId: number) => Promise<void>;
  clearError: () => void;
  clearSelectedActor: () => void;
}

export const useActors = (): ActorsState & ActorsActions => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularActors = useCallback(async (page: number = 1): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const data = await auteurAPI.getPopularActors(page);
      setActors(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch actors';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchActorDetails = useCallback(async (actorId: number): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const data = await auteurAPI.getActorDetails(actorId);
      setSelectedActor(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch actor details';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = (): void => {
    setError(null);
  };

  const clearSelectedActor = (): void => {
    setSelectedActor(null);
  };

  // Fetch popular actors on mount
  useEffect(() => {
    fetchPopularActors();
  }, [fetchPopularActors]);

  return {
    actors,
    selectedActor,
    loading,
    error,
    fetchPopularActors,
    fetchActorDetails,
    clearError,
    clearSelectedActor,
  };
};

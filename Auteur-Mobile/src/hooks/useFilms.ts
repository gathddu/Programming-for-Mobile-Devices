import { useEffect, useState, useCallback } from 'react';
import { Film, FilmDetails, auteurAPI } from '../services/api';

export interface FilmsState {
  films: Film[];
  selectedFilm: FilmDetails | null;
  loading: boolean;
  error: string | null;
}

export interface FilmsActions {
  fetchPopularFilms: (page?: number) => Promise<void>;
  fetchFilmDetails: (filmId: number) => Promise<void>;
  searchFilms: (query: string, page?: number) => Promise<void>;
  clearError: () => void;
  clearSelectedFilm: () => void;
}

export const useFilms = (): FilmsState & FilmsActions => {
  const [films, setFilms] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<FilmDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPopularFilms = useCallback(async (page: number = 1): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const data = await auteurAPI.getPopularFilms(page);
      setFilms(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch films';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFilmDetails = useCallback(async (filmId: number): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const data = await auteurAPI.getFilmDetails(filmId);
      setSelectedFilm(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch film details';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchFilms = useCallback(async (query: string, page: number = 1): Promise<void> => {
    if (!query.trim()) {
      setFilms([]);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      const data = await auteurAPI.searchFilms(query, page);
      setFilms(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search films';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = (): void => {
    setError(null);
  };

  const clearSelectedFilm = (): void => {
    setSelectedFilm(null);
  };

  // Fetch popular films on mount
  useEffect(() => {
    fetchPopularFilms();
  }, [fetchPopularFilms]);

  return {
    films,
    selectedFilm,
    loading,
    error,
    fetchPopularFilms,
    fetchFilmDetails,
    searchFilms,
    clearError,
    clearSelectedFilm,
  };
};

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
}

export interface Actor {
  id: number;
  name: string;
  profile_path: string;
  character?: string;
  known_for_department: string;
  popularity: number;
}

export interface FilmDetails extends Film {
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  cast: Actor[];
}

class AuteurAPI {
  private client: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      params: {
        api_key: API_KEY,
      },
    });
  }

  /**
   * Get popular films
   */
  async getPopularFilms(page: number = 1): Promise<Film[]> {
    try {
      const response = await this.client.get('/movie/popular', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular films:', error);
      throw error;
    }
  }

  /**
   * Get film details with cast
   */
  async getFilmDetails(filmId: number): Promise<FilmDetails> {
    try {
      const response = await this.client.get(`/movie/${filmId}`, {
        params: {
          append_to_response: 'credits',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching film details:', error);
      throw error;
    }
  }

  /**
   * Get popular actors
   */
  async getPopularActors(page: number = 1): Promise<Actor[]> {
    try {
      const response = await this.client.get('/person/popular', {
        params: { page },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular actors:', error);
      throw error;
    }
  }

  /**
   * Get actor details
   */
  async getActorDetails(actorId: number): Promise<Actor> {
    try {
      const response = await this.client.get(`/person/${actorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching actor details:', error);
      throw error;
    }
  }

  /**
   * Search films by query
   */
  async searchFilms(query: string, page: number = 1): Promise<Film[]> {
    try {
      const response = await this.client.get('/search/movie', {
        params: {
          query,
          page,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching films:', error);
      throw error;
    }
  }

  /**
   * Get image URL for poster or profile
   */
  getImageUrl(path: string | null, size: 'small' | 'medium' | 'large' = 'medium'): string {
    if (!path) {
      return 'https://via.placeholder.com/300x450?text=No+Image';
    }

    const sizes = {
      small: 'w185',
      medium: 'w342',
      large: 'w500',
    };

    return `https://image.tmdb.org/t/p/${sizes[size]}${path}`;
  }
}

export const auteurAPI = new AuteurAPI();

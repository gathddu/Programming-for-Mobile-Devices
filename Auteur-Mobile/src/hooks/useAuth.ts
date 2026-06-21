import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  AuthError,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  favoriteFilms: number[];
  favoriteActors: number[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  register: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  addFavoriteFilm: (filmId: number) => Promise<void>;
  removeFavoriteFilm: (filmId: number) => Promise<void>;
  addFavoriteActor: (actorId: number) => Promise<void>;
  removeFavoriteActor: (actorId: number) => Promise<void>;
}

export const useAuth = (): AuthState & AuthActions => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch user profile from Firestore
        const profileDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (profileDoc.exists()) {
          setUserProfile(profileDoc.data() as UserProfile);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string, displayName: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile
      await updateProfile(result.user, { displayName });

      // Create Firestore document
      const userProfile: UserProfile = {
        uid: result.user.uid,
        email: result.user.email || '',
        displayName,
        favoriteFilms: [],
        favoriteActors: [],
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', result.user.uid), userProfile);
      setUserProfile(userProfile);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setError(null);
      setLoading(true);
      await signOut(auth);
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addFavoriteFilm = async (filmId: number): Promise<void> => {
    if (!user || !userProfile) return;

    try {
      const updatedFavorites = [...userProfile.favoriteFilms, filmId];
      await setDoc(
        doc(db, 'users', user.uid),
        { favoriteFilms: updatedFavorites },
        { merge: true }
      );
      setUserProfile({ ...userProfile, favoriteFilms: updatedFavorites });
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
    }
  };

  const removeFavoriteFilm = async (filmId: number): Promise<void> => {
    if (!user || !userProfile) return;

    try {
      const updatedFavorites = userProfile.favoriteFilms.filter((id) => id !== filmId);
      await setDoc(
        doc(db, 'users', user.uid),
        { favoriteFilms: updatedFavorites },
        { merge: true }
      );
      setUserProfile({ ...userProfile, favoriteFilms: updatedFavorites });
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
    }
  };

  const addFavoriteActor = async (actorId: number): Promise<void> => {
    if (!user || !userProfile) return;

    try {
      const updatedFavorites = [...userProfile.favoriteActors, actorId];
      await setDoc(
        doc(db, 'users', user.uid),
        { favoriteActors: updatedFavorites },
        { merge: true }
      );
      setUserProfile({ ...userProfile, favoriteActors: updatedFavorites });
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
    }
  };

  const removeFavoriteActor = async (actorId: number): Promise<void> => {
    if (!user || !userProfile) return;

    try {
      const updatedFavorites = userProfile.favoriteActors.filter((id) => id !== actorId);
      await setDoc(
        doc(db, 'users', user.uid),
        { favoriteActors: updatedFavorites },
        { merge: true }
      );
      setUserProfile({ ...userProfile, favoriteActors: updatedFavorites });
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
    }
  };

  const clearError = (): void => {
    setError(null);
  };

  return {
    user,
    userProfile,
    loading,
    error,
    register,
    login,
    logout,
    clearError,
    addFavoriteFilm,
    removeFavoriteFilm,
    addFavoriteActor,
    removeFavoriteActor,
  };
};

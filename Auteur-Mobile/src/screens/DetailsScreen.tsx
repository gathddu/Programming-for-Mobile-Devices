import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { Film, Actor } from '../services/api';
import { useFilms } from '../hooks/useFilms';
import { useActors } from '../hooks/useActors';
import { useAuth } from '../hooks/useAuth';

interface DetailsScreenProps {
  item: Film | Actor;
  type: 'film' | 'actor';
  onBack: () => void;
}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ item, type, onBack }) => {
  const { selectedFilm, loading: filmLoading, fetchFilmDetails } = useFilms();
  const { selectedActor, loading: actorLoading } = useActors();
  const { userProfile, addFavoriteFilm, removeFavoriteFilm, addFavoriteActor, removeFavoriteActor } =
    useAuth();

  const loading = type === 'film' ? filmLoading : actorLoading;
  const details = type === 'film' ? selectedFilm : selectedActor;

  useEffect(() => {
    if (type === 'film') {
      fetchFilmDetails((item as Film).id);
    }
  }, [item.id, type]);

  const isFavorited = (): boolean => {
    if (!userProfile) return false;
    if (type === 'film') {
      return userProfile.favoriteFilms.includes(item.id);
    } else {
      return userProfile.favoriteActors.includes(item.id);
    }
  };

  const handleToggleFavorite = async (): Promise<void> => {
    try {
      if (type === 'film') {
        if (isFavorited()) {
          await removeFavoriteFilm(item.id);
        } else {
          await addFavoriteFilm(item.id);
        }
      } else {
        if (isFavorited()) {
          await removeFavoriteActor(item.id);
        } else {
          await addFavoriteActor(item.id);
        }
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to update favorite');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>
          {type === 'film' ? (details as any)?.title || (item as Film).title : (item as Actor).name}
        </Text>

        {/* Favorite Button */}
        <TouchableOpacity
          style={[styles.favoriteButton, isFavorited() && styles.favoriteButtonActive]}
          onPress={handleToggleFavorite}
        >
          <Text style={styles.favoriteButtonText}>{isFavorited() ? '❤️' : '🤍'} Favorite</Text>
        </TouchableOpacity>

        {/* Film Details */}
        {type === 'film' && details && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.description}>{(details as any).overview}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Release Date:</Text>
                <Text style={styles.infoValue}>{(details as any).release_date}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Runtime:</Text>
                <Text style={styles.infoValue}>{(details as any).runtime} minutes</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Rating:</Text>
                <Text style={styles.infoValue}>⭐ {(details as any).vote_average.toFixed(1)}</Text>
              </View>
            </View>

            {(details as any).genres && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Genres</Text>
                <View style={styles.genresContainer}>
                  {(details as any).genres.map((genre: any) => (
                    <View key={genre.id} style={styles.genreBadge}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {(details as any).cast && (details as any).cast.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cast</Text>
                {(details as any).cast.slice(0, 5).map((actor: any) => (
                  <View key={actor.id} style={styles.castItem}>
                    <Text style={styles.castName}>{actor.name}</Text>
                    <Text style={styles.castRole}>{actor.character}</Text>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        {/* Actor Details */}
        {type === 'actor' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Department:</Text>
                <Text style={styles.infoValue}>{(item as Actor).known_for_department}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Popularity:</Text>
                <Text style={styles.infoValue}>📊 {(item as Actor).popularity.toFixed(0)}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  loadingText: {
    color: '#999',
    marginTop: 12,
    fontSize: 14,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  backButton: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  favoriteButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  favoriteButtonActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  infoLabel: {
    fontSize: 13,
    color: '#999',
  },
  infoValue: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreBadge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  castItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  castName: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
  castRole: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});

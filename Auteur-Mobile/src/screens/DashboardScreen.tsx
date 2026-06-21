import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ScrollView,
} from 'react-native';
import { useFilms } from '../hooks/useFilms';
import { useActors } from '../hooks/useActors';
import { Film, Actor } from '../services/api';

interface DashboardScreenProps {
  onFilmPress: (film: Film) => void;
  onActorPress: (actor: Actor) => void;
}

type TabType = 'films' | 'actors';

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onFilmPress,
  onActorPress,
}) => {
  const { films, loading: filmsLoading, error: filmsError, fetchPopularFilms, searchFilms } =
    useFilms();
  const { actors, loading: actorsLoading, error: actorsError, fetchPopularActors } = useActors();
  const [activeTab, setActiveTab] = useState<TabType>('films');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    if (activeTab === 'films') {
      searchFilms(query);
    }
  };

  const renderFilmCard = ({ item }: { item: Film }): React.ReactElement => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onFilmPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.cardSubtitle}>{item.release_date?.split('-')[0] || 'N/A'}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {item.vote_average.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderActorCard = ({ item }: { item: Actor }): React.ReactElement => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onActorPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.cardSubtitle}>{item.known_for_department}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>📊 {item.popularity.toFixed(0)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const isLoading = activeTab === 'films' ? filmsLoading : actorsLoading;
  const error = activeTab === 'films' ? filmsError : actorsError;
  const data = activeTab === 'films' ? films : actors;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={activeTab === 'films' ? 'Search films...' : 'Search actors...'}
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'films' && styles.activeTab]}
          onPress={() => {
            setActiveTab('films');
            setSearchQuery('');
            fetchPopularFilms();
          }}
        >
          <Text style={[styles.tabText, activeTab === 'films' && styles.activeTabText]}>
            🎬 Films
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'actors' && styles.activeTab]}
          onPress={() => {
            setActiveTab('actors');
            setSearchQuery('');
            fetchPopularActors();
          }}
        >
          <Text style={[styles.tabText, activeTab === 'actors' && styles.activeTabText]}>
            👥 Actors
          </Text>
        </TouchableOpacity>
      </View>

      {/* Loading State */}
      {isLoading && data.length === 0 && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading {activeTab}...</Text>
        </View>
      )}

      {/* Error State */}
      {error && <Text style={styles.error}>{error}</Text>}

      {/* List */}
      <FlatList
        data={data}
        renderItem={activeTab === 'films' ? renderFilmCard : renderActorCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              if (activeTab === 'films') {
                fetchPopularFilms();
              } else {
                fetchPopularActors();
              }
            }}
          />
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No {activeTab} found</Text>
              <Text style={styles.emptySubtext}>Try searching or refreshing</Text>
            </View>
          ) : null
        }
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  activeTab: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#999',
    marginTop: 12,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginHorizontal: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  cardContent: {
    padding: 12,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  ratingContainer: {
    marginTop: 8,
  },
  rating: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '600',
  },
  error: {
    color: '#ff6b6b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});

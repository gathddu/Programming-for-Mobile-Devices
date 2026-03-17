import React, { useMemo } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { FilmCard } from '../components/FilmCard';
import { filmsData } from '../data/filmsData';
import { Film } from '../types/index';

export const FilmsScreen: React.FC = () => {
  const memoizedFilms = useMemo(() => filmsData, []);

  const renderFilm = ({ item }: { item: Film }): React.ReactElement => (
    <FilmCard film={item} />
  );

  const keyExtractor = (item: Film): string => item.id;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎥 Films</Text>
        <Text style={styles.headerSubtitle}>Featured films</Text>
      </View>
      <FlatList
        data={memoizedFilms}
        renderItem={renderFilm}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
    opacity: 0.9,
  },
  listContent: {
    paddingVertical: 8,
  },
});

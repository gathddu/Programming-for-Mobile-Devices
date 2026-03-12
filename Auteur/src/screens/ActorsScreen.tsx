import React, { useMemo } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { ActorCard } from '../components/ActorCard';
import { actorsData } from '../data/actorsData';
import { Actor } from '../types/index';

export const ActorsScreen: React.FC = () => {
  const memoizedActors = useMemo(() => actorsData, []);

  const renderActor = ({ item }: { item: Actor }): React.ReactElement => (
    <ActorCard actor={item} />
  );

  const keyExtractor = (item: Actor): string => item.id;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎬 Actors</Text>
        <Text style={styles.headerSubtitle}>Discover amazing talent</Text>
      </View>
      <FlatList
        data={memoizedActors}
        renderItem={renderActor}
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
    backgroundColor: '#e91e63',
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

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actor } from '../types/index';

interface ActorCardProps {
  readonly actor: Actor;
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

export const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  const colorIndex = parseInt(actor.id) % COLORS.length;
  const bgColor = COLORS[colorIndex];
  const initials = actor.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const accessibilityLabel = useMemo(
    () => `${actor.name} as ${actor.character}`,
    [actor.name, actor.character]
  );

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      <View style={[styles.imageContainer, { backgroundColor: bgColor }]}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {actor.name}
        </Text>
        <Text style={styles.character} numberOfLines={1}>
          {actor.character}
        </Text>
        <Text style={styles.bio} numberOfLines={3}>
          {actor.bio}
        </Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>📅 {actor.birthDate}</Text>
          <Text style={styles.detailText}>📍 {actor.birthPlace}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 60,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  character: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  bio: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  detailText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

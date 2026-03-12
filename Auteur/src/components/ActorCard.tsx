import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Actor } from '../types/index';

interface ActorCardProps {
  readonly actor: Actor;
}

export const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
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
      <Image
        source={{ uri: actor.image }}
        style={styles.image}
        accessibilityIgnoresInvertColors
      />
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
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
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

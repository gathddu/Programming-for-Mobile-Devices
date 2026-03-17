import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Film } from '../types/index';

interface FilmCardProps {
  readonly film: Film;
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

export const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const colorIndex = parseInt(film.id) % COLORS.length;
  const bgColor = COLORS[colorIndex];

  return (
    <View
      style={styles.card}
      accessible={true}
      accessibilityLabel={`${film.title} released ${film.releaseDate}`}
      accessibilityRole="button"
    >
      <View style={[styles.imageContainer, { backgroundColor: bgColor }]}>
        <Text style={styles.year}>{film.releaseDate.split('-')[0]}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {film.title}
        </Text>
        <Text style={styles.date}>{film.releaseDate}</Text>
        <Text style={styles.description} numberOfLines={4}>
          {film.description}
        </Text>
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
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  year: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },
});

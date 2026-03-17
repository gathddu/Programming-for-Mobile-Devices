import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ActorsScreen } from './ActorsScreen';
import { FilmsScreen } from './FilmsScreen';
import { TabType } from '../types/index';

export const HomeScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('actors');

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'actors' && styles.activeTab]}
          onPress={() => setActiveTab('actors')}
          accessible={true}
          accessibilityLabel="Actors tab"
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'actors' }}
        >
          <Text style={[styles.tabText, activeTab === 'actors' && styles.activeTabText]}>
            Actors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'films' && styles.activeTab]}
          onPress={() => setActiveTab('films')}
          accessible={true}
          accessibilityLabel="Films tab"
          accessibilityRole="tab"
          accessibilityState={{ selected: activeTab === 'films' }}
        >
          <Text style={[styles.tabText, activeTab === 'films' && styles.activeTabText]}>
            Films
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {activeTab === 'actors' && <ActorsScreen />}
        {activeTab === 'films' && <FilmsScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#e91e63',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#e91e63',
  },
  content: {
    flex: 1,
  },
});

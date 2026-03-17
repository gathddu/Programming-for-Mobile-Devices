import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ErrorBoundary } from './src/components/ErrorBoundary.tsx';
import { HomeScreen } from './src/screens/HomeScreen.tsx';

export default function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <HomeScreen />
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

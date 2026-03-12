import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { ActorsScreen } from './src/screens/ActorsScreen';

export default function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <ActorsScreen />
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

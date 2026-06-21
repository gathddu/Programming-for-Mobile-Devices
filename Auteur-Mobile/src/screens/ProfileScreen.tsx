import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

export const ProfileScreen: React.FC = () => {
  const { user, userProfile, logout, loading } = useAuth();

  const handleLogout = (): void => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await logout();
          } catch (err) {
            Alert.alert('Error', 'Failed to logout');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userProfile?.displayName?.[0].toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userProfile?.displayName || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email</Text>
          <Text style={styles.settingValue}>{user?.email}</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Display Name</Text>
          <Text style={styles.settingValue}>{userProfile?.displayName}</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Member Since</Text>
          <Text style={styles.settingValue}>
            {userProfile?.createdAt
              ? new Date(userProfile.createdAt).toLocaleDateString()
              : 'N/A'}
          </Text>
        </View>
      </View>

      {/* Favorites Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorites</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userProfile?.favoriteFilms.length || 0}</Text>
            <Text style={styles.statLabel}>Films</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{userProfile?.favoriteActors.length || 0}</Text>
            <Text style={styles.statLabel}>Actors</Text>
          </View>
        </View>
      </View>

      {/* App Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>App Version</Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Build</Text>
          <Text style={styles.settingValue}>1</Text>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={[styles.logoutButton, loading && styles.buttonDisabled]}
          onPress={handleLogout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.logoutButtonText}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>🎬 Auteur Mobile v1.0.0</Text>
        <Text style={styles.footerSubtext}>Discover Films & Actors</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  userEmail: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingItem: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  settingLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  actionSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#3a3a3a',
  },
  footerText: {
    fontSize: 13,
    color: '#999',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

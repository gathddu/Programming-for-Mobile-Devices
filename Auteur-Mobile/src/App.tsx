import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth } from './hooks/useAuth';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { DetailsScreen } from './screens/DetailsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Film, Actor } from './services/api';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type AppStackParamList = {
  Dashboard: undefined;
  Details: { item: Film | Actor; type: 'film' | 'actor' };
};

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const AppStack = createStackNavigator<AppStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const AuthNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      {currentScreen === 'login' ? (
        <AuthStack.Screen
          name="Login"
          options={{ animationEnabled: false }}
        >
          {() => (
            <LoginScreen
              onNavigateToRegister={() => setCurrentScreen('register')}
            />
          )}
        </AuthStack.Screen>
      ) : (
        <AuthStack.Screen
          name="Register"
          options={{ animationEnabled: false }}
        >
          {() => (
            <RegisterScreen
              onNavigateToLogin={() => setCurrentScreen('login')}
            />
          )}
        </AuthStack.Screen>
      )}
    </AuthStack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<{ item: Film | Actor; type: 'film' | 'actor' } | null>(null);

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <AppStack.Screen
        name="Dashboard"
        options={{ animationEnabled: false }}
      >
        {() => (
          <Drawer.Navigator
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#2a2a2a',
              },
              headerTintColor: '#6366f1',
              headerTitleStyle: {
                color: '#fff',
                fontWeight: '600',
              },
              drawerStyle: {
                backgroundColor: '#1a1a1a',
              },
              drawerLabelStyle: {
                color: '#fff',
              },
              drawerActiveTintColor: '#6366f1',
              drawerInactiveTintColor: '#999',
            }}
          >
            <Drawer.Screen
              name="Home"
              options={{
                title: '🎬 Auteur',
                drawerLabel: 'Home',
              }}
            >
              {() => (
                <DashboardScreen
                  onFilmPress={(film) => {
                    setSelectedItem({ item: film, type: 'film' });
                  }}
                  onActorPress={(actor) => {
                    setSelectedItem({ item: actor, type: 'actor' });
                  }}
                />
              )}
            </Drawer.Screen>
            <Drawer.Screen
              name="Profile"
              options={{
                title: 'Profile',
                drawerLabel: 'Profile',
              }}
              component={ProfileScreen}
            />
          </Drawer.Navigator>
        )}
      </AppStack.Screen>

      {selectedItem && (
        <AppStack.Screen
          name="Details"
          options={{
            title: 'Details',
            animationEnabled: true,
          }}
        >
          {() => (
            <DetailsScreen
              item={selectedItem.item}
              type={selectedItem.type}
              onBack={() => setSelectedItem(null)}
            />
          )}
        </AppStack.Screen>
      )}
    </AppStack.Navigator>
  );
};

export const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a1a' }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

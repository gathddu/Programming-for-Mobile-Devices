# Auteur Mobile

A professional React Native + Expo application for discovering films and actors with Firebase authentication and real-time data synchronization.

## 🎯 Project Overview

Auteur Mobile is a production-grade mobile application that meets all technical requirements for a professional React Native project. It demonstrates best practices in modern mobile development including React Hooks, navigation patterns, API integration, and Firebase integration.

## ✨ Features

### Core Features
- **Firebase Authentication**: Email/password registration and login
- **React Navigation**: Stack + Drawer navigation patterns
- **API Integration**: TMDB API for films and actors data
- **Real-time Data**: Firestore for user profiles and favorites
- **Loading States**: ActivityIndicator on all async operations
- **Search Functionality**: Search films by title
- **Favorites System**: Save favorite films and actors to Firestore

### Technical Features
- **React Hooks**: useState, useEffect, custom hooks (useAuth, useFilms, useActors)
- **TypeScript**: Strict mode with full type safety
- **Error Handling**: Comprehensive error states and user feedback
- **Responsive Design**: Optimized for mobile and web
- **Dark Theme**: Professional dark UI with Indigo accents

## 📋 Technical Requirements Met

✅ **Hooks (React Hooks)**
- useState for state management
- useEffect for side effects
- Custom hooks: useAuth, useFilms, useActors

✅ **Navigation**
- React Navigation with Stack and Drawer
- 4+ screens: Login, Register, Dashboard, Details, Profile
- Smooth transitions and animations

✅ **Loading States**
- ActivityIndicator during data fetching
- Loading states for films, actors, and authentication
- RefreshControl for pull-to-refresh

✅ **Screens**
- Login/Register screens with Firebase Auth
- Dashboard with films and actors lists
- Details screen for film/actor information
- Profile screen with user data and favorites

✅ **API Integration**
- TMDB API for films and actors
- Axios for HTTP requests
- Error handling and retry logic

✅ **Firebase**
- Firebase Authentication (email/password)
- Firestore for user profiles and favorites
- Real-time data synchronization

✅ **Drawer Navigation**
- Lateral drawer with Home and Profile sections
- Icons and clear labels
- Smooth animations

## 📁 Project Structure

```
auteur-mobile/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/             # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── DetailsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/          # Navigation configuration
│   ├── services/            # API services
│   │   └── api.ts          # TMDB API client
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts      # Authentication hook
│   │   ├── useFilms.ts     # Films data hook
│   │   └── useActors.ts    # Actors data hook
│   ├── firebaseConfig.ts   # Firebase configuration
│   ├── App.tsx             # Main app component
│   └── index.tsx           # Entry point
├── app.json                # Expo configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── flake.nix              # NixOS dev environment
├── .env.example           # Environment template
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

**NixOS:**
```bash
nix flake update
nix develop
```

**macOS/Linux:**
- Node.js 22+
- pnpm or npm

**Windows:**
- Node.js 22+
- npm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/auteur-mobile.git
cd auteur-mobile
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install --legacy-peer-deps
```

3. **Configure Firebase**

Create a Firebase project at https://console.firebase.google.com/

Enable:
- Firebase Authentication (Email/Password)
- Cloud Firestore

Copy your Firebase config and create `.env`:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
EXPO_PUBLIC_API_BASE_URL=https://api.themoviedb.org/3
EXPO_PUBLIC_APP_ENV=development
```

4. **Get TMDB API Key**

Visit https://www.themoviedb.org/settings/api and create an API key

5. **Start the app**

```bash
pnpm start
# or
npm start
```

Then choose your platform:
- Press `w` for web
- Press `a` for Android
- Press `i` for iOS

## 🏗️ Architecture

### Authentication Flow
1. User registers with email/password
2. Firebase creates user account
3. User profile stored in Firestore
4. User can login with credentials
5. Session persisted across app restarts

### Data Flow
1. App fetches popular films/actors from TMDB API
2. User can search films
3. Clicking on film/actor shows details
4. User can favorite items (stored in Firestore)
5. Profile screen shows user's favorite films and actors

### Custom Hooks

**useAuth**
- Manages authentication state
- Handles register, login, logout
- Manages user profile in Firestore
- Handles favorites management

**useFilms**
- Fetches popular films from TMDB
- Handles film search
- Fetches film details with cast
- Manages loading and error states

**useActors**
- Fetches popular actors from TMDB
- Fetches actor details
- Manages loading and error states

## 📱 Screens

### Login Screen
- Email and password input
- Firebase authentication
- Link to register screen
- Loading state during authentication

### Register Screen
- Display name, email, password inputs
- Password confirmation
- Firebase user creation
- Firestore profile creation
- Link to login screen

### Dashboard Screen
- Tab navigation between Films and Actors
- Search functionality for films
- Grid layout with 2 columns
- Pull-to-refresh
- Loading states

### Details Screen
- Film/Actor information display
- Favorite button with Firestore sync
- Cast information for films
- Genres for films
- Loading state while fetching details

### Profile Screen
- User information display
- Account statistics
- Favorite films and actors count
- App information
- Logout button

## 🔐 Security

- Firebase Authentication handles password security
- Environment variables for API keys
- No sensitive data in code
- Firestore security rules (configure in Firebase Console)

## 📊 API Integration

### TMDB API
- Popular films endpoint
- Film details with cast
- Popular actors endpoint
- Actor details
- Search films endpoint

### Firebase
- User authentication
- User profile storage
- Favorites synchronization
- Real-time updates

## 🎨 Design

- **Color Scheme**: Dark theme with Indigo accents
- **Typography**: Clear hierarchy with consistent sizing
- **Spacing**: Consistent padding and margins
- **Components**: Reusable and well-organized
- **Accessibility**: Labels and semantic structure

## 🧪 Testing

```bash
pnpm test
# or
npm test
```

## 📦 Build

### Web
```bash
pnpm run web
```

### Android
```bash
pnpm run android
```

### iOS
```bash
pnpm run ios
```

## 📝 Git Workflow

This project follows Conventional Commits:

```bash
git commit -m "feat: add film search functionality"
git commit -m "fix: resolve Firebase connection issue"
git commit -m "docs: update README with setup instructions"
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Commit with conventional commits
4. Push to branch: `git push origin feat/your-feature`
5. Open a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Firebase Configuration Error
- Verify all environment variables are set
- Check Firebase project credentials
- Ensure Firebase services are enabled

### API Connection Error
- Verify TMDB API key is valid
- Check network connectivity
- Ensure API base URL is correct

### Build Error
- Clear cache: `pnpm install` or `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Clear Expo cache: `npx expo start -c`

## 📚 Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TMDB API](https://www.themoviedb.org/settings/api)

## 👨‍💻 Author

Created for professional React Native development demonstration.

---

**Auteur Mobile** - Discover Films & Actors 🎬

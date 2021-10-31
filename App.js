import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { AuthContextProvider } from './src/services/auth/auth.context';

import './src/config/firebase';

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';

import { theme } from './src/infrastructure/theme';
import { Navigation } from './src/infrastructure/navigation';

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Navigation />
        </AuthContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

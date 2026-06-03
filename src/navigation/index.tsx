import React from 'react';
import { AppNavigation } from './AppNavigation';

const AppNavigator = () => {
  const hasSeenOnboarding = true;
  const user = null;

  // onboarding ekranını görmedi ise onboarding ekranına yönlendir
  if (!hasSeenOnboarding) {
    //return <AppNavigation />;
  }

  // use yoksa auth ekranına yönlendir
  if (!user) {
    //return <AuthNavigation />;
  }

  return <AppNavigation />;
};

export { AppNavigator };

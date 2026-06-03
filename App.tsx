import React from 'react';
import { Providers } from '@/src/providers';
import { AppNavigator } from '@/src/navigation';

const App = () => {
  return (
    <Providers>
      <AppNavigator />
    </Providers>
  );
};

export default App;

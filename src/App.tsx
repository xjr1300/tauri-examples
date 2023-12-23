import { FC, useState } from 'react';

import { MantineProvider } from '@mantine/core';

import { AppLayout } from './components/layouts/AppLayout';
import { theme } from './theme';
import {
  CurrentProcessStateContext,
  ProcessIdentifier,
} from './hooks/useCurrentProcess';

const App: FC = () => {
  const [currentProcess, setCurrentProcess] =
    useState<ProcessIdentifier>('description');

  return (
    <CurrentProcessStateContext.Provider
      value={{ currentProcess, setCurrentProcess }}
    >
      <MantineProvider theme={theme}>
        <AppLayout />
      </MantineProvider>
    </CurrentProcessStateContext.Provider>
  );
};

export default App;

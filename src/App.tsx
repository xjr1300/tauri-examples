import { FC, useState } from 'react';

import { MantineProvider } from '@mantine/core';

import { AppLayout } from './components/layouts/AppLayout';
import { theme } from './theme';
import {
  CurrentProcessContext,
  ProcessIdentifier,
} from './hooks/useCurrentProcess';
import './style.css';

const App: FC = () => {
  const [currentProcess, setCurrentProcess] =
    useState<ProcessIdentifier>('description');

  return (
    <CurrentProcessContext.Provider
      value={{ currentProcess, setCurrentProcess }}
    >
      <MantineProvider theme={theme}>
        <AppLayout />
      </MantineProvider>
    </CurrentProcessContext.Provider>
  );
};

export default App;

import { createContext } from 'react';

export type ProcessIdentifier = 'description' | 'execute-command';

export type CurrentProcess = {
  currentProcess: ProcessIdentifier;
  setCurrentProcess: (feature: ProcessIdentifier) => void;
};

export const CurrentProcessContext = createContext<CurrentProcess>({
  currentProcess: 'description',
  setCurrentProcess: () => {},
});

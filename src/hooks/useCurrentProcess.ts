import { createContext } from 'react';

export type ProcessIdentifier =
  | 'description'
  | 'execute-command'
  | 'execute-command-json'
  | 'maybe-error'
  | 'read-file-content'
  | 'write-file-content'
  | 'open-dialog'
  | 'save-dialog'
  | 'message-dialog'
  | 'confirm-dialog'
  | 'ask-dialog'
  | 'clipboard'
  | 'notification'
  | 'os'
  | 'state-management';

export type CurrentProcess = {
  currentProcess: ProcessIdentifier;
  setCurrentProcess: (feature: ProcessIdentifier) => void;
};

export const CurrentProcessContext = createContext<CurrentProcess>({
  currentProcess: 'description',
  setCurrentProcess: () => {},
});

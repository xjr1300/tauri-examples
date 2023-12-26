import { ReactNode, useContext } from 'react';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
  CurrentProcessContext,
  ProcessIdentifier,
} from '../../hooks/useCurrentProcess';
import ProcessListSidePanel from '../features/ProcessListSidePanel';
import Description from '../features/Description';
import ExecuteCommand from '../features/commands/ExecuteCommand';
import ExecuteCommandJson from '../features/commands/ExecuteCommandJson';
import MaybeError from '../features/commands/MaybeError';
import ReadFileContent from '../features/files/ReadFileContent';
import WriteFileContent from '../features/files/WriteFileContent';
import OpenDialog from '../features/dialogs/OpenDialog';
import SaveDialog from '../features/dialogs/SaveDialog';
import MessageDialog from '../features/dialogs/MessageDialog';
import ConfirmDialog from '../features/dialogs/ConfirmDialog';
import AskDialog from '../features/dialogs/AskDialog';

const processComponentSelector = (process: ProcessIdentifier): ReactNode => {
  switch (process) {
    case 'execute-command':
      return <ExecuteCommand />;
    case 'execute-command-json':
      return <ExecuteCommandJson />;
    case 'maybe-error':
      return <MaybeError />;
    case 'read-file-content':
      return <ReadFileContent />;
    case 'write-file-content':
      return <WriteFileContent />;
    case 'open-dialog':
      return <OpenDialog />;
    case 'save-dialog':
      return <SaveDialog />;
    case 'message-dialog':
      return <MessageDialog />;
    case 'confirm-dialog':
      return <ConfirmDialog />;
    case 'ask-dialog':
      return <AskDialog />;
    default:
      return <Description />;
  }
};

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { currentProcess } = useContext(CurrentProcessContext);
  const processComponent = processComponentSelector(currentProcess);

  return (
    <AppShell
      header={{ height: 30 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="sm"
    >
      <AppShell.Header>
        <Group h="100%" px="sm">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Tauri Examples
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="sm">
        <ProcessListSidePanel />
      </AppShell.Navbar>
      <AppShell.Main>{processComponent}</AppShell.Main>
    </AppShell>
  );
}

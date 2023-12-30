import { ReactNode, useContext } from 'react';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
  CurrentProcessContext,
  ProcessIdentifier,
} from '../../hooks/useCurrentProcess';
import ProcessListSidePanel from '../ProcessListSidePanel';
import Description from '../Description';
import ExecuteCommand from '../commands/ExecuteCommand';
import ExecuteCommandJson from '../commands/ExecuteCommandJson';
import MaybeError from '../commands/MaybeError';
import ReadFileContent from '../files/ReadFileContent';
import WriteFileContent from '../files/WriteFileContent';
import OpenDialog from '../dialogs/OpenDialog';
import SaveDialog from '../dialogs/SaveDialog';
import MessageDialog from '../dialogs/MessageDialog';
import ConfirmDialog from '../dialogs/ConfirmDialog';
import AskDialog from '../dialogs/AskDialog';
import Clipboard from '../Clipboard';
import Notification from '../Notification';
import OS from '../OS';
import StateManagement from '../states/StateManagement';
import DatabaseConnectionPool from '../states/DatabaseConnectionPool';

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
    case 'clipboard':
      return <Clipboard />;
    case 'notification':
      return <Notification />;
    case 'os':
      return <OS />;
    case 'state-management':
      return <StateManagement />;
    case 'database-connection-pool':
      return <DatabaseConnectionPool />;
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

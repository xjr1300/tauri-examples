import { ReactNode, useContext } from 'react';

import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
  CurrentProcessContext,
  ProcessIdentifier,
} from '../../hooks/useCurrentProcess';
import ProcessListSidePanel from '../features/ProcessListSidePanel';
import Description from '../features/Description';
import ExecuteCommand from '../features/executeCommands/ExecuteCommand';
import ExecuteCommandJson from '../features/executeCommands/ExecuteCommandJson';
import MaybeError from '../features/executeCommands/MaybeError';
import ReadFileContent from '../features/fileOperations/ReadFileContent';

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

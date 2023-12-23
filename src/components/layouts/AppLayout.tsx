import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import ProcessListSidePanel from "../features/ProcessListSidePanel";
import Description from "../features/Description";

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 30 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
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
      <AppShell.Main>
        <Description />
      </AppShell.Main>
    </AppShell>
  );
}

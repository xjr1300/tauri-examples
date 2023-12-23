import { NavLink, NavLinkProps } from '@mantine/core';
import { useContext } from 'react';

import {
  CurrentProcessContext,
  ProcessIdentifier,
} from '../../hooks/useCurrentProcess';

interface ProcessNavLinkProps extends NavLinkProps {
  process?: ProcessIdentifier;
  children?: React.ReactNode;
}

const ProcessNavLink: React.FC<ProcessNavLinkProps> = ({
  process,
  children,
  ...others
}) => {
  return (
    <NavLink p={0} data-process={process} {...others}>
      {children}
    </NavLink>
  );
};

const ProcessListSidePanel: React.FC = () => {
  const { currentProcess, setCurrentProcess } = useContext(
    CurrentProcessContext
  );

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    let process = event.currentTarget.getAttribute('data-process');
    if (process) {
      console.log(`${process}がクリックされました。`);
      setCurrentProcess(process as ProcessIdentifier);
    }
  };

  return (
    <>
      <ProcessNavLink
        label="説明"
        process="description"
        active={currentProcess === 'description'}
        onClick={onClick}
      />
      <ProcessNavLink label="コマンド">
        <ProcessNavLink
          label="コマンドを実行"
          process="execute-command"
          active={currentProcess === 'execute-command'}
          onClick={onClick}
        />
      </ProcessNavLink>
    </>
  );
};

export default ProcessListSidePanel;

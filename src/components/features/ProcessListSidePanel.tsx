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
      <ProcessNavLink label="コマンド実行">
        <ProcessNavLink
          label="コマンドを実行"
          process="execute-command"
          active={currentProcess === 'execute-command'}
          onClick={onClick}
        />
        <ProcessNavLink
          label="Jsonで送受信するコマンドを実行"
          process="execute-command-json"
          active={currentProcess === 'execute-command-json'}
          onClick={onClick}
        />
        <ProcessNavLink
          label="バックエンドから返されたエラーを処理"
          process="maybe-error"
          active={currentProcess === 'maybe-error'}
          onClick={onClick}
        />
      </ProcessNavLink>
      <ProcessNavLink label="ファイル操作">
        <ProcessNavLink
          label="ファイルを読み込み"
          process="read-file-content"
          active={currentProcess === 'read-file-content'}
          onClick={onClick}
        />
        <ProcessNavLink
          label="ファイルを書き込み"
          process="write-file-content"
          active={currentProcess === 'write-file-content'}
          onClick={onClick}
        />
      </ProcessNavLink>
    </>
  );
};

export default ProcessListSidePanel;

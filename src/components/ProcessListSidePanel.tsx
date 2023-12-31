import { NavLink, NavLinkProps } from '@mantine/core';
import { useContext } from 'react';

import {
  CurrentProcessContext,
  ProcessIdentifier,
} from '../hooks/useCurrentProcess';

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
      <ProcessNavLink label="コマンド">
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
          label="バックエンドが返したエラーを処理"
          process="maybe-error"
          active={currentProcess === 'maybe-error'}
          onClick={onClick}
        />
      </ProcessNavLink>
      <ProcessNavLink label="ファイル">
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
      <ProcessNavLink label="ダイアログ">
        <ProcessNavLink
          label="オープンダイアログを開く"
          process="open-dialog"
          active={currentProcess === 'open-dialog'}
          onClick={onClick}
        />
        <ProcessNavLink
          label="セーブダイアログを開く"
          process="save-dialog"
          active={currentProcess === 'save-dialog'}
          onClick={onClick}
        />
        <ProcessNavLink
          label="メッセージダイアログを開く"
          process="message-dialog"
          active={currentProcess === 'message-dialog'}
          onClick={onClick}
        />
        <ProcessNavLink
          label="確認ダイアログを開く"
          process="confirm-dialog"
          active={currentProcess === 'confirm-dialog'}
          onClick={onClick}
        />
        <ProcessNavLink
          label="質問ダイアログを開く"
          process="ask-dialog"
          active={currentProcess === 'ask-dialog'}
          onClick={onClick}
        />
      </ProcessNavLink>
      <ProcessNavLink label="クリップボード">
        <ProcessNavLink
          label="コピー & ペースト"
          process="clipboard"
          active={currentProcess === 'clipboard'}
          onClick={onClick}
        />
      </ProcessNavLink>
      <ProcessNavLink
        label="通知を送信"
        process="notification"
        active={currentProcess === 'notification'}
        onClick={onClick}
      />
      <ProcessNavLink
        label="OSの情報を取得"
        process="os"
        active={currentProcess === 'os'}
        onClick={onClick}
      />
      <ProcessNavLink label="状態">
        <ProcessNavLink
          label="状態管理"
          process="state-management"
          active={currentProcess === 'state-management'}
          onClick={onClick}
        />
        <ProcessNavLink
          label="データベース接続プール"
          process="database-connection-pool"
          active={currentProcess === 'database-connection-pool'}
          onClick={onClick}
        />
      </ProcessNavLink>
      <ProcessNavLink label="地図 (OpenLayers)">
        <ProcessNavLink
          label="タイル地図"
          process="tile-maps"
          active={currentProcess === 'tile-maps'}
          onClick={onClick}
        />
      </ProcessNavLink>
    </>
  );
};

export default ProcessListSidePanel;

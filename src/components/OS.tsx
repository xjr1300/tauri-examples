import { useEffect, useState } from 'react';

import {
  arch as retrieveArch,
  Arch,
  locale as retrieveLocale,
  Platform,
  platform as retrievePlatform,
  tempdir as retrieveTempDir,
  OsType,
  type as retrieveOsType,
  version as retrieveOsVersion,
  EOL,
} from '@tauri-apps/api/os';
import {
  Divider,
  Group,
  MantineSpacing,
  StyleProp,
  Textarea,
} from '@mantine/core';
import ItemLabel from './atoms/ItemLabel';

// OSに関連する情報を取得する。
//
// OSに関する情報を取得するためには、`src-tauri/tauri.conf.json`で次の通り設定する必要がある。
//
// ```json
// {
//   "tauri": {
//     "allowlist": {
//       "os": {
//         "all": true, // enable all Os APIs
//       }
//     }
//   }
// }
// ```
const OS: React.FC = () => {
  const [arch, setArch] = useState<Arch | undefined>(undefined);
  const [locale, setLocale] = useState<string | null>(null);
  const [platform, setPlatform] = useState<Platform | undefined>(undefined);
  const [tempDir, setTempDir] = useState<string | null>(null);
  const [osType, setOsType] = useState<OsType | undefined>(undefined);
  const [osVersion, setOsVersion] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setArch(await retrieveArch());
      setLocale(await retrieveLocale());
      setPlatform(await retrievePlatform());
      setTempDir(await retrieveTempDir());
      setOsType(await retrieveOsType());
      setOsVersion(await retrieveOsVersion());
    })();
  }, []);

  return (
    <>
      <Item label="アーキテクチャ" value={arch ?? ''} />
      <Divider mt="xs" />
      <Item label="ロケール" value={locale ?? ''} mt="sm" />
      <Divider mt="xs" />
      <Item label="プラットフォーム" value={platform ?? ''} mt="sm" />
      <Divider mt="xs" />
      <Item label="一時ディレクトリ" value={tempDir ?? ''} mt="sm" />
      <Divider mt="xs" />
      <Item label="OSの種類" value={osType ?? ''} mt="sm" />
      <Divider mt="xs" />
      <Item label="OSのバージョン" value={osVersion ?? ''} mt="sm" />
      <Divider mt="xs" />
      <Item label="改行文字列" value={EOL === '\n' ? 'LF' : 'CRLF'} mt="sm" />
    </>
  );
};

type ItemProps = {
  label: string;
  value: string;
  mt?: StyleProp<MantineSpacing>;
};

const Item: React.FC<ItemProps> = ({ label, value, mt }) => {
  return (
    <Group justify="space-between" mt={mt}>
      <ItemLabel>{label}</ItemLabel>
      <Textarea
        variant="unstyled"
        autosize
        readOnly
        minRows={1}
        styles={{
          input: {
            width: '30rem',
            height: '21px',
            border: 'none',
          },
        }}
        defaultValue={value}
      />
    </Group>
  );
};

export default OS;

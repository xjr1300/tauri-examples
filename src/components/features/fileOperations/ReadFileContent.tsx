import { useEffect, useState } from 'react';

import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import {
  Button,
  ButtonProps,
  Divider,
  Flex,
  Text,
  Textarea,
  createPolymorphicComponent,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import styled from '@emotion/styled';

// ファイルの内容を読み込む
//
// tauriはディレクトリトラバーサルを防止して、絶対パスやドットパス(../foo.txtなど)をセキュリティ上の理由から、
// 許可しない。よって、読み書きするファイルのパスを`BaseDirectory`、または`path`モジュールにある`homeDir`
// 関数などを使用して、相対パスで指定しなければならない。
// また、`./src-tauri/tauri.conf.json`ファイルで、`path`または`fs`モジュールの使用を許可しなければならず、
// さらに、`tauri > fs > scope`に、読み書きを許可するパスを設定する必要がある。
// なお、隠しファイルはその隠しファイルのパスを直接していしなければならない(ようである)。
//
// ```json
// "tauri": {
//   "allowlist": {
//     ...
//     "path": {
//       "all": true
//     },
//     "fs": {
//       "all": true,
//       "scope": ["$HOME", "$HOME/*", "$HOME/**", "$HOME/**/*"]
//     }
//     ...
// ```

const ReadFileContent: React.FC = () => {
  const form = useForm({ initialValues: { fileContent: '' } });
  const [path, setPath] = useState('');

  // リソースディレクトリのパスを変更すること!!
  const resourcesDir = 'projects/rust/tauri-examples/resources';

  useEffect(() => {
    const getFilePath = async () => {
      const pathFile = await join(resourcesDir, 'zen-of-python.txt');
      setPath(pathFile);
    };
    getFilePath();
  }, []);

  return (
    <form>
      <Flex align="center">
        <StyledButton
          onClick={async () => {
            const content = await readTextFile(path, {
              dir: BaseDirectory.Home,
            });
            form.setFieldValue('fileContent', content);
            console.log(content);
          }}
        >
          ファイルを読み込み
        </StyledButton>
        <Text ml="sm">{path}</Text>
      </Flex>
      <StyledButton
        onClick={() => {
          form.setFieldValue('fileContent', '');
        }}
        mt="sm"
      >
        クリア
      </StyledButton>
      <Divider size="xs" mt="sm" />
      <Textarea
        name="fileContent"
        variant="unstyled"
        placeholder="ここにファイルの内容を表示します。"
        autosize
        minRows={6}
        mt="sm"
        {...form.getInputProps('fileContent')}
      />
    </form>
  );
};

const StyledButton = createPolymorphicComponent<'button', ButtonProps>(styled(
  Button
)`
  width: 130px;
`);

export default ReadFileContent;

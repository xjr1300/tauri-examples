import { useState } from 'react';

import { readText, writeText } from '@tauri-apps/api/clipboard';
import { Flex, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReadOnlyTextInput } from './atoms/readonly';

// クリップボードを経由して、コピー & ペーストする。
//
// クリップボードを利用するためには、`tauri-src/tauri.conf.json`で次のように、
// クリップボードの利用を許可する必要がある。
//
// ```json
// {
//   "tauri": {
//     "allowlist": {
//       "clipboard": {
//         "all": true, // enable all Clipboard APIs
//         "writeText": true,
//         "readText": true
//       }
//     }
//   }
// }
// ```
const Clipboard: React.FC = () => {
  const form = useForm({
    initialValues: {
      text: 'すもももももももものうち',
    },
  });
  const [pasteText, setPasteText] = useState<string | undefined>(undefined);

  const onClearClick = async () => {
    writeText('');
  };

  const onPasteClick = async () => {
    const text = await readText();
    if (text !== null) {
      setPasteText(text);
    } else {
      setPasteText('');
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        await writeText(values.text);
      })}
    >
      <TextInput
        name="text"
        label="クリップボードにコピーするテキスト"
        placeholder="クリップボードにコピーするテキストを入力してください。"
        {...form.getInputProps('text')}
      />
      <Flex justify="flex-end" mt="sm">
        <Button type="button" variant="outline" onClick={onClearClick}>
          クリップボードをクリア
        </Button>
        <Button type="submit" ml="sm">
          クリップボードにコピー
        </Button>
      </Flex>
      <ReadOnlyTextInput
        name="target"
        label="クリップボードの内容"
        defaultValue={pasteText}
        mt="sm"
      />
      <Flex justify="flex-end" mt="sm">
        <Button type="button" variant="outline" onClick={onPasteClick}>
          クリップボードの内容を上のインプットにペースト
        </Button>
      </Flex>
    </form>
  );
};

export default Clipboard;

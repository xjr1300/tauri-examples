import { useEffect, useState } from 'react';

import { BaseDirectory, join } from '@tauri-apps/api/path';
import { Button, Flex, Text, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { writeTextFile } from '@tauri-apps/api/fs';

const WriteFileContent: React.FC = () => {
  const form = useForm({
    initialValues: { fileContent: '' },
    validate: {
      fileContent: (value) =>
        value.trim().length > 0
          ? null
          : 'ファイルに書き込む内容を入力してください。',
    },
  });
  const [path, setPath] = useState('');
  // リソースディレクトリのパスを変更すること!!
  const resourcesDir = 'projects/rust/tauri-examples/resources';

  useEffect(() => {
    const getFilePath = async () => {
      const pathFile = await join(resourcesDir, 'output.txt');
      setPath(pathFile);
    };
    getFilePath();
  }, []);

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        console.log(values.fileContent);
        await writeTextFile(path, values.fileContent, {
          dir: BaseDirectory.Home,
        });
      })}
    >
      <Textarea
        name="fileContent"
        label="ファイルに書き込む内容"
        autosize
        minRows={6}
        {...form.getInputProps('fileContent')}
      />
      <Flex align="center" mt="sm">
        <Button type="submit" variant="filled">
          ファイルに書き込み
        </Button>
        <Text ml="sm">{path}</Text>
      </Flex>
    </form>
  );
};

export default WriteFileContent;

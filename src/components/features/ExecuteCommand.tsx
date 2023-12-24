import { useState } from 'react';

import { NumberInput, TextInput, Button, Flex, Box, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { invoke } from '@tauri-apps/api';

const ExecuteCommand: React.FC = () => {
  const form = useForm({
    initialValues: {
      name: '',
      age: 20,
    },

    validate: {
      name: (value) =>
        value.trim().length > 0 ? null : '名前を入力してください。',
      age: (value) =>
        value >= 0 ? null : '年齢は0以上の数値を入力してください。',
    },
  });
  const [message, setMessage] = useState<string | undefined>(undefined);

  // Rustにデータを送信して、結果を受け取る。
  // Rust側でコマンドを処理する関数が同期または非同期(`async`)に関わらず、`invoke`は`Promise`を返す。
  // よって、`async/await`または`then/catch`で処理する。
  const getMessage = async (name: string, age: number) => {
    const msg = await invoke<string>('execute_command', { name, age });
    setMessage(msg);
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        getMessage(values.name, values.age);
      })}
    >
      <TextInput
        withAsterisk
        label="名前"
        placeholder="名前を入力してください。"
        {...form.getInputProps('name')}
      />
      <NumberInput
        withAsterisk
        label="年齢"
        placeholder="年齢を入力してください。"
        {...form.getInputProps('age')}
      />
      <Flex justify="flex-end" mt="xs">
        <Button type="submit" variant="filled">
          コマンドを実行
        </Button>
      </Flex>
      <Box mt="xs">{message && <Text size="sm">{message}</Text>}</Box>
    </form>
  );
};

export default ExecuteCommand;

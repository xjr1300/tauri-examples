import { useState } from 'react';

import { NumberInput, TextInput, Button, Flex, Box, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { invoke } from '@tauri-apps/api';

const ExecuteCommandJson: React.FC = () => {
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

  const getMessage = async (name: string, age: number) => {
    let args = {
      name,
      age,
    };
    const result = await invoke<object>('execute_command_json', { args });
    if (isExecuteCommandJsonResult(result)) {
      setMessage(result.message);
    }
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

// execute-command-jsonコマンド結果
type ExecuteCommandJsonResult = {
  message: string;
};

// execute-command-jsonコマンド結果型ガード関数
const isExecuteCommandJsonResult = (
  value: unknown
): value is ExecuteCommandJsonResult => {
  const result = value as ExecuteCommandJsonResult;

  return typeof result.message === 'string';
};

export default ExecuteCommandJson;

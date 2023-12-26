import { useState } from 'react';

import {
  Blockquote,
  Box,
  Button,
  Flex,
  Group,
  Radio,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle } from '@tabler/icons-react';
import { IconCircleX } from '@tabler/icons-react';
import { invoke } from '@tauri-apps/api';

const MaybeError: React.FC = () => {
  const [result, setResult] = useState<MaybeError | undefined>(undefined);
  const form = useForm({ initialValues: { maybeError: 'succeed' } });
  const infoIcon = <IconInfoCircle />;
  const errorIcon = <IconCircleX />;

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          const result = await invoke<string>('maybe_error', {
            expected: values.maybeError,
          });
          setResult({ succeeded: true, message: result });
        } catch (err) {
          console.log(err);
          if (isMaybeError(err)) {
            setResult(err);
          } else {
            setResult({
              succeeded: false,
              type: 'unexpected',
              message: 'バックエンドから想定していないエラーが返されました。',
            });
          }
        }
      })}
    >
      <Radio.Group
        name="maybeError"
        label="成功させるか、エラーさせるか選択"
        withAsterisk
        {...form.getInputProps('maybeError')}
      >
        <Group mt="sm">
          <Radio label="コマンドが成功" value="succeed" />
          <Radio label="予期しないエラーが発生" value="unexpected" />
          <Radio label="IOエラーが発生" value="io" />
        </Group>
      </Radio.Group>
      <Flex justify="flex-end" mt="xs">
        <Button type="submit" variant="filled">
          コマンドを実行
        </Button>
      </Flex>
      <Box mt="sm">
        {result?.succeeded && result.succeeded ? (
          <Blockquote color="blue" radius="0" icon={infoIcon} iconSize={30}>
            <Text size="sm">{result?.message}</Text>
          </Blockquote>
        ) : result ? (
          <Blockquote color="red" radius="0" icon={errorIcon} iconSize={30}>
            <Text size="sm">
              {result?.type}: {result?.message}
            </Text>
          </Blockquote>
        ) : (
          <></>
        )}
      </Box>
    </form>
  );
};

type MaybeError = {
  succeeded: boolean;
  type?: string;
  message: string;
};

const isMaybeError = (value: unknown): value is MaybeError => {
  let target = value as MaybeError;
  if (target.type !== null && typeof target.type !== 'string') {
    return false;
  }
  if (typeof target.message !== 'string') {
    return false;
  }

  return true;
};

export default MaybeError;

import { useState } from 'react';

import { ConfirmDialogOptions, ask } from '@tauri-apps/api/dialog';
import { Button, Flex, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { retrieveOptionalMessageType } from './utils';
import { ReadOnlyTextInput } from '../../atoms/readonly';

// 質問ダイアログを表示する。
//
// 確認ダイアログと同様の機能を提供する。
const AskDialog: React.FC = () => {
  const [dialogResult, setDialogResult] = useState('');
  const form = useForm({
    initialValues: {
      title: '',
      message: '',
      type: '',
      okLabel: 'OK',
      cancelLabel: 'キャンセル',
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          const options: ConfirmDialogOptions = {
            title: values.title,
            type: retrieveOptionalMessageType(values.type),
            okLabel: values.okLabel,
            cancelLabel: values.cancelLabel,
          };
          let result = await ask(values.message, { ...options });
          setDialogResult(
            result ? 'OKが押されました。' : 'キャンセルが押されました。'
          );
        })}
      >
        <TextInput
          name="title"
          label="タイトル"
          placeholder="タイトルを入力してください。"
          mt="sm"
          {...form.getInputProps('title')}
        />
        <TextInput
          name="message"
          label="メッセージ"
          placeholder="ダイアログに表示するメッセージを入力してください。"
          mt="sm"
          {...form.getInputProps('message')}
        />
        <Select
          name="type"
          label="ダイアログの種類"
          data={[
            { value: 'info', label: '情報' },
            { value: 'warning', label: '警告' },
            { value: 'error', label: 'エラー' },
          ]}
          clearable
          mt="sm"
        />
        <TextInput
          name="okLabel"
          label="OKボタンラベル"
          placeholder="OKボタンのラベルを入力してください。"
          mt="sm"
          {...form.getInputProps('okLabel')}
        />
        <TextInput
          name="cancelLabel"
          label="キャンセルボタンラベル"
          placeholder="キャンセルボタンのラベルを入力してください。"
          mt="sm"
          {...form.getInputProps('cancelLabel')}
        />
        <Flex justify="flex-end" mt="sm">
          <Button type="submit" variant="filled">
            ダイアログを表示
          </Button>
        </Flex>
        <ReadOnlyTextInput defaultValue={dialogResult} mt="sm" />
      </form>
    </>
  );
};

export default AskDialog;

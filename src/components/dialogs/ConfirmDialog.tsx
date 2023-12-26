import { useState } from 'react';

import { ConfirmDialogOptions, confirm } from '@tauri-apps/api/dialog';
import { Button, Flex, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { retrieveOptionalMessageType } from './utils';
import { ReadOnlyTextInput } from '../atoms/readonly';

// 確認ダイアログを表示する。
//
// macOSでは、ダイアログの種類を変更しても、ダイアログの表示は変わらない。
// UIフレームワークを利用して、独自ダイアログを表示した方が良い。
const ConfirmDialog: React.FC = () => {
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
          let result = await confirm(values.message, { ...options });
          setDialogResult(
            result ? 'OKが押されました。' : 'キャンセルが押されました。'
          );
        })}
      >
        <TextInput
          label="タイトル"
          placeholder="タイトルを入力してください。"
          {...form.getInputProps('title')}
        />
        <TextInput
          label="メッセージ"
          placeholder="ダイアログに表示するメッセージを入力してください。"
          mt="sm"
          {...form.getInputProps('message')}
        />
        <Select
          label="ダイアログの種類"
          data={[
            { value: 'info', label: '情報' },
            { value: 'warning', label: '警告' },
            { value: 'error', label: 'エラー' },
          ]}
          clearable
          mt="sm"
          {...form.getInputProps('type')}
        />
        <TextInput
          label="OKボタンラベル"
          placeholder="OKボタンのラベルを入力してください。"
          mt="sm"
          {...form.getInputProps('okLabel')}
        />
        <TextInput
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

export default ConfirmDialog;

import { MessageDialogOptions, message } from '@tauri-apps/api/dialog';
import { Button, Flex, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { retrieveOptionalMessageType } from './utils';

// メッセージダイアログを表示する。
//
// macOSでは、ダイアログの種類を変更しても、ダイアログの表示は変わらない。
// UIフレームワークを利用して、独自ダイアログを表示した方が良い。
const MessageDialog: React.FC = () => {
  const form = useForm({
    initialValues: {
      title: '',
      message: '',
      type: '',
      okLabel: 'OK',
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          const options: MessageDialogOptions = {
            title: values.title,
            type: retrieveOptionalMessageType(values.type),
            okLabel: values.okLabel,
          };
          await message(values.message, { ...options });
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
        <Flex justify="flex-end" mt="sm">
          <Button type="submit" variant="filled">
            ダイアログを表示
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default MessageDialog;

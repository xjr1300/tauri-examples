import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { invoke } from '@tauri-apps/api';
import {
  Blockquote,
  Button,
  ButtonProps,
  Checkbox,
  Divider,
  Flex,
  NumberInput,
  TextInput,
  createPolymorphicComponent,
} from '@mantine/core';
import styled from '@emotion/styled';
import { IconInfoCircle } from '@tabler/icons-react';

const StateManagement: React.FC = () => {
  const form = useForm<EditorSettings>({
    initialValues: {
      fontFamily: '',
      tabSize: 0,
      expandTab: false,
      wordWrap: false,
    },
    validate: {
      fontFamily: (value) =>
        value.trim().length > 0 ? null : 'フォントを入力してください。',
      tabSize: (value) =>
        value >= 0 ? null : 'タブサイズは0以上の数値を入力してください。',
    },
  });

  useEffect(() => {
    (async () => {
      const editorSettings = await invoke<EditorSettings>(
        'retrieve_editor_settings'
      );
      console.log(editorSettings);
      form.setValues(editorSettings);
    })();
  }, []);
  const icon = <IconInfoCircle />;

  return (
    <>
      <Blockquote color="blue" radius="0" icon={icon} iconSize={30}>
        設定はバックエンドで管理されています。更新ボタンを押して設定を更新すると、入力した設定がバックエンドに保存されます。他のコンポーネントを表示後、再度このコンポーネントを表示すると、設定が保存されていることを確認できます。
      </Blockquote>
      <Divider mt="sm" />
      <form
        onSubmit={form.onSubmit(async (values) => {
          await invoke('save_editor_settings', { newSettings: values });
        })}
      >
        <TextInput
          withAsterisk
          label="フォント"
          placeholder="フォントを入力してください。"
          mt="sm"
          {...form.getInputProps('fontFamily')}
        />
        <NumberInput
          withAsterisk
          label="タブサイズ"
          placeholder="タブサイズを入力してください。"
          {...form.getInputProps('tabSize')}
        />
        <Checkbox
          label="タブをスペースで展開する"
          mt="sm"
          {...form.getInputProps('expandTab', { type: 'checkbox' })}
        />
        <Checkbox
          label="テキストを端で折り返す"
          mt="sm"
          {...form.getInputProps('wordWrap', { type: 'checkbox' })}
        />
        <Flex justify="flex-end" mt="xs">
          <StyledButton type="submit" variant="filled">
            更新
          </StyledButton>
        </Flex>
      </form>
    </>
  );
};

type EditorSettings = {
  fontFamily: string;
  tabSize: number;
  expandTab: boolean;
  wordWrap: boolean;
};

const StyledButton = createPolymorphicComponent<'button', ButtonProps>(styled(
  Button
)`
  width: 100px;
`);

export default StateManagement;

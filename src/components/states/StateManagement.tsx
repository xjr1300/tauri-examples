import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { invoke } from '@tauri-apps/api';
import {
  Button,
  ButtonProps,
  Checkbox,
  Flex,
  NumberInput,
  TextInput,
  createPolymorphicComponent,
} from '@mantine/core';
import styled from '@emotion/styled';

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

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <TextInput
        withAsterisk
        label="フォント"
        placeholder="フォントを入力してください。"
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

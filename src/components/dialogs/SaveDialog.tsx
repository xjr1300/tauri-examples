import React, { useState } from 'react';

import { save } from '@tauri-apps/api/dialog';
import { Button, Grid, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReadOnlyTextarea } from '../atoms/readonly';
import { retrieveDefaultPath, retrieveDialogFilters } from './utils';

// ドキュメントには「Open a file/directory save dialog」とあるがディレクトリは選択できない（ようである（in macOS）。）。
// `SaveDialogOptions`に`OpenDialogOptions`にあった`directory`プロパティがない。
const SaveDialog: React.FC = () => {
  const form = useForm({
    initialValues: {
      defaultPath: '',
      filterName: '',
      filterExtensions: '',
      title: 'ファイルを保存',
    },
  });
  const [selectedPath, setSelectedPath] = useState('');

  return (
    <>
      <form
        onSubmit={form.onSubmit(async (values) => {
          const defaultPath = retrieveDefaultPath(values.defaultPath);
          const filters = retrieveDialogFilters(
            values.filterName,
            values.filterExtensions
          );
          const options = {
            defaultPath,
            filters,
            title: values.title,
          };
          const result = await save(options);
          if (typeof result === 'string') {
            setSelectedPath(result);
          }
        })}
      >
        <TextInput
          name="defaultPath"
          label="デフォルトのパス"
          placeholder="デフォルトのパスを入力してください。"
          {...form.getInputProps('defaultPath')}
        />
        <Text size="xs" fw="bold" mt="sm">
          フィルタ
        </Text>
        <Grid>
          <Grid.Col span={4}>
            <TextInput
              name="filterName"
              label="名前"
              placeholder="名前を入力してください。"
              {...form.getInputProps('filterName')}
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <TextInput
              name="filterExtensions"
              label="拡張子 (カンマ区切り)"
              placeholder="拡張子をカンマ区切りで入力してください。"
              {...form.getInputProps('filterExtensions')}
            />
          </Grid.Col>
        </Grid>
        <TextInput
          name="title"
          label="タイトル"
          placeholder="タイトルを入力してください。"
          mt="sm"
          {...form.getInputProps('title')}
        />
        <Group justify="space-between" mt="sm">
          <Button
            variant="outline"
            onClick={() => {
              form.setFieldValue('filterName', '画像ファイル');
              form.setFieldValue('filterExtensions', 'png,jpg,jpeg');
            }}
          >
            画像フィルタを設定
          </Button>
          <Button type="submit" variant="filled">
            ファイルを保存
          </Button>
        </Group>
      </form>
      <ReadOnlyTextarea
        label="選択されたパス"
        autosize
        minRows={1}
        defaultValue={selectedPath}
        mt="sm"
      />
    </>
  );
};

export default SaveDialog;

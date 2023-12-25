import React, { useState } from 'react';

import { DialogFilter, open } from '@tauri-apps/api/dialog';
import {
  Button,
  Checkbox,
  Grid,
  Group,
  Text,
  TextInput,
  Textarea,
  TextareaProps,
} from '@mantine/core';
import { useForm } from '@mantine/form';

// フロントエンドでダイアログを開く。
//
// 使用するダイアログについて、`tauri.conf.json`ファイルでダイアログの使用を許可しなければならない。
// 許可していない場合、次のエラーが発生する。
// `Unhandled Promise Rejection: The `Dialog` module is not enabled.`
//
// ```json
// {
//   "tauri": {
//     "allowlist": {
//       "dialog": {
//         "all": true, // enable all dialog APIs
//         "ask": true, // enable dialog ask API
//         "confirm": true, // enable dialog confirm API
//         "message": true, // enable dialog message API
//         "open": true, // enable file open API
//         "save": true // enable file save API
//       }
//     }
//   }
// }
// ```
const OpenDialog: React.FC = () => {
  const form = useForm({
    initialValues: {
      defaultPath: '',
      directory: false,
      filterName: '',
      filterExtensions: '',
      multiple: false,
      title: 'ファイルを開く',
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
            directory: values.directory,
            filters,
            multiple: values.multiple,
            title: values.title,
          };
          const result = await open(options);
          if (Array.isArray(result)) {
            setSelectedPath(result.join(', '));
          } else if (typeof result === 'string') {
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
        <Checkbox
          name="directory"
          label="ディレクトリを選択"
          mt="sm"
          {...form.getInputProps('directory')}
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
        <Checkbox
          name="multiple"
          label="複数選択"
          mt="sm"
          {...form.getInputProps('multiple')}
        />
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
            ファイルを開く
          </Button>
        </Group>
      </form>
      <ReadOnlyTextarea
        label="選択されたパス (複数選択した場合はカンマ区切りで出力)"
        autosize
        minRows={1}
        defaultValue={selectedPath}
        mt="sm"
      />
    </>
  );
};

const ReadOnlyTextarea: React.FC<TextareaProps> = ({ ...props }) => {
  return (
    <Textarea styles={{ input: { backgroundColor: '#f5f5f5' } }} {...props} />
  );
};

const retrieveDefaultPath = (defaultPath: string): string | undefined => {
  return defaultPath.trim().length > 0 ? defaultPath.trim() : undefined;
};

const retrieveDialogFilters = (
  filterName: string,
  filterExtensions: string
): [DialogFilter] | undefined => {
  if (filterName.trim().length === 0) return undefined;
  if (filterExtensions.trim().length === 0) return undefined;
  const extensions = filterExtensions.split(',');
  if (!Array.isArray(extensions)) return undefined;
  if (extensions.length === 0) return undefined;
  return [
    {
      name: filterName,
      extensions: extensions,
    },
  ];
};

export default OpenDialog;

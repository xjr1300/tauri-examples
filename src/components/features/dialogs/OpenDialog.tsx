import React, { useState } from 'react';

import { open } from '@tauri-apps/api/dialog';
import { Button, Checkbox, Grid, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ReadOnlyTextarea } from '../../atoms/readonly';
import { retrieveDefaultPath, retrieveDialogFilters } from './utils';

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
// ファイル／ディレクトリ選択ダイアログを表示する。
// 選択されたパスはファイルシステムとアセットプロトコルの許可リストスコープに追加される。
// このAPIの使用の容易さよりもセキュリティが重要な場合は、代わりに専用のコマンドを記述することが推奨されている。
// 許可リストスコープの変更は持続しないため、その値はアプリケーションが再起動されたときクリアされる。
// [tauri-plugin-persisted-scope](https://github.com/tauri-apps/plugins-workspace/tree/v1/plugins/persisted-scope)
// を使用すると、それをファイルシステムに保存できる。
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

export default OpenDialog;

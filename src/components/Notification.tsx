import { useState } from 'react';

import {
  Text,
  Blockquote,
  Button,
  Flex,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  isPermissionGranted,
  sendNotification,
} from '@tauri-apps/api/notification';
import { ReadOnlyCheckbox } from './atoms/readonly';
import { IconCircleX } from '@tabler/icons-react';

// 通知を送信する。
//
// 通知を送信するためには、`tauri-src/tauri.conf.json`ファイルで次の通り通知を許可しなければならない。
//
// ```json
// {
//   "tauri": {
//     "allowlist": {
//       "notification": {
//         "all": true // enable all notification APIs
//       }
//     }
//   }
// }
// ```
const Notification: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const form = useForm({
    initialValues: {
      title: '電源からの警告',
      icon: '',
      sound: '',
      body: 'コンピューターの電源を切ってください。',
    },
    validate: {
      title: (value) =>
        value.trim().length > 0 ? null : '通知のタイトルを入力してください。',
    },
  });
  const errorIcon = <IconCircleX />;

  const checkHasPermission = async () => {
    setHasPermission(await isPermissionGranted());
  };
  checkHasPermission();

  return (
    <>
      <Blockquote color="red" radius="0" icon={errorIcon} iconSize={30}>
        <Text>
          通知のアイコンを変更して、音楽を再生する方法がわかっていません。
        </Text>
      </Blockquote>
      <form
        onSubmit={form.onSubmit((values) => {
          if (hasPermission) {
            sendNotification({
              title: values.title.trim(),
              icon:
                values.icon.trim().length > 0 ? values.icon.trim() : undefined,
              sound:
                values.sound.trim().length > 0
                  ? values.sound.trim()
                  : undefined,
              body:
                values.body.trim().length > 0 ? values.body.trim() : undefined,
            });
          } else {
            console.log('通知を送信する権限がありません。');
          }
        })}
      >
        <TextInput
          label="通知のタイトル"
          placeholder="通知のタイトルを入力してください。"
          withAsterisk
          {...form.getInputProps('title')}
        />
        <TextInput
          label="通知のアイコン"
          placeholder="通知のアイコンを入力してください。"
          {...form.getInputProps('icon')}
        />
        <TextInput
          label="通知するときに再生する音楽"
          placeholder="通知するときに再生する音楽を入力してください。"
          {...form.getInputProps('sound')}
        />
        <Textarea
          label="通知する内容"
          placeholder="通知する内容を入力してください。"
          autosize
          minRows={3}
          mt="sm"
          {...form.getInputProps('body')}
        />
        <Flex mt="sm" justify="flex-end">
          <Button type="submit" variant="filled">
            通知を送信
          </Button>
        </Flex>
        <ReadOnlyCheckbox
          label="通知を送信する権限があるか?"
          checked={hasPermission}
          mt="sm"
        />
      </form>
    </>
  );
};

export default Notification;

import {
  Blockquote,
  Button,
  Divider,
  Flex,
  NumberInput,
  Table,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle } from '@tabler/icons-react';
import { invoke } from '@tauri-apps/api';
import { useEffect, useState } from 'react';

const DatabaseConnectionPool: React.FC = () => {
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const vegetables = await invoke<Vegetable[]>('retrieve_all_vegetables');
        setVegetables(vegetables);
      } catch (e) {
        console.error(e);
      }
    })();
  });
  const icon = <IconInfoCircle />;
  const form = useForm<AdditionalVegetable>({
    initialValues: {
      name: '',
      price: 0,
    },
    validate: {
      name: (value) =>
        value.trim().length > 0 ? null : '名前を入力してください。',
      price: (value) =>
        value >= 0 ? null : '価格は0以上の数値を入力してください。',
    },
  });

  return (
    <>
      <Blockquote color="blue" radius="0" icon={icon} iconSize={30}>
        データベース接続プールはステートとしてバックエンドで管理されています。
        最初はデフォルトで登録されている野菜のみを表示しますが、追加した野菜も表示されます。
        野菜はデータベースに保存されているため、他のコンポーネントを表示した後に、このコンポーネントを表示したとき、
        追加した野菜も表示されます。
        ただし、インメモリデータベースであるため、アプリを停止／再起動すると、追加した野菜は表示されません。
      </Blockquote>
      <Divider mt="sm" />
      <Table mt="sm">
        <Table.Thead>
          <Table.Th>ID</Table.Th>
          <Table.Th>名前</Table.Th>
          <Table.Th>価格</Table.Th>
        </Table.Thead>
        <Table.Tbody>
          {vegetables.map((vegetable) => (
            <Table.Tr key={vegetable.id}>
              <Table.Td>{vegetable.id}</Table.Td>
              <Table.Td>{vegetable.name}</Table.Td>
              <Table.Td>{vegetable.price}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Divider mt="sm" />
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <TextInput
          withAsterisk
          label="名前"
          placeholder="名前を入力してください。"
          mt="sm"
          {...form.getInputProps('name')}
        />
        <NumberInput
          withAsterisk
          label="価格"
          placeholder="価格を入力してください。"
          {...form.getInputProps('price')}
        />
        <Flex justify="flex-end" mt="sm">
          <Button type="submit">野菜を追加</Button>
        </Flex>
      </form>
    </>
  );
};

type Vegetable = {
  id: number;
  name: string;
  price: number;
};

type AdditionalVegetable = {
  name: string;
  price: number;
};

export default DatabaseConnectionPool;

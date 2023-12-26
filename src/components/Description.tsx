import { FC } from 'react';
import { Blockquote, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

const Description: FC = () => {
  const icon = <IconInfoCircle />;
  return (
    <Blockquote color="blue" radius="0" icon={icon} iconSize={30}>
      <Text size="sm">
        これは、Tauriを使用してどのようなことができるか調査するアプリです。
      </Text>
    </Blockquote>
  );
};

export default Description;

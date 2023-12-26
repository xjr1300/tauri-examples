import { Text, TextProps } from '@mantine/core';

interface SemiBoldTextProps extends TextProps {
  children?: React.ReactNode;
}
const ItemLabel: React.FC<SemiBoldTextProps> = ({ ...props }) => {
  return (
    <Text size="xs" fw={700} {...props}>
      {props.children}
    </Text>
  );
};

export default ItemLabel;

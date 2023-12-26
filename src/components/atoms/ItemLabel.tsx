import { Text, TextProps } from '@mantine/core';

interface ItemLabelProps extends TextProps {
  children?: React.ReactNode;
}
const ItemLabel: React.FC<ItemLabelProps> = ({ ...props }) => {
  return (
    <Text size="xs" fw={700} {...props}>
      {props.children}
    </Text>
  );
};

export default ItemLabel;

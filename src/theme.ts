import {
  Button,
  NumberInput,
  Radio,
  TextInput,
  createTheme,
} from '@mantine/core';

export const theme = createTheme({
  // fontSizes: {
  //   xs: rem(10),
  //   sm: rem(12),
  //   md: rem(14),
  //   lg: rem(16),
  //   xl: rem(20),
  // },
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        size: 'xs',
        radius: 0,
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        size: 'xs',
        radius: 0,
      },
    }),
    Button: Button.extend({
      defaultProps: {
        size: 'xs',
        radius: 0,
      },
    }),
    Radio: Radio.extend({
      defaultProps: {
        size: 'sm',
        variant: 'outline',
      },
    }),
  },
});

import {
  Button,
  NumberInput,
  Radio,
  TextInput,
  Text,
  createTheme,
  Select,
  Textarea,
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
    Text: Text.extend({
      defaultProps: {
        size: 'sm',
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        size: 'xs',
        radius: 0,
      },
    }),
    Textarea: Textarea.extend({
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
    Select: Select.extend({
      defaultProps: {
        size: 'xs',
        radius: 0,
      },
    }),
  },
});

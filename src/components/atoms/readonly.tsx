import {
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
} from '@mantine/core';

export const ReadOnlyTextInput: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <TextInput
      readOnly
      styles={{ input: { backgroundColor: '#f5f5f5' } }}
      {...props}
    />
  );
};

export const ReadOnlyTextarea: React.FC<TextareaProps> = ({ ...props }) => {
  return (
    <Textarea
      readOnly
      styles={{ input: { backgroundColor: '#f5f5f5' } }}
      {...props}
    />
  );
};

import { Textarea, TextareaProps } from '@mantine/core';
import { DialogFilter } from '@tauri-apps/api/dialog';

export const ReadOnlyTextarea: React.FC<TextareaProps> = ({ ...props }) => {
  return (
    <Textarea styles={{ input: { backgroundColor: '#f5f5f5' } }} {...props} />
  );
};

export const retrieveDefaultPath = (
  defaultPath: string
): string | undefined => {
  return defaultPath.trim().length > 0 ? defaultPath.trim() : undefined;
};

export const retrieveDialogFilters = (
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

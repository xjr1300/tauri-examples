import { DialogFilter } from '@tauri-apps/api/dialog';

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

export const retrieveOptionalMessageType = (
  value: string | undefined
): 'info' | 'warning' | 'error' | undefined => {
  if (value === null) return undefined;
  if (value === '') return undefined;
  if (['info', 'warning', 'error'].includes(value!))
    return value as 'info' | 'warning' | 'error' | undefined;
  return undefined;
};

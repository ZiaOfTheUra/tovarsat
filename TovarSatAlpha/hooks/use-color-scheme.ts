import { useColorScheme as useRNColorScheme } from 'react-native';

export { useRNColorScheme as useColorScheme };

/**
 * Safe version of useColorScheme that returns 'light' when
 * the system color scheme is 'unspecified' or null.
 * This avoids TypeScript errors when indexing theme objects
 * that only define 'light' and 'dark' keys.
 */
export function useColorSchemeSafe(): 'light' | 'dark' {
  const scheme = useRNColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

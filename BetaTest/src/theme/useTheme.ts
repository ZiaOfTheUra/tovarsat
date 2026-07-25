import { useColorScheme } from 'react-native'
import { lightTokens, darkTokens, type ThemeTokens } from './tokens'

/**
 * Returns the current theme's design tokens.
 * Automatically switches based on system color scheme.
 */
export function useTheme(): ThemeTokens {
  const scheme = useColorScheme()
  return scheme === 'dark' ? darkTokens : lightTokens
}
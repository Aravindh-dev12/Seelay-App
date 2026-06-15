import React, { createContext, useContext } from 'react';

export const colors = {
  // Gradient Black Base
  background: '#000000',
  surface: '#0b0b0b',
  surfaceElevated: '#121212',
  
  // Gradient Accents (Monochrome)
  sand: ['#ffffff', '#d9d9d9', '#b3b3b3'] as const,
  ash: ['#7f7f7f', '#404040'] as const,
  copper: ['#f2f2f2', '#a6a6a6'] as const,
  sage: ['#e6e6e6', '#8c8c8c'] as const,
  
  // Text
  textPrimary: '#ffffff',
  textSecondary: '#cccccc',
  textMuted: '#7f7f7f',
  
  // Borders
  border: 'rgba(255,255,255,0.1)',
  borderActive: 'rgba(255,255,255,0.5)',
  
  // Functional
  error: '#ffffff',
  success: '#ffffff',
};

export const gradients = {
  sand: { colors: colors.sand, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  ash: { colors: colors.ash, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  copper: { colors: colors.copper, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  sage: { colors: colors.sage, start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  background: {
    colors: ['#080808', '#030303', '#000000'] as const,
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  display: { fontSize: 32, fontWeight: '900' as const, letterSpacing: -0.5 },
  h1: { fontSize: 28, fontWeight: '900' as const },
  h2: { fontSize: 24, fontWeight: '800' as const },
  h3: { fontSize: 20, fontWeight: '700' as const },
  body: { fontSize: 16, fontWeight: '500' as const },
  caption: { fontSize: 14, fontWeight: '400' as const },
  small: { fontSize: 12, fontWeight: '500' as const },
  tiny: { fontSize: 10, fontWeight: '600' as const, letterSpacing: 1 },
  // Sacramento font for "SEELAY" heading only — script/cursive brand identity
  title: {
    fontSize: 48,
    fontWeight: '400' as const,
    fontFamily: 'Sacramento_400Regular',
    letterSpacing: 1,
  },
  titleSmall: {
    fontSize: 32,
    fontWeight: '400' as const,
    fontFamily: 'Sacramento_400Regular',
    letterSpacing: 1,
  },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
};

const ThemeContext = createContext({ colors, gradients, spacing, typography, shadows });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ colors, gradients, spacing, typography, shadows }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

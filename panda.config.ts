import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/app/**/*.{ts,tsx,js,jsx}'],
  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      sizes: {
        xs: { value: '0.5rem' },
        sm: { value: '0.625rem' },
        md: { value: '1rem' },
        lg: { value: '1.5rem' },
        xl: { value: '2rem' },
        border: { input: { value: '1px' } },
        header: { value: '6rem' },
        icon: { value: '4rem' },
      },
      spacing: {
        xs: { value: '{sizes.xs}' },
        sm: { value: '{sizes.sm}' },
        md: { value: '{sizes.md}' },
        lg: { value: '{sizes.lg}' },
        xl: { value: '{sizes.xl}' },
        gridGap: { main: { value: '24px' } },
        header: { value: '{sizes.header}' },
      },
      colors: {
        primary: {
          light: { value: '#7FFFD4' },
          dark: { value: '#40806A' },
          bg: { value: '#E7FFF7' },
        },
        secondary: { light: { value: '#FFD47F' }, dark: { value: '#8F7747' } },
        tertiary: { light: { value: '#D47FFF' }, dark: { value: '#6A4080' } },
      },
      borders: {
        primary: {
          value: '{sizes.border.input} solid {colors.primary.dark}',
        },
        secondary: {
          value: '{sizes.border.input} solid {colors.secondary.dark}',
        },
        tertiary: {
          value: '{sizes.border.input} solid {colors.tertiary.dark}',
        },
      },
      fontSizes: {
        sm: { value: '{sizes.sm}' },
        md: { value: '{sizes.md}' },
        lg: { value: '{sizes.lg}' },
        xl: { value: '{sizes.xl}' },
      },
      radii: {
        input: { value: '{sizes.sm}' },
        card: { value: '{sizes.md}' },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});

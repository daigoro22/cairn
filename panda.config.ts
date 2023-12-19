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
        header: { width: { value: '12rem' }, height: { value: '6rem' } },
        icon: { menu: { value: '4rem' }, reviewCard: { value: '2rem' } },
        menu: { width: { value: '9rem' }, maxHeight: { value: '5rem' } },
        item: {
          review: { value: '12rem' },
          top: { value: '100%' },
          itemModal: { value: '6rem' },
        },
      },
      spacing: {
        xs: { value: '{sizes.xs}' },
        sm: { value: '{sizes.sm}' },
        md: { value: '{sizes.md}' },
        lg: { value: '{sizes.lg}' },
        xl: { value: '{sizes.xl}' },
        gridGap: {
          sm: { value: '5px' },
          md: { value: '24px' },
          lg: { value: '12px' },
        },
        header: {
          width: { value: '{sizes.header.width}' },
          height: { value: '{sizes.header.height}' },
        },
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
        xs: { value: '{sizes.xs}' },
        sm: { value: '0.725rem' },
        md: { value: '{sizes.md}' },
        lg: { value: '1.25rem' },
        xl: { value: '{sizes.xl}' },
      },
      radii: {
        input: { value: '{sizes.sm}' },
        card: { md: { value: '{sizes.md}' }, xs: { value: '{sizes.xs}' } },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});

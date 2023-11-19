const tokens = {
  "sizes.sm": {
    "value": "0.625rem",
    "variable": "var(--sizes-sm)"
  },
  "sizes.md": {
    "value": "1rem",
    "variable": "var(--sizes-md)"
  },
  "sizes.bg": {
    "value": "1.5rem",
    "variable": "var(--sizes-bg)"
  },
  "sizes.xl": {
    "value": "2rem",
    "variable": "var(--sizes-xl)"
  },
  "sizes.border.input": {
    "value": "1px",
    "variable": "var(--sizes-border-input)"
  },
  "sizes.breakpoint-sm": {
    "value": "640px",
    "variable": "var(--sizes-breakpoint-sm)"
  },
  "sizes.breakpoint-md": {
    "value": "768px",
    "variable": "var(--sizes-breakpoint-md)"
  },
  "sizes.breakpoint-lg": {
    "value": "1024px",
    "variable": "var(--sizes-breakpoint-lg)"
  },
  "sizes.breakpoint-xl": {
    "value": "1280px",
    "variable": "var(--sizes-breakpoint-xl)"
  },
  "sizes.breakpoint-2xl": {
    "value": "1536px",
    "variable": "var(--sizes-breakpoint-2xl)"
  },
  "colors.primary.light": {
    "value": "#7FFFD4",
    "variable": "var(--colors-primary-light)"
  },
  "colors.primary.dark": {
    "value": "#40806A",
    "variable": "var(--colors-primary-dark)"
  },
  "colors.secondary.light": {
    "value": "#FFD47F",
    "variable": "var(--colors-secondary-light)"
  },
  "colors.secondary.dark": {
    "value": "#8F7747",
    "variable": "var(--colors-secondary-dark)"
  },
  "colors.tertiary.light": {
    "value": "#D47FFF",
    "variable": "var(--colors-tertiary-light)"
  },
  "colors.tertiary.dark": {
    "value": "#6A4080",
    "variable": "var(--colors-tertiary-dark)"
  },
  "borders.primary": {
    "value": "var(--sizes-border-input) solid var(--colors-primary-dark)",
    "variable": "var(--borders-primary)"
  },
  "fontSizes.sm": {
    "value": "var(--sizes-sm)",
    "variable": "var(--font-sizes-sm)"
  },
  "fontSizes.md": {
    "value": "var(--sizes-md)",
    "variable": "var(--font-sizes-md)"
  },
  "radii.input": {
    "value": "var(--sizes-sm)",
    "variable": "var(--radii-input)"
  },
  "breakpoints.sm": {
    "value": "640px",
    "variable": "var(--breakpoints-sm)"
  },
  "breakpoints.md": {
    "value": "768px",
    "variable": "var(--breakpoints-md)"
  },
  "breakpoints.lg": {
    "value": "1024px",
    "variable": "var(--breakpoints-lg)"
  },
  "breakpoints.xl": {
    "value": "1280px",
    "variable": "var(--breakpoints-xl)"
  },
  "breakpoints.2xl": {
    "value": "1536px",
    "variable": "var(--breakpoints-2xl)"
  },
  "colors.colorPalette.light": {
    "value": "var(--colors-color-palette-light)",
    "variable": "var(--colors-color-palette-light)"
  },
  "colors.colorPalette.dark": {
    "value": "var(--colors-color-palette-dark)",
    "variable": "var(--colors-color-palette-dark)"
  }
}

export function token(path, fallback) {
  return tokens[path]?.value || fallback
}

function tokenVar(path, fallback) {
  return tokens[path]?.variable || fallback
}

token.var = tokenVar
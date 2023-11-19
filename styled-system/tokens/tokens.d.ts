/* eslint-disable */
export type Token = "sizes.sm" | "sizes.md" | "sizes.bg" | "sizes.xl" | "sizes.border.input" | "sizes.breakpoint-sm" | "sizes.breakpoint-md" | "sizes.breakpoint-lg" | "sizes.breakpoint-xl" | "sizes.breakpoint-2xl" | "colors.primary.light" | "colors.primary.dark" | "colors.secondary.light" | "colors.secondary.dark" | "colors.tertiary.light" | "colors.tertiary.dark" | "borders.primary" | "fontSizes.sm" | "fontSizes.md" | "radii.input" | "breakpoints.sm" | "breakpoints.md" | "breakpoints.lg" | "breakpoints.xl" | "breakpoints.2xl" | "colors.colorPalette.light" | "colors.colorPalette.dark"

export type ColorPalette = "primary" | "secondary" | "tertiary"

export type SizeToken = "sm" | "md" | "bg" | "xl" | "border.input" | "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type ColorToken = "primary.light" | "primary.dark" | "secondary.light" | "secondary.dark" | "tertiary.light" | "tertiary.dark" | "colorPalette.light" | "colorPalette.dark"

export type BorderToken = "primary"

export type FontSizeToken = "sm" | "md"

export type RadiusToken = "input"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type AnimationName = "spin" | "ping" | "pulse" | "bounce"

export type Tokens = {
		sizes: SizeToken
		colors: ColorToken
		borders: BorderToken
		fontSizes: FontSizeToken
		radii: RadiusToken
		breakpoints: BreakpointToken
		animationName: AnimationName
} & { [token: string]: never }

export type TokenCategory = "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "shadows" | "spacing" | "radii" | "borders" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"
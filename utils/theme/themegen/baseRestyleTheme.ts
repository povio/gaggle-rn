import type { BaseTheme } from "@shopify/restyle";

/**
 * TEXT VARIANT REFERENCE:
 *
 * variant-1: 14px • Medium (500) • Line: 17px
 * variant-2-prominent: 18px • SemiBold (600) • Line: 27.4px • UPPERCASE
 * variant-3-prominent: 18px • SemiBold (600) • Line: 24px
 * variant-4: 14px • Medium (500) • Line: 17px
 * variant-5-prominent: 26px • SemiBold (600) • Line: 29px
 * variant-6-prominent: 24px • SemiBold (600) • Line: 29px
 * variant-7: 15px • Regular (400) • Line: 18px
 * variant-8: 18px • Medium (500) • Line: 22px
 * variant-9: 11px • Regular (400) • Line: 11px
 * variant-10-prominent: 16px • SemiBold (600) • Line: 20px
 * variant-11: 18px • Medium (500) • Line: 20px
 * variant-12: 14px • Medium (500) • Line: 15px
 * variant-13-prominent: 21px • SemiBold (600) • Line: 27px
 */

// write all your custom non-theme config here
export const baseRestyleConfig: BaseTheme = {
  colors: {
    transparent: "transparent",
  },
  borderRadii: {},
  spacing: {},
  breakpoints: {
    smallPhone: 0,
    phone: 412,
    tablet: 768,
    tabletLandscape: 1024,
  },
  textVariants: {
    "variant-1": {
      fontSize: 14,
      fontFamily: "BalooBhai2-Medium",
      lineHeight: 17,
    },
    "variant-2-prominent": {
      fontSize: 18,
      fontFamily: "BalooBhai2-SemiBold",
      lineHeight: 27.4,
      textTransform: "uppercase",
    },
    "variant-3-prominent": {
      fontSize: 18,
      fontFamily: "BalooBhai2-SemiBold",
      lineHeight: 24,
    },
    "variant-4": {
      fontSize: 14,
      fontFamily: "BalooBhai2-Medium",
      lineHeight: 17,
    },
    "variant-5-prominent": {
      fontSize: 26,
      fontFamily: "BalooBhai2-SemiBold",
      lineHeight: 29,
    },
    "variant-6-prominent": {
      fontSize: 24,
      fontFamily: "BalooBhai2-SemiBold",
      lineHeight: 29,
    },
    "variant-7": {
      fontSize: 15,
      fontFamily: "BalooBhai2-Regular",
      lineHeight: 18,
    },
    "variant-8": {
      fontSize: 18,
      fontFamily: "BalooBhai2-Medium",
      lineHeight: 22,
    },
    "variant-9": {
      fontSize: 11,
      fontFamily: "BalooBhai2-Regular",
      lineHeight: 11,
    },
    "variant-10-prominent": {
      fontSize: 16,
      fontFamily: "BalooBhai2-SemiBold",
      lineHeight: 20,
    },
    "variant-11": {
      fontSize: 18,
      fontFamily: "BalooBhai2-Medium",
      lineHeight: 20,
    },
    "variant-12": {
      fontSize: 14,
      fontFamily: "BalooBhai2-Medium",
      lineHeight: 15,
    },
    "variant-13-prominent": {
      fontSize: 21,
      fontFamily: "BalooBhai2-SemiBold",
      lineHeight: 27,
    },
    defaults: {
      fontSize: 14,
      fontFamily: "BalooBhai2-Regular",
      lineHeight: 17,
    },
  },
  buttonVariants: {
    primary: {
      color: "interactive-primary-on",
      colorPressed: "interactive-primary-on",
      colorDisabled: "interactive-primary-on",
      backgroundColor: "interactive-primary-idle",
      backgroundColorPressed: "interactive-primary-pressed",
      backgroundColorDisabled: "interactive-primary-disabled",
      borderColor: "transparent",
      borderColorPressed: "transparent",
      borderColorDisabled: "transparent",
    },
    secondary: {
      color: "interactive-primary-on",
      colorPressed: "interactive-primary-on",
      colorDisabled: "interactive-primary-on",
      backgroundColor: "interactive-secondary-idle",
      backgroundColorPressed: "interactive-secondary-pressed",
      backgroundColorDisabled: "interactive-secondary-disabled",
      borderColor: "transparent",
      borderColorPressed: "transparent",
      borderColorDisabled: "transparent",
    },
    outlined: {
      color: "interactive-outlined-idle",
      colorPressed: "interactive-outlined-pressed",
      colorDisabled: "interactive-outlined-disabled",
      backgroundColor: "transparent",
      backgroundColorPressed: "transparent",
      backgroundColorDisabled: "transparent",
      borderColor: "interactive-outlined-idle",
      borderColorPressed: "interactive-outlined-pressed",
      borderColorDisabled: "interactive-outlined-disabled",
    },
  },
  buttonWidths: {
    s: 112,
    m: 156,
    l: 192,
    fit: "100%",
  },
  buttonSizes: {
    small: "height-height-s",
    default: "height-height-m",
    large: "height-height-l",
  },
  iconButtonVariants: {
    primary: {
      color: "interactive-primary-on",
      colorPressed: "interactive-primary-on",
      colorDisabled: "interactive-primary-on",
      backgroundColor: "interactive-primary-idle",
      backgroundColorPressed: "interactive-primary-pressed",
      backgroundColorDisabled: "interactive-primary-disabled",
      borderColor: "transparent",
      borderColorPressed: "transparent",
      borderColorDisabled: "transparent",
    },
    secondary: {
      color: "interactive-primary-on",
      colorPressed: "interactive-primary-on",
      colorDisabled: "interactive-primary-on",
      backgroundColor: "interactive-secondary-idle",
      backgroundColorPressed: "interactive-secondary-pressed",
      backgroundColorDisabled: "interactive-secondary-disabled",
      borderColor: "transparent",
      borderColorPressed: "transparent",
      borderColorDisabled: "transparent",
    },
    outlined: {
      color: "interactive-outlined-idle",
      colorPressed: "interactive-outlined-pressed",
      colorDisabled: "interactive-outlined-disabled",
      backgroundColor: "transparent",
      backgroundColorPressed: "transparent",
      backgroundColorDisabled: "transparent",
      borderColor: "interactive-outlined-idle",
      borderColorPressed: "interactive-outlined-pressed",
      borderColorDisabled: "interactive-outlined-disabled",
    },
    transparent: {
      color: "interactive-icon-idle",
      colorPressed: "interactive-icon-pressed",
      colorDisabled: "interactive-icon-disabled",
      backgroundColor: "transparent",
      backgroundColorPressed: "transparent",
      backgroundColorDisabled: "transparent",
      borderColor: "transparent",
      borderColorPressed: "transparent",
      borderColorDisabled: "transparent",
      borderColorDisabledToggled: "transparent",
    },
  },
  iconButtonSizes: {
    s: "height-height-s",
    m: "height-height-m",
    l: "height-height-l",
  },
  inputVariants: {
    outlined: {
      backgroundColor: "elevation-background",
      backgroundColorActive: "elevation-background",
      backgroundColorError: "elevation-background",
      backgroundColorDisabled: "elevation-background",
      borderColor: "elevation-outline-2",
      borderColorActive: "interactive-primary-idle",
      borderColorError: "informational-error-outline",
      borderColorDisabled: "elevation-outline-2",
      color: "text-default-primary",
      colorActive: "text-default-primary",
      colorError: "text-default-primary",
      colorDisabled: "interactive-text-disabled",
      labelColor: "text-default-primary",
      labelColorActive: "text-default-primary",
      labelColorError: "text-default-primary",
      labelColorDisabled: "interactive-text-disabled",
    },
    filled: {
      backgroundColor: "elevation-surface-2",
      backgroundColorActive: "elevation-background",
      backgroundColorError: "elevation-surface-2",
      backgroundColorDisabled: "elevation-surface-2",
      borderColor: "transparent",
      borderColorActive: "interactive-primary-idle",
      borderColorError: "informational-error-outline",
      borderColorDisabled: "transparent",
      color: "text-default-primary",
      colorActive: "text-default-primary",
      colorError: "text-default-primary",
      colorDisabled: "interactive-text-disabled",
      labelColor: "text-default-primary",
      labelColorActive: "text-default-primary",
      labelColorError: "text-default-primary",
      labelColorDisabled: "interactive-text-disabled",
    },
  },
  pillVariants: {
    primary: {
      color: "interactive-tertiary-on",
      colorPressed: "interactive-tertiary-on",
      colorDisabled: "interactive-tertiary-on-disabled",
      backgroundColor: "interactive-tertiary-idle",
      backgroundColorPressed: "interactive-tertiary-pressed",
      backgroundColorDisabled: "interactive-tertiary-idle",
      borderColor: "transparent",
      borderColorPressed: "transparent",
      borderColorDisabled: "transparent",
      borderColorDisabledToggled: "transparent",
    },
    toggle: {
      color: "interactive-tertiary-on",
      colorPressed: "interactive-tertiary-on",
      colorDisabled: "interactive-tertiary-on-disabled",
      backgroundColor: "interactive-tertiary-idle",
      backgroundColorPressed: "interactive-tertiary-idle",
      backgroundColorDisabled: "interactive-tertiary-idle",
      borderColor: "transparent",
      borderColorPressed: "interactive-tertiary-toggled",
      borderColorDisabled: "transparent",
      borderColorDisabledToggled: "interactive-tertiary-on-disabled",
    },
    filled: {
      color: "pill-default-text",
      colorPressed: "pill-default-text",
      colorDisabled: "pill-default-text",
      backgroundColor: "transparent",
      backgroundColorPressed: "transparent",
      backgroundColorDisabled: "transparent",
      borderColor: "pill-default-border",
      borderColorPressed: "pill-filled-border",
      borderColorDisabled: "pill-default-border",
      borderColorDisabledToggled: "pill-default-border",
      backgroundColorToggled: "pill-filled-bg",
      borderColorToggled: "pill-filled-border",
    },
    outlined: {
      color: "pill-default-text",
      colorPressed: "pill-default-text",
      colorDisabled: "pill-default-text",
      backgroundColor: "transparent",
      backgroundColorPressed: "transparent",
      backgroundColorDisabled: "transparent",
      borderColor: "pill-default-border",
      borderColorPressed: "pill-outlined-border",
      borderColorDisabled: "pill-default-border",
      borderColorDisabledToggled: "pill-default-border",
      backgroundColorToggled: "pill-outlined-bg",
      borderColorToggled: "pill-outlined-border",
    },
    active: {
      color: "interactive-primary-on",
      colorPressed: "interactive-primary-on",
      colorDisabled: "interactive-text-disabled",
      backgroundColor: "pill-outlined-border",
      backgroundColorPressed: "pill-outlined-border",
      backgroundColorDisabled: "interactive-tertiary-idle",
      borderColor: "pill-outlined-border",
      borderColorPressed: "pill-outlined-border",
      borderColorDisabled: "pill-default-border",
      borderColorDisabledToggled: "pill-default-border",
    },
  },
  textButtonVariants: {
    dual: {
      color: "interactive-text-on-bg",
      colorPressed: "interactive-text-pressed",
      colorDisabled: "interactive-text-disabled",
      backgroundColor: "transparent",
      backgroundColorPressed: "transparent",
      backgroundColorDisabled: "transparent",
      iconColor: "interactive-text-on-bg-2",
      iconColorPressed: "interactive-text-pressed",
      iconColorDisabled: "interactive-text-disabled",
    },
    secondary: {
      color: "interactive-text-on-bg",
      colorPressed: "interactive-text-pressed",
      colorDisabled: "interactive-text-disabled",
      backgroundColor: "transparent",
      backgroundColorPressed: "transparent",
      backgroundColorDisabled: "transparent",
      iconColor: "interactive-text-on-bg",
      iconColorPressed: "interactive-text-pressed",
      iconColorDisabled: "interactive-text-disabled",
    },
    primary: {
      color: "interactive-text-on-bg-2",
      colorPressed: "interactive-text-pressed",
      colorDisabled: "interactive-text-disabled",
      backgroundColor: "transparent",
      backgroundColorPressed: "transparent",
      backgroundColorDisabled: "transparent",
      iconColor: "interactive-text-on-bg-2",
      iconColorPressed: "interactive-text-pressed",
      iconColorDisabled: "interactive-text-disabled",
    },
    toast: {
      backgroundColor: "transparent",
      backgroundColorPressed: "transparent",
      backgroundColorDisabled: "transparent",
      color: "interactive-text-on-inverted",
      colorPressed: "interactive-text-pressed",
      colorDisabled: "interactive-text-disabled",
      iconColor: "interactive-text-on-inverted",
      iconColorPressed: "interactive-text-pressed",
      iconColorDisabled: "interactive-text-disabled",
    },
  },
  toastVariants: {
    neutral: {
      backgroundColor: "interactive-secondary-idle",
    },
    success: {
      backgroundColor: "informational-success",
    },
    warning: {
      backgroundColor: "informational-warning",
    },
    error: {
      backgroundColor: "informational-error",
    },
  },
  listItems: {
    single: {
      backgroundColor: "transparent",
      backgroundColorSelected: "interactive-primary-idle",
      backgroundColorPressed: "transparent",
      labelColor: "interactive-text-on-bg",
      labelColorSelected: "interactive-text-on-inverted",
      labelColorPressed: "interactive-text-pressed",
      sublabelColor: "text-default-tertiary",
      sublabelColorSelected: "text-inverted-tertiary",
      borderColor: "elevation-outline-1",
      borderRadius: "none",
    },
    multiple: {
      backgroundColor: "transparent",
      backgroundColorSelected: "transparent",
      backgroundColorPressed: "transparent",
      labelColor: "interactive-text-on-bg",
      labelColorSelected: "interactive-text-on-bg",
      labelColorPressed: "interactive-text-pressed",
      sublabelColor: "text-default-tertiary",
      sublabelColorSelected: "text-default-tertiary",
      borderColor: "elevation-outline-1",
      borderRadius: "none",
    },
    action: {
      backgroundColor: "elevation-background",
      backgroundColorSelected: "elevation-background",
      backgroundColorPressed: "elevation-background",
      labelColor: "interactive-text-on-bg",
      labelColorSelected: "interactive-text-on-inverted",
      labelColorPressed: "interactive-text-pressed",
      sublabelColor: "text-default-tertiary",
      sublabelColorSelected: "text-inverted-tertiary",
      borderColor: "transparent",
      borderRadius: "4xl",
    },
  },
  shadows: {
    "shadow-1": {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 3,
    },
    "shadow-2": {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2.22,
      elevation: 5,
    },
    "shadow-3": {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 2.62,
      elevation: 8,
    },
    "shadow-4": {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 16,
    },
  },
  blurs: {
    "bg-blur-0": 0,
    "bg-blur-1": 10,
    "bg-blur-2": 20,
    "bg-blur-3": 30,
    "bg-blur-4": 50,
    "bg-blur-5": 60,
    "bg-blur-6": 70,
    "bg-blur-7": 80,
  },
};

export const restyleConfigTemplate = (jsonConfig: string) => {
  return `
  import { createTheme } from "@shopify/restyle";

  const theme = createTheme(${jsonConfig});
  
  export type Theme = typeof theme;
  export type ThemeColor = keyof Theme["colors"];
  
  export default theme;  
`;
};

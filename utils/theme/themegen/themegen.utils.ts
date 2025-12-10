import type { Declaration } from "css";

export namespace ThemegenUtils {
  const parseUnitToNumber = (str: string, unit: string) => {
    return parseFloat(str.replace(unit, ""));
  };

  export const parsePxToNumber = (px: string) => {
    return parseUnitToNumber(px, "px");
  };

  // TODO: remove px is in form of 16px
  export const pxToRem = (px: string) => {
    const pxValue = parsePxToNumber(px);
    return `${pxValue / 16}rem`;
  };

  export const computeLineHeightUnitless = (fontSizePx: string, lineHeightPx: string) => {
    const fontSize = parsePxToNumber(fontSizePx);
    const lineHeight = parsePxToNumber(lineHeightPx);
    return (lineHeight / fontSize).toString();
  };

  export const computeLetterSpacingEm = (letterSpacingPercent: string) => {
    const letterSpacing = parseUnitToNumber(letterSpacingPercent, "%");
    return `${letterSpacing * 0.01}em`;
  };

  export const resolveVariableValue = (variable: string, variables: Declaration[]): string => {
    const normalizedVariable = variable.replaceAll("\n", "").replaceAll(" ", "").trim();

    if (normalizedVariable.includes("var(--")) {
      const variableName = normalizedVariable.replace("var(--", "").replace(")", "");

      const resolvedVariable = variables.find(
        (v) => v.property === `--${variableName}` || v.property === `--${variableName}-default-value`,
      )?.value;

      if (!resolvedVariable) {
        throw new Error(`Could not resolve variable ${variableName}`);
      }

      return resolveVariableValue(resolvedVariable, variables);
    }

    return variable;
  };

  const isObject = (item: unknown) => {
    return item && typeof item === "object" && !Array.isArray(item);
  };

  export const mergeDeep = (target: any, ...sources: any[]): any => {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return mergeDeep(target, ...sources);
  };
}

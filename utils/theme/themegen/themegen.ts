import { spawnSync } from "child_process";
import css, { type Declaration, type Rule } from "css";
import fs from "fs";
import path from "path";

import { baseRestyleConfig, restyleConfigTemplate } from "./baseRestyleTheme";
import { ThemegenUtils } from "./themegen.utils";

const inputFilePath = path.join(__dirname, "./index.css");

const outputFilePath = path.join(__dirname, "../restyleTheme.ts");

const themeString = fs.readFileSync(inputFilePath, "utf8");

const theme = css.parse(themeString);

if (!theme.stylesheet) {
  throw new Error("Could not parse theme - no stylesheet");
}

// oxlint-disable-next-line no-unsafe-type-assertion
const variables = theme.stylesheet.rules
  .filter((rule): rule is Rule => rule.type === "rule" && rule.selectors?.[0] === ":root")
  .flatMap((rule) => rule.declarations) as Declaration[];

/* COLOR */

const colors: Record<string, string> = {};

const notBaseColorVariables = variables.filter((variable) => variable.value?.includes("--base-palette"));

for (const colorVariable of notBaseColorVariables) {
  if (!colorVariable.property || !colorVariable.value) {
    continue;
  }

  const colorName = colorVariable.property.replace("-default-value", "").replace("-light", "").replace("--", "");

  colors[colorName] = ThemegenUtils.resolveVariableValue(colorVariable.value, variables);
}

/* BORDER RADIUS */

const borderRadii: Record<string, number> = {};

const borderRadiusVariables = variables.filter(
  (variable) => variable.property?.includes("--border-radius") || variable.value?.includes("--border-radius"),
);

for (const borderRadiusVariable of borderRadiusVariables) {
  if (!borderRadiusVariable.property || !borderRadiusVariable.value) {
    continue;
  }

  const borderRadiusName = borderRadiusVariable.property
    .replace("-default-value", "")
    .replace("--border-radius-", "")
    .replace("-applied", "")
    .replace("--", "");
  borderRadii[borderRadiusName] = ThemegenUtils.parsePxToNumber(
    ThemegenUtils.resolveVariableValue(borderRadiusVariable.value, variables),
  );
}

/* SPACING */

const spacing: Record<string, number> = {};

const spacingVariables = variables.filter(
  (variable) => variable.property?.includes("--spacing") || variable.value?.includes("--spacing"),
);

for (const spacingVariable of spacingVariables) {
  if (!spacingVariable.property || !spacingVariable.value) {
    continue;
  }

  const spacingName = spacingVariable.property
    .replace("-default-value", "")
    .replace("--spacing-", "")
    .replace("-applied", "")
    .replace("--", "");

  spacing[spacingName] = ThemegenUtils.parsePxToNumber(
    ThemegenUtils.resolveVariableValue(spacingVariable.value, variables),
  );
}

const restyleTheme = {
  colors,
  borderRadii,
  spacing,
};

// merge with base theme

const fullRestyleTheme = ThemegenUtils.mergeDeep(baseRestyleConfig, restyleTheme);

const fileContents = restyleConfigTemplate(JSON.stringify(fullRestyleTheme, null, 2));

fs.writeFileSync(outputFilePath, fileContents);

// run the formatter
spawnSync("yarn", ["prettier", "--write", outputFilePath], {
  stdio: "inherit",
});

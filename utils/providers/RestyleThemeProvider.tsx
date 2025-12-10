import { ThemeProvider } from "@shopify/restyle";
import type { PropsWithChildren } from "react";

import theme from "../theme/restyleTheme";

function RestyleThemeProvider(props: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default RestyleThemeProvider;

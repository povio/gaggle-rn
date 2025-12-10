import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import type { FC, PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import GestureHandlerProvider from "./GestureHandlerProvider";
import RestyleThemeProvider from "./RestyleThemeProvider";
import TanstackQueryProvider from "./TanstackQueryProvider";

/* eslint-disable-next-line */
type AnyChildren = PropsWithChildren<any>;

export const combineProviders = <ComponentType extends FC>(...components: PropsWithChildren<ComponentType>[]) => {
  return components.reduce(
    (AccumulatedComponents: AnyChildren, CurrentComponent: AnyChildren) => {
      return ({ children }: AnyChildren) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>,
  );
};

/**
 *  The order of the providers is significant
 *  NOTE: If you need to change the order, DO IT CAREFULLY!
 */
const providers = [
  SafeAreaProvider,
  RestyleThemeProvider,
  TanstackQueryProvider,
  GestureHandlerProvider,
  BottomSheetModalProvider,
] as const;

const AppContextProviders = combineProviders(...providers);

export default AppContextProviders;

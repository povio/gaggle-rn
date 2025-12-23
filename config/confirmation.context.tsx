import { type PropsWithChildren, createContext, use, useCallback, useMemo, useState } from "react";

import { ActionModal, type ActionModalProps } from "@/components/modals/ActionModal";

export namespace Confirmation {
  export type ContextState = Pick<
    ActionModalProps,
    "heading" | "description" | "buttonSize" | "textAlign" | "primaryAction" | "secondaryAction" | "showCloseButton"
  > & {
    isOpen: boolean;
  };

  export type ConfirmationInput = Pick<
    ContextState,
    "heading" | "description" | "buttonSize" | "textAlign" | "showCloseButton"
  > & {
    cancelLabel?: NonNullable<ContextState["secondaryAction"]>["label"];
    confirmLabel?: NonNullable<ContextState["primaryAction"]>["label"];
    cancelVariant?: NonNullable<ContextState["secondaryAction"]>["variant"];
    confirmVariant?: NonNullable<ContextState["primaryAction"]>["variant"];
  };

  export interface Options {
    confirm: (input: ConfirmationInput) => Promise<boolean>;
  }

  const DEFAULT_STATE: ContextState = {
    heading: "",
    description: "",
    isOpen: false,
    primaryAction: {
      label: "",
      onPress: () => {},
    },
    secondaryAction: {
      label: "",
      onPress: () => {},
    },
  };

  const Context = createContext<Options | null>(null);

  export const Provider = ({ children }: PropsWithChildren) => {
    const [state, setState] = useState<ContextState>(DEFAULT_STATE);

    const onCancel = () => setState(DEFAULT_STATE);

    const confirm = useCallback(
      async ({
        heading,
        description,
        buttonSize,
        textAlign,
        showCloseButton = false,
        cancelLabel = "Cancel",
        confirmLabel = "Confirm",
        confirmVariant,
        cancelVariant,
      }: ConfirmationInput) => {
        return new Promise<boolean>((resolve) => {
          setState({
            heading,
            description,
            buttonSize,
            textAlign,
            showCloseButton,
            primaryAction: {
              label: confirmLabel,
              onPress() {
                setState({
                  ...state,
                  isOpen: false,
                  heading: "",
                  description: "",
                });
                resolve(true);
              },
              variant: confirmVariant,
            },
            secondaryAction: {
              label: cancelLabel,
              onPress() {
                onCancel();
                resolve(false);
              },
              variant: cancelVariant,
            },
            isOpen: !state.isOpen,
          });
        });
      },
      [state],
    );

    const value = useMemo<Options>(
      () => ({
        confirm,
      }),
      [confirm],
    );

    return (
      <Context.Provider value={value}>
        <ActionModal
          {...state}
          onClose={state.secondaryAction?.onPress ?? onCancel}
          primaryAction={state.primaryAction}
          secondaryAction={state.secondaryAction}
        />

        {children}
      </Context.Provider>
    );
  };

  export const useConfirmation = () => {
    const context = use(Context);
    if (!context) {
      throw new Error("Confirmation.useConfirmation must be used within a Confirmation.Provider");
    }
    return context;
  };
}

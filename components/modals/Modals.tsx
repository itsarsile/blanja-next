import { Button, Group, Modal, Stack, TextInput, Title, rem } from "@mantine/core";
import type { ContextModalProps, MantineModalsOverride } from "@mantine/modals";

export function newAddressModals({
  context,
  id,
  innerProps
}: ContextModalProps<{ modalBody: React.FC }>) {
  return (
    <>
      {innerProps.modalBody}
    </>
  );
}

export const modals = {
  newAddressModals,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

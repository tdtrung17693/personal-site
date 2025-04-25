import type { VNode } from "vue";

export interface Dialog {
  title: string;
  content: VNode;
}

export interface DialogContext {
  openDialog: (dialog: Dialog) => () => void;
  closeDialog: (id?: number) => void;
  closeAllDialogs: () => void;
  hasDialogOpen: () => boolean;
}

export interface DialogAction {
  label: string;
  onClick: () => void;
}

export const DIALOG_CONTEXT_KEY = "dialog";

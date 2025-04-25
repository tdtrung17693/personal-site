import { inject } from "vue";
import {
  DIALOG_CONTEXT_KEY,
  type Dialog,
  type DialogContext,
} from "./dialog.type";

export const useDialog = () => {
  const dialogContext = inject<DialogContext>(DIALOG_CONTEXT_KEY, {
    openDialog: (_dialog: Dialog) => {
      console.error("Dialog context not found");
      return () => {};
    },
    closeDialog: () => {
      console.error("Dialog context not found");
    },
    closeAllDialogs: () => {
      console.error("Dialog context not found");
    },
    hasDialogOpen: () => {
      console.error("Dialog context not found");
      return false;
    },
  });

  return dialogContext;
};

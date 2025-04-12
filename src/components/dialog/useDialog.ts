import { inject } from "vue";
import { DIALOG_CONTEXT_KEY, type DialogContext } from "./dialog.type";

export const useDialog = () => {
    const dialogContext = inject<DialogContext>(DIALOG_CONTEXT_KEY, {
        openDialog: () => {
            console.error('Dialog context not found');
        }
    }   );

    return dialogContext;
}

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Dialog } from "./dialog.type";

export const useDialogStore = defineStore("dialog", () => {
  const dialogs = ref<Dialog[]>([]);

  return {
    dialogs,
  };
});

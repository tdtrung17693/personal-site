<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { DIALOG_CONTEXT_KEY, type Dialog as DialogType } from './dialog.type';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import { VisuallyHidden } from 'reka-ui';

const dialogStack = ref<{ dialog: DialogType, id: number, open: boolean }[]>([]);

const closeDialog = (id?: number) => {
    if (id) {
        const index = dialogStack.value.findIndex(item => item.id === id);
        dialogStack.value[index].open = false;
        setTimeout(() => {
            dialogStack.value = dialogStack.value.filter(item => item.id !== id);
        }, 200);
    } else {
        // close top dialog
        const index = dialogStack.value.length - 1;
        dialogStack.value[index].open = false;
        setTimeout(() => {
            dialogStack.value = dialogStack.value.filter(item => item.id !== dialogStack.value[index].id);
        }, 200);
    }

};

const openDialog = (dialog: DialogType) => {
    const id = dialogStack.value.length + 1;
    dialogStack.value.push({
        id,
        dialog,
        open: true,
    });

    return () => {
        closeDialog(id);
    };
};

const closeAllDialogs = () => {
    dialogStack.value.forEach(item => {
        item.open = false;
    });
    setTimeout(() => {
        dialogStack.value = [];
    }, 200);
};

provide(DIALOG_CONTEXT_KEY, {
    openDialog,
    closeDialog,
    closeAllDialogs,
    hasDialogOpen: () => {
        return dialogStack.value.some(item => item.open);
    },
});

onMounted(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        console.log("ABC", dialogStack.value)
        if (e.key === "Escape" && dialogStack.value.length > 0) {
            // Force close the dialog immediately
            const topDialog = dialogStack.value[dialogStack.value.length - 1];
            topDialog.open = false;
            setTimeout(() => {
                dialogStack.value = dialogStack.value.filter(item => item.id !== topDialog.id);
            }, 200);

            // Prevent any other handlers from processing the event
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }

    // Add the event listener with the highest priority
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
})

</script>

<template>
    <slot />
    <Dialog v-for="item in dialogStack" :key="item.id" class="dialog-item" v-model:open="item.open" :modal="true"
        v-on:update:open="closeDialog(item.id)">
        <DialogContent class="bg-transparent border-none shadow-none">
            <VisuallyHidden>
                <DialogTitle data-testid="dialog-title">{{ item.dialog.title }}</DialogTitle>
            </VisuallyHidden>
            <component :is="item.dialog.content" data-testid="dialog-content"
                @close-dialog="() => closeDialog(item.id)" />
        </DialogContent>
    </Dialog>
</template>

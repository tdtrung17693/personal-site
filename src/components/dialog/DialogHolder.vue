<script setup lang="ts">
import { provide, ref } from 'vue';
import { DIALOG_CONTEXT_KEY, type Dialog as DialogType } from './dialog.type';
import DialogOverlay from '@/components/ui/dialog/DialogOverlay.vue';
import { X } from 'lucide-vue-next';
import DialogClose from '@/components/ui/dialog/DialogClose.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';
import DialogHeader from '@/components/ui/dialog/DialogHeader.vue';
import DialogTitle from '@/components/ui/dialog/DialogTitle.vue';
import DialogDescription from '@/components/ui/dialog/DialogDescription.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';

const dialogStack = ref<{ dialog: DialogType, id: number }[]>([]);

const closeDialog = (id: number) => {
    dialogStack.value = dialogStack.value.filter(item => item.id !== id);
};

const openDialog = (dialog: DialogType) => {
    const id = dialogStack.value.length + 1;
    dialogStack.value.push({
        id,
        dialog,
    });

    console.log(dialogStack.value);
    return () => {
        closeDialog(id);
    };
};

provide(DIALOG_CONTEXT_KEY, {
    openDialog,
});

</script>

<template>
    <slot />
    <div class="dialog-holder">
        <Dialog v-for="item in dialogStack" :key="item.id" class="dialog-item" :default-open="true" :modal="true">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{{ item.dialog.title }}</DialogTitle>
                </DialogHeader>
                <component :is="item.dialog.content" />
            </DialogContent>
        </Dialog>
    </div>
</template>

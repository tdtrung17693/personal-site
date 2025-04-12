<template>
    <button @click="showSearchDialog()"
        class="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[hsl(var(--muted)/0.2)] bg-[hsl(var(--surface))] text-[hsl(var(--text))] transition-all duration-200 hover:bg-[hsl(var(--surface)/0.8)]"
        aria-label="Search">
        <Search class="h-4 w-4" />
        <span class="hidden sm:inline">Search</span>
        <span
            class="hidden sm:flex ml-2 items-center gap-1 rounded bg-[hsl(var(--highlight-low))] px-1.5 py-0.5 text-xs">
            <span class="text-xs">⌘</span>K
        </span>
    </button>
</template>
<script setup lang="tsx">
import { h, inject } from 'vue';
import { Search } from 'lucide-vue-next';
import { useDialog } from '@/components/dialog/useDialog';
import { DIALOG_CONTEXT_KEY, type DialogContext } from '@/components/dialog/dialog.type';
import SearchDialog from './SearchDialog.vue';
const { openDialog } = useDialog();

const showSearchDialog = () => {
    openDialog({
        title: 'Search',
        content: h(SearchDialog),
    });
};
</script>

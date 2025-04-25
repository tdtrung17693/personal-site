<template>
    <button @click="toggleSearchDialog()"
        class="flex items-center gap-2 px-3 py-1.5 rounded border border-muted/30 bg-surface text-text transition-all duration-200 hover:bg-accent/10"
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
import { h, inject, onMounted, ref } from 'vue';
import { Search } from 'lucide-vue-next';
import { useDialog } from '@/components/dialog/useDialog';
import SearchDialog from './SearchDialog.vue';
const { openDialog, closeDialog, hasDialogOpen } = useDialog();

const toggleSearchDialog = () => {
    const isOpen = hasDialogOpen();
    
    if (isOpen) {
        closeDialog();
    } else {
        openDialog({
            title: 'Search',
            content: h(SearchDialog),
        });
    }
};
onMounted(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            toggleSearchDialog();
        }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
})
</script>

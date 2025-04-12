<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getConfig } from '../lib/utils';
import { Sun, Moon } from 'lucide-vue-next';

const defaultTheme = getConfig('theme.defaultTheme');
const currentTheme = ref(defaultTheme);

function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', currentTheme.value === 'dark');
}

onMounted(() => {
    // Check if user has a saved preference or use the config default
    const savedTheme = localStorage.getItem('theme') || defaultTheme;
    currentTheme.value = savedTheme;
    document.documentElement.classList.toggle('dark', currentTheme.value === 'dark');
});
</script>

<template>
    <button @click="toggleTheme" aria-label="Toggle theme"
        class="p-2 rounded-md hover:bg-accent hover:text-accent-foreground">
        <Sun v-if="currentTheme === 'dark'" class="h-5 w-5" />
        <Moon v-else class="h-5 w-5" />
    </button>
</template>

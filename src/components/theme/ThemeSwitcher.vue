<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore } from "./theme.store";

const theme = useThemeStore();

theme.$subscribe((mutation) => {
    console.log(mutation);
});

</script>

<template>
    <button @click="theme.toggleTheme" aria-label="Toggle theme"
        class="px-2 py-1.5 flex items-center gap-1.5 border border-muted/30 text-text bg-surface transition-all duration-200 rounded cursor-pointer dark:hover:bg-accent/20 min-w-24 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            :class="[theme.currentTheme === 'dark' ? 'is-moon' : 'is-sun', 'theme-icon']">
            <circle cx="12" cy="12" r="5" class="sun-circle" />

            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" class="moon-crescent" />

            <line x1="12" y1="1" x2="12" y2="3" class="sun-ray ray-0" />
            <line x1="12" y1="21" x2="12" y2="23" class="sun-ray ray-4" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" class="sun-ray ray-1" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" class="sun-ray ray-5" />
            <line x1="1" y1="12" x2="3" y2="12" class="sun-ray ray-2" />
            <line x1="21" y1="12" x2="23" y2="12" class="sun-ray ray-6" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" class="sun-ray ray-3" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" class="sun-ray ray-7" />
        </svg>
        <span class="text-xs uppercase">{{ theme.currentTheme }}</span>
    </button>
</template>

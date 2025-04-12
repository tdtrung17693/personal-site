<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getConfig } from '@/lib/utils';
import { Sun, Moon } from 'lucide-vue-next';

const defaultTheme = getConfig('theme.defaultTheme');
const currentTheme = ref(defaultTheme);
console.log(currentTheme.value);

function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', currentTheme.value === 'dark');
    localStorage.setItem('theme', currentTheme.value);
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
        class="p-2 rounded-md cursor-pointer dark:hover:bg-accent/20">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            :class="[currentTheme === 'dark' ? 'is-moon' : 'is-sun', 'theme-icon']">
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
    </button>
</template>

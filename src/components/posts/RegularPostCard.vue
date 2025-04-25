<template>

    <h3 class="text-lg font-bold text-[hsl(var(--text))] group-hover:text-[hsl(var(--pine))]">{{ post.title }}</h3>
    <p class="text-sm text-[hsl(var(--subtle))]">{{ post.excerpt }}</p>
    <div class="mt-2 flex flex-wrap gap-2">
        <span v-for="tag in post.tags" :key="tag" class="text-xs text-[hsl(var(--muted))]">
            #{{ tag }}
        </span>
    </div>
    <div class="mt-2 flex flex-col gap-2">
        <span class="flex items-center gap-1 text-xs text-[hsl(var(--subtle))]">
            <Clock class="h-3 w-3" />
            {{ post.readingTime }}
        </span>
        <span class="text-xs text-[hsl(var(--subtle))] group-hover:text-[hsl(var(--pine))] mt-2">
            read_post<span class="text-[hsl(var(--pine))] group-hover:animate-pulse">_</span>
        </span>
    </div>
</template>

<script setup lang="ts">
import { Clock } from 'lucide-vue-next';
import type { RegularPost } from '@/types/common';

defineProps<{
    post: RegularPost
}>()
</script>

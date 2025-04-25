<template>
    <h3 class="text-lg font-bold text-[hsl(var(--text))] group-hover:text-foam">{{ post.title
        }}</h3>
    <p class="text-sm text-[hsl(var(--subtle))]">{{ post.excerpt }}</p>
    <div class="mt-2 flex flex-wrap gap-2">
        <span class="text-xs text-[hsl(var(--muted))]" v-for="tag in post.tags" :key="tag">
            #{{ tag }}
        </span>
    </div>
    <div class="mt-2 flex items-center text-xs text-subtle">
        <span class="group-hover:text-foam">
            read_post<span class="text-foam group-hover:animate-pulse">_</span>
        </span>
    </div>
</template>

<script setup lang="ts">
import type { NotionPost } from '@/types/common';

defineProps<{
    post: NotionPost
}>()
</script>

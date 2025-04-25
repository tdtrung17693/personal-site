<template>
    <Card :href="`/blog/${post.slug}`" :as-link="true" class="group p-4 transition-all">
        <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between">
                <time :date-time="post.date" class="text-xs text-muted/80">
                    {{ dayjs(post.date).format('MMM D, YYYY') }}
                </time>
                <div class=" flex items-center gap-2" v-if="post.source !== 'markdown'">
                    <div class="font-bold text-xs text-[hsl(var(--foam))]">{{ post.source }}</div>
                </div>
            </div>
            <slot></slot>
        </div>
    </Card>
</template>

<script setup lang="ts">
import type { Post } from '@/types/common';
import Card from '../Card.vue';
import dayjs from 'dayjs';
defineProps<{
    post: Post
}>()
</script>

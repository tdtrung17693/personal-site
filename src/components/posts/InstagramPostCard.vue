<template>
    <Card
        :href="`/blog/${post.slug}`"
        :as-link="true"
        class="group  p-4 transition-all hover:bg-[hsl(var(--surface)/0.7)]"
    >
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <time dateTime={post.date} class="text-xs text-[hsl(var(--muted))]">
            {{ post.date }}
          </time>
          <div class="font-bold text-xs text-[hsl(var(--rose))]">instagram</div>
        </div>
        <h3 class="text-lg font-bold text-[hsl(var(--text))] group-hover:text-[hsl(var(--rose))]">{{ post.title }}</h3>

          <div class="relative mt-2 aspect-square w-full max-w-[240px] overflow-hidden border border-[hsl(var(--muted)/0.2)]" v-if="post.imageUrl">
            <img :src="post.imageUrl" :alt="post.title" />
          </div>

        <div class="mt-2 flex items-center gap-4 text-xs text-subtle">
          <div class="flex items-center gap-1">
            <Heart class="h-3 w-3" />
            <span>{{ post.likes }}</span>
          </div>
          <div class="flex items-center gap-1">
            <MessageCircle class="h-3 w-3" />
            <span>{{ post.comments }}</span>
          </div>
        </div>
        <div class="mt-2 flex items-center text-xs text-subtle">
          <span class="group-hover:text-rose">
            view_post<span class="text-rose group-hover:animate-pulse">_</span>
          </span>
        </div>
      </div>
    </Card>
</template>
<script setup lang="ts">
import type { InstagramPost } from '@/types/common';
import { Heart, MessageCircle } from 'lucide-vue-next';
import Card from '../Card.vue';
defineProps<{
    post: InstagramPost
}>()
</script>

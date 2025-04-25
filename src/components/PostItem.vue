<template>
  <Card :as-link="true" :href="`/blog/${post.slug}`"
    class="group block border border-muted/20 bg-surface/60 p-4 transition-all hover:border-muted/50 hover:bg-surface/80">
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <time :datetime="post.date" class="text-xs text-slate-500">
          {{ post.date }}
        </time>
        <div class="font-bold text-xs text-amber-500">{{ post.tag }}</div>
      </div>
      <h3 class="text-lg font-bold text-text group-hover:text-primary">{{ post.title }}</h3>
      <div class="mt-2 flex items-center text-xs text-muted">
        <span class="group-hover:text-primary/80">
          read_post<span class="text-primary group-hover:animate-pulse">_</span>
        </span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from './Card.vue';
defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>

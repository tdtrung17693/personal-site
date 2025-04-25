<template>
  <p class="text-sm text-text">{{ tweetData?.text }}</p>

  <div class="mt-2 overflow-hidden rounded-md border border-muted/20" v-if="tweetData?.media">
    <img :src="tweetData?.media.url || '/placeholder.svg'" alt="Tweet image" class="w-full object-cover" />
  </div>

  <a :href="`https://x.com/${tweetData?.quotedTweet?.userHandle}/status/${tweetData?.quotedTweet?.id}`" target="_blank"
    class="mt-2 rounded-md border border-muted/20 p-3 bg-surface/30" v-if="tweetData?.quotedTweet">
    <div class="flex items-center gap-2 mb-1">
      <span class="font-medium text-sm text-text">{{ tweetData?.quotedTweet.user }}</span>
      <span class="text-xs text-subtle">@{{ tweetData?.quotedTweet.userHandle }}</span>
      <span class="text-xs text-subtle">· {{ tweetData?.quotedTweet.createdAt }}</span>
    </div>
    <p class="text-xs text-subtle">{{ tweetData?.quotedTweet.text }}</p>
  </a>

  <div class="mt-2 flex items-center gap-4 text-xs text-subtle">
    <div class="flex items-center gap-1">
      <Heart class="h-3 w-3" />
      <span>{{ tweetData?.likes }}</span>
    </div>
    <!-- <div class="flex items-center gap-1">
          <RefreshCw class="h-3 w-3" />
          <span>{{ tweetData?.retweets }}</span>
        </div> -->
    <div class="flex items-center gap-1">
      <MessageCircle class="h-3 w-3" />
      <span>{{ tweetData?.replies }}</span>
    </div>
  </div>

  <div class="mt-2 flex items-center text-xs text-subtle">
    <a :href="`https://x.com/${tweetData?.userHandle}/status/${tweetData?.id}`" class="group-hover:text-foam"
      target="_blank">
      view_tweet<span class="text-foam group-hover:animate-pulse">_</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { XPost } from '@/types/common';
import Card from '../Card.vue';
import { Heart, RefreshCw, MessageCircle } from 'lucide-vue-next';
import { useThemeStore } from '../theme/theme.store';
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
const props = defineProps<{
  post: XPost
}>()
const theme = useThemeStore();

interface TweetData {
  id: string;
  user: string;
  likes: number;
  retweets: number;
  replies: number;
  userHandle: string;
  text: string;
  createdAt: string;
  media: {
    url: string;
    type: string;
    videoUrl: string;
  } | null;
  quotedTweet: {
    user: string;
    userHandle: string;
    text: string;
    createdAt: string;
    id: string;
    media: {
      url: string;
      type: string;
      videoUrl: string;
    } | null;
  } | null;
}
const tweetData = ref<TweetData | null>(null);

onMounted(async () => {
  const response = await fetch(`/api/tweet?tweetId=${props.post.sourceId}`);
  tweetData.value = await response.json();
  console.log("tweetData", tweetData.value);
});

</script>

<style>
/* Custom styles for the embedded tweet */
:deep(.twitter-tweet) {
  margin: 0 !important;
  max-width: 100% !important;
}

:deep(.twitter-tweet-rendered) {
  border: 1px solid hsl(var(--muted) / 0.2) !important;
  border-radius: 0.5rem !important;
  background-color: hsl(var(--surface) / 0.5) !important;
}

:deep(.twitter-tweet-rendered:hover) {
  border-color: hsl(var(--muted) / 0.4) !important;
  background-color: hsl(var(--surface) / 0.7) !important;
}
</style>

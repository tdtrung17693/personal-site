<template>
    <div class="grid gap-4" v-if="loading && posts.length === 0">
        <Card v-for="i in 3" :key="i" class="p-4 bg-surface/50">
            <div class="h-6 w-24 animate-pulse bg-muted/20"></div>
            <div class="mt-2 h-4 w-full animate-pulse bg-muted/20"></div>
            <div class="mt-1 h-4 w-3/4 animate-pulse bg-muted/20"></div>
        </Card>
    </div>
    <div class="border border-muted/20 bg-surface/50 p-4 text-center text-subtle"
        v-else-if="!loading && posts.length === 0">
        <p>No posts found from this source.</p>
    </div>
    <div class="grid gap-4" v-else>
        <PostCard v-for="post in posts" :key="post.id" :post="post">
            <component :is="getPostCardComponent(post)" :key="post.id" :post="post" />
        </PostCard>

        <div ref="loaderRef" class="mt-4">
            <div class="flex justify-center p-4 text-subtle" v-if="loading">
                <div class="flex items-center gap-2">
                    <div class="h-2 w-2 animate-pulse rounded-full bg-foam"></div>
                    <div class="h-2 w-2 animate-pulse rounded-full bg-foam animation-delay-200"></div>
                    <div class="h-2 w-2 animate-pulse rounded-full bg-foam animation-delay-400"></div>
                    <span class="ml-2 text-xs">loading more posts...</span>
                </div>
            </div>

            <div class="border-t border-muted/20 p-4 text-center text-xs text-muted"
                v-if="posts.length > 0 && !hasMore">
                <p>-- end of feed --</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTemplateRef, type Component, watchEffect, inject, type Ref } from 'vue';
import type { Post } from '@/types/common';
import { usePosts } from '@/composables/usePosts';
import NotionPostCard from './NotionPostCard.vue';
import XPostCard from './XPostCard.vue';
import InstagramPostCard from './InstagramPostCard.vue';
import RegularPostCard from './RegularPostCard.vue';
import PostCard from './PostCard.vue';
import Card from '../Card.vue';


const props = defineProps<{
    filter: "all" | "notion" | "x" | "instagram" | "markdown";
}>()

const loaderRef = useTemplateRef<HTMLDivElement>('loaderRef')
const { posts, loading, hasMore, loadMore } = usePosts({
    source: props.filter,
    perPage: 3
})

// Set up intersection observer for infinite scroll
watchEffect((onCleanup) => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && hasMore.value && !loading.value) {
                loadMore()
            }
        },
        { threshold: 0.1 },
    )

    if (loaderRef.value) {
        observer.observe(loaderRef.value)
    }

    onCleanup(() => observer.disconnect())
})

const getPostCardComponent = (post: Post) => {
    switch (post.source) {
        case "notion":
            return NotionPostCard as Component
        case "x":
            return XPostCard as Component
        case "instagram":
            return InstagramPostCard as Component
        case "markdown":
            return RegularPostCard as Component
        default:
            return null
    }
}
</script>

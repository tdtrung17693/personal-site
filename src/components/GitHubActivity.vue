<template>
    <div class="border border-muted/20 rounded bg-block-background p-4">
        <div class="mb-4 flex items-center justify-between">
            <h3 class="text-sm font-bold text-text">GitHub Activity</h3>
            <div class="flex h-2 w-2 items-center justify-center rounded-full bg-foam"></div>
        </div>

        <div class="space-y-2" v-if="loading">
            <div v-for="i in 3" :key="i" class="h-6 w-full animate-pulse bg-highlight-low"></div>
        </div>

        <div class="" v-else-if="!loading && error">
            <p class="text-text">Error loading GitHub activity</p>
        </div>

        <div class="space-y-3" v-else-if="!loading && activity.length === 0">
            <p class="text-text">No GitHub activity found</p>
        </div>

        <div class="space-y-3" v-else>
            <div class="flex items-start gap-2 text-xs" v-for="event in activity">
                <component class="mt-0.5 shrink-0" :is="getActionIcon(event.action)"></component>
                <div>
                    <div class="text-text">
                        <a class="text-foam hover:underline" :href="getEventUrl(event)" target="_blank"
                            rel="noopener noreferrer">{{ event.repo }}</a>: {{ event.message }}
                    </div>
                    <div class="text-muted">{{ event.date }}</div>
                </div>
            </div>
        </div>

        <div class="mt-4 text-xs text-subtle hover:text-foam">
            <a :href="`https://github.com/${getConfig('github.username')}`" target="_blank" rel="noopener noreferrer">
                view_all_activity<span class="text-foam">_</span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import { GitBranch, GitCommit, GitPullRequest, GitFork, Star, Plus, Tag } from 'lucide-vue-next';
import { getGithubActivity } from "@/lib/activity"
import type { GithubEvent } from '@/types/common';
import { getConfig } from '@/lib/config/client.config';
import { useGitHubActivity } from '@/composables/useGitHubActivity';

const { activity, loading, error } = useGitHubActivity();

const getActionIcon = (action: string) => {
    switch (action) {
        case "push":
            return h(GitBranch, { class: "h-3 w-3 text-foam" })
        case "commit":
            return h(GitCommit, { class: "h-3 w-3 text-gold" })
        case "pull_request":
            return h(GitPullRequest, { class: "h-3 w-3 text-iris" })
        case "fork":
            return h(GitFork, { class: "h-3 w-3 text-iris" })
        case "create":
            return h(Plus, { class: "h-3 w-3 text-iris" })
        case "watch":
            return h(Star, { class: "h-3 w-3 text-iris" })
        case "release":
            return h(Tag, { class: "h-3 w-3 text-iris" })
        default:
            return h(GitCommit, { class: "h-3 w-3 text-subtle" })
    }
}

function getEventUrl(event: GithubEvent) {
    return `https://github.com/${event.repo}`
}
</script>

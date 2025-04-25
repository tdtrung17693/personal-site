<template>
    <div class="overflow-hidden rounded border border-muted/20 bg-surface shadow-xl lg:min-w-[600px] min-h-[400px]">
        <div class="flex items-center border-b border-muted/20 px-3 py-2">
            <Search class="mr-2 h-4 w-4 text-subtle" />
            <input type="text" v-model="query" placeholder="grep -i 'search term'"
                class="flex-1 bg-transparent text-sm text-text placeholder:text-muted focus:outline-none" />
            <button v-if="query" @click="query = ''" class="mr-1 rounded p-1 text-subtle hover:text-foam"
                aria-label="Clear search">
                <X class="h-4 w-4" />
            </button>
            <button class="ml-2 rounded bg-surface px-1.5 py-0.5 text-xs text-subtle hover:text-foam"
                @click="$emit('closeDialog')">
                ESC
            </button>
        </div>

        <div class="max-h-[60vh] overflow-y-auto p-2">
            <div class="flex flex-col gap-2 p-2" v-if="loading">
                <div :key="i" class="flex animate-pulse gap-2 rounded p-2" v-for="i in 3">
                    <div class="h-4 w-4 rounded bg-muted/20"></div>
                    <div class="flex-1 space-y-2">
                        <div class="h-4 w-1/3 rounded bg-muted/20"></div>
                        <div class="h-3 w-full rounded bg-muted/20"></div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-1" v-if="!loading && results.length > 0">
                <button v-for="(result, index) in results" :key="result.id"
                    class="flex w-full gap-2 rounded p-2 text-left"
                    :class="selectedIndex === index ? 'bg-surface text-foam' : 'text-text hover:bg-surface/50'">
                    <div class="mt-0.5">
                        <component :is="getIconForType(result.type)" class="h-4 w-4 text-gold" />
                    </div>

                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <h3 class="font-medium">{{ result.title }}</h3>
                            <div class="text-xs text-muted">{{ result.type }}</div>
                        </div>
                        <p class="line-clamp-1 text-xs text-subtle">{{ result.excerpt }}</p>
                        <div class="mt-1 flex flex-wrap gap-1" v-if="result.tags && result.tags.length > 0">
                            <span v-for="tag in result.tags" class="text-xs text-gold">
                                #{{ tag }}
                            </span>
                        </div>
                    </div>
                </button>
            </div>
            <div class="flex flex-col items-center justify-center py-12 text-center"
                v-if="query && !loading && results.length === 0">
                <div class="rounded-full bg-surface p-3">
                    <Search class="h-6 w-6 text-subtle" />
                </div>
                <h3 class="mt-4 text-lg font-medium text-text">No results found</h3>
                <p class="mt-2 text-sm text-subtle">No matches found for "{query}". Try a different search term.</p>
            </div>
            <div class="flex flex-col items-center justify-center py-12 text-center" v-else-if="!query && !loading">
                <div class="rounded-full bg-surface p-3">
                    <Search class="h-6 w-6 text-subtle" />
                </div>
                <h3 class="mt-4 text-lg font-medium text-text">Search for anything</h3>
                <p class="mt-2 text-sm text-subtle">Search notes, blog posts, and projects</p>
                <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div
                        class="border border-muted/20 bg-surface/50 rounded-xs p-2 transition-all duration-200 hover:bg-surface/80">
                        <div class="font-medium text-text">Search notes</div>
                        <div class="mt-1 text-xs text-subtle">Try "zettelkasten"</div>
                    </div>
                    <div
                        class="border border-muted/20 bg-surface/50 rounded-xs p-2 transition-all duration-200 hover:bg-surface/80">
                        <div class="font-medium text-text">Search by tag</div>
                        <div class="mt-1 text-xs text-subtle">Try "productivity"</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-t border-muted/20 p-2 text-xs text-subtle" v-if="results.length > 0">
            <div class="flex items-center justify-between">
                <div>
                    <span class="text-foam">{{ results.length }}</span> results found
                </div>
                <div class="flex items-center gap-2">
                    <span>Navigate</span>
                    <span class="flex items-center gap-1">
                        <kbd class="rounded bg-surface px-1.5 py-0.5">↑</kbd>
                        <kbd class="rounded bg-surface px-1.5 py-0.5">↓</kbd>
                    </span>
                    <span>Select</span>
                    <kbd class="rounded bg-surface px-1.5 py-0.5">Enter</kbd>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Search, X, FileText, BookOpen, Code } from 'lucide-vue-next';
import { h, onMounted, ref, watch } from 'vue';
import type { SearchResult } from './search.type';
const query = ref('');
const results = ref<SearchResult[]>([]);
const selectedIndex = ref(0);
const loading = ref(false);

const getIconForType = (type: string) => {
    switch (type) {
        case "note":
            return FileText
        case "blog":
            return BookOpen
        case "project":
            return Code
        default:
            return FileText
    }
}

watch(query, (value) => {
    loading.value = true
    setTimeout(() => {
        if (!value.trim()) {
            results.value = []
            loading.value = false
            return
        }

        // Mock results
        const mockResults: SearchResult[] = [
            {
                id: "1",
                title: "Zettelkasten Method",
                type: "note",
                excerpt: "The Zettelkasten method is a personal knowledge management system...",
                url: "/notes/zettelkasten-method",
                tags: ["productivity", "note-taking"],
            },
            {
                id: "2",
                title: "Building a Second Brain",
                type: "note",
                excerpt: "Building a Second Brain is a methodology for saving and systematically...",
                url: "/notes/building-a-second-brain",
                tags: ["productivity", "PARA"],
            },
            {
                id: "3",
                title: "Understanding Variables in Programming",
                type: "blog",
                excerpt: "A deep dive into how variables work across different programming languages.",
                url: "/blog/variables-in-programming",
            },
            {
                id: "4",
                title: "Personal Website Redesign",
                type: "project",
                excerpt: "A terminal-inspired redesign of my personal website with Next.js.",
                url: "/projects/personal-website",
            },
        ].filter(
            (result) =>
                result.title.toLowerCase().includes(value.toLowerCase()) ||
                result.excerpt.toLowerCase().includes(value.toLowerCase()) ||
                result.tags?.some((tag) => tag.toLowerCase().includes(value.toLowerCase())),
        ) as SearchResult[]

        console.log(mockResults)
        results.value = mockResults
        loading.value = false
    }, 300)
});


onMounted(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        console.log(e.key)
        if (e.key === "ArrowDown") {
            e.preventDefault()
            const currentIndex = selectedIndex.value;
            selectedIndex.value = currentIndex < results.value.length - 1 ? currentIndex + 1 : currentIndex;
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            const currentIndex = selectedIndex.value;
            selectedIndex.value = currentIndex > 0 ? currentIndex - 1 : currentIndex;
        } else if (e.key === "Enter" && results.value[selectedIndex.value]) {
            e.preventDefault()
            // openDetailDialog(results.value[selectedIndex.value])
        }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    }
})
const performSearch = (searchQuery: string) => {


    // Simulate API delay
}

</script>

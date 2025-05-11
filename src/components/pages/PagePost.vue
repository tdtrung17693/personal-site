<script setup lang="ts">
import mermaid from "mermaid"
import { ref, onMounted, computed, watch } from 'vue'
import { Heart, MessageCircle, RefreshCw, Clock } from 'lucide-vue-next'
import { marked, type Tokens } from 'marked'
import type { Post } from '@/types/common'
import { getConfig } from "@/lib/config/client.config"

// --- Helper Functions ---

// Simple HTML escape function to handle missing marked.escape
function escapeHtml(unsafe: string): string {
    if (!unsafe) return ''; // Handle null/undefined/empty string
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    // Marked also escapes single quotes, add if needed:
    // .replace(/'/g, "&#039;");
}

const props = defineProps<{
    slug: string
}>()

// Define reactive state
const post = ref<Post | null>(null)
const loading = ref(true)
// Stores { [mermaidCode]: { svg?: string; error?: string } }
const mermaidSvgs = ref<Record<string, { svg?: string; error?: string }>>({})
// Tracks if the watcher is currently processing/rendering mermaid diagrams
const isMermaidRendering = ref(false)

// Fetch post data when the component mounts
onMounted(() => {
    try {
        mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'dark' });
        console.log("Mermaid initialized");
    } catch (e) {
        console.error("Mermaid initialization failed:", e);
    }
})

onMounted(async () => {
    try {
        loading.value = true;
        const response = await fetch(`${getConfig("api.url")}/posts/${props.slug}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        post.value = data
    } catch (error) {
        console.error("Failed to fetch post:", error)
        post.value = null
    } finally {
        loading.value = false
    }
})

// Phase 1: Watch Post Content and Render Mermaid Diagrams
watch(() => post.value, async (currentPost) => {
    // Guard clauses for initial state or non-markdown posts
    if (!currentPost || currentPost.source !== 'markdown') {
        mermaidSvgs.value = {}; // Clear if no post or not markdown
        return;
    }

    // Type guard: Ensure 'content' exists for MarkdownPost type
    if (!('content' in currentPost) || !currentPost.content) {
        mermaidSvgs.value = {}; // Clear if no content
        console.log("Watcher: Markdown post detected, but no content found.");
        return;
    }
    // Now safe to use content
    const newContent = currentPost.content;

    console.log("Watcher: Post content changed, processing for Mermaid...");
    isMermaidRendering.value = true;
    const newSvgs: Record<string, { svg?: string; error?: string }> = {};
    const diagramsToRender: { id: string, code: string }[] = [];

    try {
        const tokens = marked.lexer(newContent);
        marked.walkTokens(tokens, (token) => {
            if (token.type === 'code' && (token.lang === 'mermaid' || token.text.match(/^\s*(?:graph|sequenceDiagram|flowchart|pie|gantt|classDiagram|stateDiagram|journey|erDiagram|requirementDiagram|timeline)/i))) {
                const code = token.text.trim();
                if (code && !newSvgs[code]) {
                    const uniqueId = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                    diagramsToRender.push({ id: uniqueId, code });
                    newSvgs[code] = { svg: '...' };
                }
            }
        });

        mermaidSvgs.value = newSvgs;
        console.log(`Watcher: Found ${diagramsToRender.length} Mermaid diagrams to render.`);

        if (diagramsToRender.length > 0) {
            await Promise.allSettled(diagramsToRender.map(async ({ id, code }) => {
                try {
                    const { svg } = await mermaid.render(id, code);
                    if (mermaidSvgs.value[code]) {
                        mermaidSvgs.value[code] = { svg };
                        console.log(`Watcher: Successfully rendered Mermaid diagram (ID prefix: ${id.split('-')[1]})`);
                    }
                } catch (error: any) {
                    console.error(`Watcher: Failed to render Mermaid diagram (ID prefix: ${id.split('-')[1]}):`, error);
                    if (mermaidSvgs.value[code]) {
                        mermaidSvgs.value[code] = { error: String(error.message || error) };
                    }
                }
            }));
        }
    } catch (error) {
        console.error("Watcher: Error processing markdown for Mermaid:", error);
    } finally {
        console.log("Watcher: Finished processing Mermaid diagrams.");
        isMermaidRendering.value = false;
    }
}, {
    immediate: true, // Run immediately
    deep: true // Watch nested properties like post.content
});

// Phase 2: Compute Rendered Markdown with Custom Renderer

// Create a new renderer instance for this component
const renderer = new marked.Renderer();

// Override the 'code' renderer function using the correct signature
renderer.code = (token: Tokens.Code): string => {
    const code = token.text;
    const lang = (token.lang || '').toLowerCase().trim();
    const escaped = token.escaped;
    const trimmedCode = code.trim();

    const isMermaid = lang === 'mermaid' || trimmedCode.match(/^\s*(?:graph|sequenceDiagram|flowchart|pie|gantt|classDiagram|stateDiagram|journey|erDiagram|requirementDiagram|timeline)/i);

    if (isMermaid) {
        const diagramData = mermaidSvgs.value[trimmedCode];

        if (diagramData?.svg && diagramData.svg !== '...') {
            return `<div class="mermaid-container not-prose">${diagramData.svg}</div>`;
        } else if (diagramData?.error) {
            // Use local escapeHtml function
            return `<pre class="mermaid-error not-prose text-xs bg-rose/20 p-2 rounded">⚠️ Mermaid Error: ${escapeHtml(diagramData.error)}\n\n${escapeHtml(trimmedCode)}</pre>`;
        } else if (isMermaidRendering.value || diagramData?.svg === '...') {
            return `<pre class="mermaid-loading not-prose text-xs bg-surface/50 p-2 rounded animate-pulse">⏳ Rendering diagram...</pre>`;
        } else {
            // Use local escapeHtml function
            return `<pre class="mermaid-fallback not-prose text-xs bg-surface/50 p-2 rounded">❓ Diagram not rendered. Check console.\n\n${escapeHtml(trimmedCode)}</pre>`;
        }
    }

    // Default rendering for non-Mermaid code blocks
    // Use local escapeHtml function
    const cleanCode = escaped ? code : escapeHtml(code);
    const classAttribute = lang ? ` class="language-${escapeHtml(lang)}"` : '';
    return `<pre class="not-prose"><code${classAttribute}>${cleanCode}\n</code></pre>`;
};

// Configure marked to use our custom renderer for this component's rendering pass
// Note: If marked is used elsewhere without this specific config, it won't use this renderer
const markedOptions = { renderer };

// The computed property now synchronously renders markdown using the custom renderer
const renderedMarkdown = computed(() => {
    // Check source and content existence before rendering
    if (post.value?.source === 'markdown' && 'content' in post.value && post.value.content) {
        try {
            return marked(post.value.content, markedOptions);
        } catch (error) {
            console.error("Error rendering markdown in computed property:", error);
            return '<p class="text-rose">Error rendering content.</p>';
        }
    }
    return '';
});

// Function to get source-specific class
const getSourceClass = (source: string | undefined) => {
    if (!source) return 'text-rose'
    switch (source) {
        case 'notion':
            return 'text-foam'
        case 'twitter':
            return 'text-iris'
        case 'instagram':
            return 'text-rose'
        default:
            return 'text-muted'
    }
}
</script>

<template>
    <div class="min-h-screen bg-base font-mono text-text selection:bg-foam selection:text-base">
        <!-- Loading State -->
        <main v-if="loading" class="container mx-auto px-4 py-12 md:px-6">
            <div class="mx-auto max-w-3xl">
                <div class="h-6 w-24 animate-pulse rounded bg-highlight-low"></div>
                <div class="mt-4 h-8 w-3/4 animate-pulse rounded bg-highlight-low"></div>
                <div class="mt-8 space-y-4">
                    <div class="h-4 w-full animate-pulse rounded bg-highlight-low"></div>
                    <div class="h-4 w-full animate-pulse rounded bg-highlight-low"></div>
                    <div class="h-4 w-2/3 animate-pulse rounded bg-highlight-low"></div>
                </div>
            </div>
        </main>

        <!-- Post Not Found State -->
        <main v-else-if="!post" class="container mx-auto px-4 py-12 md:px-6">
            <div class="mx-auto max-w-3xl">
                <a href="/" class="mb-8 inline-flex items-center gap-2 text-sm text-subtle hover:text-foam">
                    <span>←</span> cd ..
                </a>
                <div class="rounded border border-highlight-low bg-surface/50 p-6 text-center">
                    <h1 class="mb-4 text-xl font-bold text-text">404: Post Not Found</h1>
                    <p class="text-subtle">The post you're looking for doesn't exist or has been moved.</p>
                </div>
            </div>
        </main>

        <!-- Post Found State -->
        <main v-else class="container mx-auto px-4 py-12 md:px-6">
            <article class="mx-auto max-w-3xl">
                <a href="/" class="mb-8 inline-flex items-center gap-2 text-sm text-subtle hover:text-foam">
                    <span>←</span> cd ..
                </a>

                <div class="mb-8 flex items-center justify-between">
                    <time :datetime="post.date" class="text-xs text-muted">
                        {{ post.date }}
                    </time>
                    <!-- Only show source type for non-markdown posts -->
                    <div v-if="post.source !== 'markdown'" :class="['font-bold text-xs', getSourceClass(post.source)]">
                        {{ post.source }}
                    </div>
                </div>

                <h1 class="mb-6 text-2xl font-bold text-text sm:text-3xl">{{ post.title }}</h1>
                <div v-if="post.source == 'markdown' && post.tags && post.tags.length"
                    class="mt-4 flex flex-wrap gap-2 not-prose">
                    <span v-for="tag in post.tags" :key="tag" class="rounded bg-pine/20 px-2 py-0.5 text-xs text-pine">
                        #{{ tag }}
                    </span>
                </div>


                <!-- Content Area -->
                <div class="prose  max-w-none pt-6 text-text">
                    <!-- Markdown Content -->
                    <div v-if="post.source === 'markdown' && 'content' in post">
                        <!-- v-html now uses the computed renderedMarkdown which includes mermaid SVGs -->
                        <div class="prose max-w-none" v-if="renderedMarkdown" v-html="renderedMarkdown">
                        </div>
                        <div v-else-if="!isMermaidRendering" class="text-muted">
                            <!-- Show only if not loading mermaid specifically -->
                            Processing content...
                        </div>
                    </div>

                </div>
            </article>
        </main>

    </div>
</template>



<style scoped>
/* Add any component-specific styles here */
/* For example, overriding prose styles if needed */
.prose :where(code):not(:where([class~="not-prose"] *))::before,
.prose :where(code):not(:where([class~="not-prose"] *))::after {
    content: "";
    /* Disable backticks around inline code if desired */
}

/* Ensure images within the content area are responsive */
.prose img {
    max-width: 100%;
    height: auto;
    border-radius: 0.25rem;
    /* Optional: match other styling */
}

/* Add styles for mermaid containers if needed */
.mermaid-container>svg {
    /* Ensure SVG scales correctly */
    max-width: 100%;
    height: auto;
    display: block;
    /* Prevent extra space below */
    margin: 1em auto;
    /* Center and add margin */
}

/* Ensure pre/code blocks for regular code respect prose width */
/* This might need adjustment based on your specific prose plugin/styles */
.prose pre.not-prose {
    max-width: 100%;
    /* Override prose max-width if needed */
}

/* Ensure code inside pre retains whitespace formatting */
.prose pre code {
    white-space: pre;
}

/* Style mermaid error/loading states */
.mermaid-error,
.mermaid-loading,
.mermaid-fallback {
    white-space: pre-wrap;
    /* Allow wrapping for long errors/code */
    word-break: break-all;
}
</style>

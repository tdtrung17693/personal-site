<template>
  <main class="container mx-auto px-4 py-12 md:px-6">
    <section class="mb-16 max-w-3xl">
      <div class="mb-8 inline-block rounded border border-muted/20 bg-block-background px-4 py-2">
        <h1 class="text-3xl font-bold md:text-4xl">
          <span class="block">Hi,</span>
          <span class="block mt-1 text-rose">I'm Trung!</span>
        </h1>
      </div>

      <div class="mb-8 font-mono">
        <p class="mb-4 leading-relaxed">
          This is a place where I keep all of my notes on tech and other random stuff.
          <br />
          Hope you have fun reading my writing.
        </p>
        <div class="mt-2 flex items-center justify-between">
          <div class="text-xs">
            <span class="text-[hsl(var(--foam))]">❯</span> Last update:
            {{ currentDate ? new Date().toLocaleDateString() : "Loading..." }}
          </div>
          <div class="flex items-center gap-4">
            <a :href="`https://github.com/${getConfig('site.githubUsername')}`" target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-xs text-[hsl(var(--subtle))] hover:text-[hsl(var(--foam))]"
              aria-label="GitHub Profile" title="GitHub">
              <GitHubIcon class="h-4 w-4" />
              <span class="sr-only">GitHub</span>
            </a>
            <a :href="`https://twitter.com/${getConfig('site.twitterUsername')}`" target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-xs text-[hsl(var(--subtle))] hover:text-[hsl(var(--foam))]"
              aria-label="Twitter Profile" title="Twitter">
              <XIcon class="h-4 w-4" />
              <span class="sr-only">X</span>
            </a>
          </div>
        </div>
      </div>

      <Terminal command="cat README.md"
        output="Welcome to my digital garden. Feel free to explore my notes, blog posts, and other content." />
    </section>

    <section class="max-w-3xl">
      <div class="mb-6 flex items-center">
        <div class="h-px flex-1 bg-highlight-med"></div>
        <span class="mx-4 text-sm text-muted-foreground">CONTENT FEED</span>
        <div class="h-px flex-1 bg-highlight-med"></div>
      </div>
      <Tabs defaultValue="all" class="w-full">
        <TabsList class="mb-6 grid w-full grid-cols-5 bg-[hsl(var(--surface)/0.5)] p-1">
          <TabsTrigger value="all" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
            all
          </TabsTrigger>
          <TabsTrigger value="blog" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
            blog
          </TabsTrigger>
          <TabsTrigger value="notion" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
            notion
          </TabsTrigger>
          <TabsTrigger value="twitter" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
            twitter
          </TabsTrigger>
          <TabsTrigger value="instagram" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
            instagram
          </TabsTrigger>
        </TabsList>
        <!-- <TabsContent value="all">
          <PostFeed filter="all" />
        </TabsContent>
        <TabsContent value="blog">
          <PostFeed filter="markdown" />
        </TabsContent>
        <TabsContent value="notion">
          <PostFeed filter="notion" />
        </TabsContent>
        <TabsContent value="twitter">
          <PostFeed filter="twitter" />
        </TabsContent>
        <TabsContent value="instagram">
          <PostFeed filter="instagram" />
        </TabsContent> -->
      </Tabs>

      <div class="grid gap-4">
        <PostItem v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Terminal from '@/components/Terminal.vue';
import PostItem from '@/components/PostItem.vue';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GitHubIcon, XIcon } from 'vue3-simple-icons';
import { getConfig } from '@/lib/utils';
const currentDate = ref<string | undefined>(undefined);

onMounted(() => {
  currentDate.value = new Date().toLocaleDateString();
});

// Sample post data
const posts = [
  {
    id: "1",
    title: "Heuristic Search Methods",
    date: "Oct 21, 2022",
    tag: "til",
    slug: "heuristic-search-methods",
  },
  {
    id: "2",
    title: "Undefined",
    date: "Oct 21, 2022",
    tag: "til",
    slug: "undefined",
  },
  {
    id: "3",
    title: "Idioms",
    date: "Oct 21, 2022",
    tag: "til",
    slug: "idioms",
  },
  {
    id: "4",
    title: "Variables",
    date: "Oct 21, 2022",
    tag: "til",
    slug: "variables",
  },
  {
    id: "5",
    title: "A",
    date: "Oct 21, 2022",
    tag: "til",
    slug: "a",
  },
];
</script>

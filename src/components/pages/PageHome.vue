<template>
  <main class="container mx-auto px-4 py-12 md:px-6">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div class="lg:col-span-2">
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
                <a :href="`https://github.com/${getConfig('github.username')}`" target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-1.5 text-xs text-[hsl(var(--subtle))] hover:text-[hsl(var(--foam))]"
                  aria-label="GitHub Profile" title="GitHub">
                  <GitHubIcon class="h-4 w-4" />
                  <span class="sr-only">GitHub</span>
                </a>
                <a :href="`https://twitter.com/${getConfig('twitter.username')}`" target="_blank"
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
            <div class="h-px flex-1 bg-muted/20"></div>
            <span class="mx-4 text-sm text-muted-foreground">CONTENT FEED</span>
            <div class="h-px flex-1 bg-muted/20"></div>
          </div>
          <Tabs defaultValue="all" class="w-full">
            <TabsList class="mb-6 grid w-full grid-cols-4 bg-[hsl(var(--surface)/0.5)] p-1">
              <TabsTrigger value="all" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
                all
              </TabsTrigger>
              <TabsTrigger value="markdown" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
                blog
              </TabsTrigger>
              <TabsTrigger value="notion" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
                notion
              </TabsTrigger>
              <TabsTrigger value="x" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
                x
              </TabsTrigger>
              <!-- <TabsTrigger value="instagram" class="data-[state=active]:bg-[hsl(var(--highlight-low))]">
                instagram
              </TabsTrigger> -->
            </TabsList>
            <TabsContent value="all">
              <PostFeed filter="all" />
            </TabsContent>
            <TabsContent value="markdown">
              <PostFeed filter="markdown" />
            </TabsContent>
            <TabsContent value="notion">
              <PostFeed filter="notion" />
            </TabsContent>
            <TabsContent value="x">
              <PostFeed filter="x" />
            </TabsContent>
            <!-- <TabsContent value="instagram">
              <PostFeed filter="instagram" />
            </TabsContent> -->
          </Tabs>

        </section>
      </div>
      <div class="lg:col-span-1">
        <section v-if="getConfig('features.enableGithubActivity')">
          <div class="flex items-center my-6">
            <div class="h-px flex-1 bg-muted/20"></div>
            <span class="mx-4 text-sm text-muted-foreground">ACTIVITY</span>
            <div class="h-px flex-1 bg-muted/20"></div>
          </div>

          <div class="space-y-8">
            <GithubActivity />
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, type Ref } from 'vue';
import Terminal from '@/components/Terminal.vue';
import GithubActivity from '@/components/GitHubActivity.vue';
import PostFeed from '@/components/posts/PostFeed.vue';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GitHubIcon, XIcon } from 'vue3-simple-icons';
import { getConfig } from '@/lib/utils';
const currentDate = ref<string | undefined>(undefined);

onMounted(() => {
  currentDate.value = new Date().toLocaleDateString();
});

</script>

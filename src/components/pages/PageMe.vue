<template>
  <div class="min-h-screen ">
    <main class="mx-auto px-4 py-12 md:px-6">
      <div class="mx-auto max-w-3xl">
        <a href="/" class="mb-8 inline-flex items-center gap-2 text-sm text-text hover:text-primary">
          <span>←</span> cd ..
        </a>

        <Card class="mb-8 w-min">
          <h1 class="text-2xl font-bold sm:text-3xl ">~/me</h1>
        </Card>

        <Terminal command="glow profile.md" :is-markdown="true">
          <template #output>
            <slot name="terminal-output" />
          </template>
        </Terminal>

        <Card class="mt-8" v-if="email || githubUsername || twitterUsername">
          <h2 class="text-xl font-bold text-text mb-2">contact</h2>
          <ul class="list-none pl-0 space-y-2">
            <li class="flex items-center text-text" v-if="email">
              <span class="text-muted mr-2">→</span>
              <span class="mr-2">email:</span>
              <a href="mailto:example@example.com"
                class="text-foam/80 hover:text-foam border-b border-dashed border-foam/80">
                {{ getConfig("site.email") }}
              </a>
            </li>
            <li class="flex items-center text-text" v-if="githubUsername">
              <span class="text-muted mr-2">→</span>
              <span class="mr-2">github:</span>
              <a :href="`https://github.com/${githubUsername}`" target="_blank" rel="noopener noreferrer"
                class="text-foam/80 hover:text-foam border-b border-dashed border-foam/80">
                @{{ githubUsername }}
              </a>
            </li>
            <li class="flex items-center text-text" v-if="twitterUsername">
              <span class="text-muted mr-2">→</span>
              <span class="mr-2">x:</span>
              <a :href="`https://x.com/${twitterUsername}`" target="_blank" rel="noopener noreferrer"
                class="text-foam/80 hover:text-foam border-b border-dashed border-foam/80">
                @{{ twitterUsername }}
              </a>
            </li>
          </ul>
        </Card>

      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import Terminal from "@/components/Terminal.vue"
import { getConfig } from "@/lib/utils"
import Card from "../Card.vue"

const githubUsername = getConfig("github.username")
const twitterUsername = getConfig("twitter.username")
const email = getConfig("site.email")
</script>

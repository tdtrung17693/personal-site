<template>
  <div class="min-h-screen ">


    <main class="container mx-auto px-4 py-12 md:px-6">
      <div class="container mx-auto max-w-3xl">
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
            <li class="flex items-center text-slate-300" v-if="githubUsername">
              <span class="text-muted mr-2">→</span>
              <span class="mr-2">github:</span>
              <a :href="`https://github.com/${githubUsername}`" target="_blank" rel="noopener noreferrer"
                class="text-foam/80 hover:text-foam border-b border-dashed border-foam/80">
                @{{ githubUsername }}
              </a>
            </li>
            <li class="flex items-center text-slate-300" v-if="twitterUsername">
              <span class="text-slate-400 mr-2">→</span>
              <span class="mr-2">twitter:</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                class="text-green-400 hover:underline">
                @{{ twitterUsername }}
              </a>
            </li>
          </ul>
        </Card>

        <Card class="p-4 mt-8">
          <h2 class="text-xl font-bold mb-4">Recent Activity</h2>
          <ul class="mt-4 space-y-3 list-none pl-0">
            <li class="border-l-2 border-foam pl-4">
              <div class="text-xs text-text">2 days ago</div>
              <div class="text-sm text-text">Updated personal website with notes section</div>
            </li>
            <li class="border-l-2 border-foam pl-4">
              <div class="text-xs text-text">1 week ago</div>
              <div class="text-sm text-text">Published new article on Zettelkasten method</div>
            </li>
            <li class="border-l-2 border-foam pl-4">
              <div class="text-xs text-text">2 weeks ago</div>
              <div class="text-sm text-text">Started learning Rust programming language</div>
            </li>
          </ul>
        </Card>
      </div>
    </main>

    <footer class="border-t border-green-500/20 py-6">
      <div class="container mx-auto px-4 text-center text-xs text-text md:px-6">
        <p>
          <span class="text-accent">&copy;</span> {{ new Date().getFullYear() }} {{ getConfig("site.title") }}
          <span class="text-accent">|</span> Built with <span class="text-accent">Astro</span>
        </p>
      </div>
    </footer>
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

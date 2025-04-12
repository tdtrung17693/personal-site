<template>
  <header class="border-b border-muted/20 bg-surface/60 backdrop-blur-sm">
    <div class="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
      <div class="text-lg font-bold">
        <a href="/">
          <span class="text-rose">trungtran</span>
          <span class="text-muted">.</span>
          <span class="text-muted">space</span>
        </a>
      </div>
      <div class="flex items-center gap-4">
      </div>
      <nav class="flex items-center gap-6 text-text/80  text-sm [&_a]:hover:text-primary">
        <SearchButton />
        <ThemeSwitcher />
        <div class="hidden sm:flex items-center gap-6">
          <a href="/me" :class="[
            isActive('/me') && 'text-primary font-bold'
          ]">
            /me
          </a>
          <a href="/projects" :class="[
            isActive('/projects') && 'text-primary'
          ]">
            /projects
          </a>
          <a href="/notes" :class="[
            isActive('/notes') && 'text-primary'
          ]">
            /notes
          </a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import ThemeSwitcher from './theme/ThemeSwitcher.vue'
import SearchButton from './search/SearchButton.vue'
const isActive = (path) => {
  return false
}
</script>

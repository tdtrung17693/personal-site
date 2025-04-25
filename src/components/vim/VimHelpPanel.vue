<template>
  <div class="vim-navigation-ui fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
    <div ref="helpPanelRef" tabIndex="{0}"
      class="card relative max-h-[80vh] w-full max-w-2xl overflow-y-auto p-6 focus:outline-none focus:ring-1 focus:ring-foam/50">
      <div class="sticky top-0 right-0 z-10 flex justify-between bg-surface pb-2">
        <h2 class="text-xl font-bold text-foam">Vim Keybindings</h2>
        <button @click="$emit('closeHelp')" class="text-subtle hover:text-foam" aria-label="Close help">
          <X class="h-5 w-5" />
        </button>
      </div>

      <div class="mb-6">
        <h3 class="mb-2 text-lg font-semibold text-text">Navigation</h3>
        <ul class="space-y-2 text-text">
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              j
            </kbd>
            <span>Scroll down</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              k
            </kbd>
            <span>Scroll up</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              gg
            </kbd>
            <span>Go to top of page</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              G
            </kbd>
            <span>Go to bottom of page</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              f
            </kbd>
            <span>Jump to focusable element (links, buttons, inputs)</span>
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h3 class="mb-2 text-lg font-semibold text-text">Page Navigation</h3>
        <ul class="space-y-2 text-text">
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              gh
            </kbd>
            <span>Go to home page</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              gm
            </kbd>
            <span>Go to /me page</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              gp
            </kbd>
            <span>Go to /projects page</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              gn
            </kbd>
            <span>Go to /notes page</span>
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h3 class="mb-2 text-lg font-semibold text-text">Mode Switching</h3>
        <ul class="space-y-2 text-text">
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              i
            </kbd>
            <span>Enter insert mode (disables keybindings)</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              Esc
            </kbd>
            <span>Return to normal mode</span>
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h3 class="mb-2 text-lg font-semibold text-text">Jump Mode</h3>
        <p class="mb-2 text-text">
          Press
          <kbd class="mx-1 rounded bg-highlight-low px-1.5 py-0.5 font-mono text-xs text-text">f</kbd>{" "} to enter
          jump mode, which displays letter labels next to all
          focusable elements. Press the corresponding letter to focus that
          element.
        </p>
        <ul class="space-y-2 text-text">
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              a-z
            </kbd>
            <span>Jump to the element with that label</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              Esc
            </kbd>
            <span>Exit jump mode without selecting</span>
          </li>
        </ul>
      </div>

      <div class="mb-6">
        <h3 class="mb-2 text-lg font-semibold text-text">Search</h3>
        <ul class="space-y-2 text-text">
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              /
            </kbd>
            <span>Open search panel</span>
          </li>
          <li class="flex items-start">
            <kbd class="mr-3 w-8 rounded bg-highlight-low px-2 py-1 text-center font-mono text-xs text-text">
              ?
            </kbd>
            <span>Toggle this help menu</span>
          </li>
        </ul>
      </div>

      <div class="mt-6 text-center">
        <button @click="$emit('closeHelp')" class="px-4 group bg-highlight-low text-text">
          <span class="inline-block group-hover:-translate-x-1 transition-transform duration-200"> [</span>
          Close Help
          <span class="inline-block group-hover:translate-x-1 transition-transform duration-200">]</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, useTemplateRef } from "vue";

const helpPanelRef = useTemplateRef<HTMLDivElement>("helpPanelRef");

defineEmits<{
  (e: "closeHelp"): void;
}>();

defineExpose({
  scroll: (top: number) => {
    helpPanelRef.value?.scrollTo({ top, behavior: "smooth" });
  },
});
</script>

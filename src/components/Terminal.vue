<template>
  <div class="mb-8 rounded border border-muted/20 bg-block-background p-4">
    <div class="mb-4 flex items-center justify-between border-b border-muted/20 pb-4">
      <div class="flex items-center gap-2">
        <div class="h-3 w-3 rounded-full bg-[hsl(var(--love))]"></div>
        <div class="h-3 w-3 rounded-full bg-[hsl(var(--gold))]"></div>
        <div class="h-3 w-3 rounded-full bg-[hsl(var(--foam))]"></div>
        <div class="ml-2 text-xs text-[hsl(var(--subtle))]">terminal</div>
      </div>
    </div>

    <div class="font-mono text-sm">
      <p class="mb-2">
        <span class="text-foam">trung</span>
        <span class="text-subtle">@</span>
        <span class="text-iris">tdtrung</span>
        <span class="text-subtle">:~$</span> <span>{{ typedText }}</span>
        <span v-if="cursorVisible" class="text-foam animate-pulse">▋</span>
      </p>

      <div v-if="isShowingOutput && $slots.output" class="terminal-output mt-2 prose  max-w-none glow-markdown">
        <slot name="output" />
      </div>
      <div v-else-if="isShowingOutput && output" class="terminal-output mt-2 prose max-w-none glow-markdown">
        {{ output }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { Marked } from 'marked';

import { markedHighlight } from "marked-highlight";

const props = defineProps({
  command: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: false
  },
  outputRenderer: {
    type: Function,
    required: false
  },
  isMarkdown: {
    type: Boolean,
    default: false
  },
});

const typedText = ref('');
const cursorVisible = ref(true);
const isShowingOutput = ref(false);

onMounted(() => {
  let i = 0
  const typingInterval = setInterval(() => {
    typedText.value = props.command.substring(0, i)

    i++
    if (i > props.command.length) {
      clearInterval(typingInterval)
      // Wait a bit before showing output
      setTimeout(() => (isShowingOutput.value = true), 300)
    }
  }, 50)

  const cursorInterval = setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 530)

  onBeforeUnmount(() => {
    clearInterval(typingInterval)
    clearInterval(cursorInterval)
  })
})

</script>

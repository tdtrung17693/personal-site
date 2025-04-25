<template>
  <div class="fixed bottom-0 left-0 right-0 z-40 border-t border-muted/30 bg-surface/50 backdrop-blur-sm">
    <div class="container mx-auto flex h-8 items-center justify-between px-4 text-xs">
      <div class="flex items-center gap-3">
        <div :class="['flex h-full items-center px-3 font-semibold text-background',
          mode === 'normal' ? 'bg-foam text-base' : mode === 'insert' ? 'bg-gold text-base' : 'bg-iris text-base'
        ]">
          {{ mode === "normal" ? "NORMAL" : mode === "insert" ? "INSERT" : "JUMP" }}
        </div>

        <!-- Current file/page -->
        <div class="flex items-center text-text">
          <span class="text-foam">:</span>
          <span class="ml-1">{{ getCurrentPage() }}</span>
        </div>

        <!-- Status message -->
        <div class="text-text" v-if="statusMessage">{{ statusMessage }}</div>
      </div>

      <!-- Quick help -->
      <div class="flex items-center gap-4 text-subtle">
        <div class="flex items-center gap-1">
          <kbd class="rounded bg-highlight-low px-1.5 py-0.5 font-mono text-text">j</kbd>
          <kbd class="rounded bg-highlight-low px-1.5 py-0.5 font-mono text-text">k</kbd>
          <span class="ml-1">scroll</span>
        </div>
        <div class="flex items-center gap-1">
          <kbd class="rounded bg-highlight-low px-1.5 py-0.5 font-mono text-text">f</kbd>
          <span class="ml-1">jump</span>
        </div>
        <div class="flex items-center gap-1">
          <kbd class="rounded bg-highlight-low px-1.5 py-0.5 font-mono text-text">/</kbd>
          <span class="ml-1">search</span>
        </div>
        <div class="flex items-center gap-1">
          <kbd class="rounded bg-highlight-low px-1.5 py-0.5 font-mono text-text">Esc</kbd>
          <span class="ml-1">exit</span>
        </div>
        <button @click="showHelp" class="flex items-center gap-1 hover:text-foam">
          <kbd class="rounded bg-highlight-low px-1.5 py-0.5 font-mono text-text">?</kbd>
          <span class="ml-1">help</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Help overlay -->
  <VimHelpPanel v-if="showingHelp" ref="helpPanelRef" @closeHelp="closeHelp" />

  <div class="h-8"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import VimHelpPanel from './VimHelpPanel.vue'
import { watchEffect } from 'vue'

const mode = ref('normal')
const showingHelp = ref(false)
const helpPanelRef = useTemplateRef<typeof VimHelpPanel>('helpPanel')
const jumpTargets = ref<{ element: HTMLElement; key: string }[]>([])
const statusMessage = ref('')
const pathname = location?.pathname || ""

function showHelp() {
  showingHelp.value = true
  document.body.style.overflow = "hidden"
}

const closeHelp = () => {
  showingHelp.value = false
  document.body.style.overflow = "auto"
}

const activateJumpMode = () => {
  // Clear any existing jump targets
  jumpTargets.value = []

  // Get all focusable elements
  const focusableElements = Array.from(
    document.querySelectorAll<HTMLElement>('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'),
  ).filter((el) => {
    // Filter out hidden elements and those in the vim navigation UI
    const rect = el.getBoundingClientRect()
    const isVisible =
      rect.width > 0 &&
      rect.height > 0 &&
      window.getComputedStyle(el).visibility !== "hidden" &&
      window.getComputedStyle(el).display !== "none"
    const isNotVimUI = !el.closest(".vim-navigation-ui")
    return isVisible && isNotVimUI
  })

  // Assign keys to elements (using letters a-z)
  const keys = "abcdefghijklmnopqrstuvwxyz"
  const targets = focusableElements.slice(0, keys.length).map((element, index) => ({
    element,
    key: keys[index],
  }))

  jumpTargets.value = targets
  mode.value = "jump"
  statusMessage.value = "JUMP MODE - press key to focus element"
}

const handleJumpSelection =
  (key: string) => {
    const target = jumpTargets.value.find((t) => t.key === key)
    if (target) {
      target.element.focus()
      // If it's a link or button, add a visual indication that it's focused
      target.element.classList.add("jump-target-focused")
      setTimeout(() => {
        target.element.classList.remove("jump-target-focused")
      }, 1000)
    }
    // Exit jump mode
    jumpTargets.value = []
    mode.value = "normal"
    statusMessage.value = ""
  }


const handleKeyDown =
  (e: KeyboardEvent) => {
    // Handle jump mode key presses
    if (mode.value === "jump") {
      const key = e.key.toLowerCase()
      if (jumpTargets.value.some((t) => t.key === key)) {
        handleJumpSelection(key)
        e.preventDefault()
        return
      } else if (e.key === "Escape") {
        // Exit jump mode
        jumpTargets.value = []
        mode.value = "normal"
        statusMessage.value = ""
        e.preventDefault()
        return
      }
    }

    // Special handling for help panel scrolling
    if (showingHelp.value && helpPanelRef.value) {
      if (e.key === "j") {
        // Scroll down within help panel
        helpPanelRef.value.scroll(50)
        e.preventDefault()
        return
      } else if (e.key === "k") {
        // Scroll up within help panel
        helpPanelRef.value.scroll(-50)
        e.preventDefault()
        return
      }
    }

    // Global Escape key handler
    if (e.key === "Escape") {
      // Priority order for Escape key:
      if (showingHelp.value) {
        // 1. Close help overlay if open
        closeHelp()
        e.preventDefault()
        return
      } else if (mode.value === "insert") {
        // 2. Switch from insert to normal mode
        mode.value = "normal"
        statusMessage.value = ""
        e.preventDefault()
        return
      }
    }

    // Don't capture keys when user is typing in an input, textarea, etc.
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement ||
      (e.target as HTMLElement).isContentEditable
    ) {
      return
    }

    // Normal mode
    if (mode.value === "normal") {
      switch (e.key) {
        case "?":
          showHelp()
          e.preventDefault()
          break
        case "/":

          // Trigger search dialog
          const searchBtn = document.querySelector("[aria-label='Search']") as HTMLButtonElement
          if (searchBtn) {
            searchBtn.click()
            statusMessage.value = "Search mode"
            setTimeout(() => statusMessage.value = "", 100)
          }
          e.preventDefault()
          break
        case "f":
          // Activate jump mode (like EasyMotion)
          activateJumpMode()
          e.preventDefault()
          break
        case "i":
          mode.value = "insert"
          statusMessage.value = "-- INSERT --"
          setTimeout(() => statusMessage.value = "", 100)
          e.preventDefault()
          break
        case "j":
          if (showingHelp.value) {
            return
          }
          window.scrollBy({ top: 100, behavior: "smooth" })
          e.preventDefault()
          break
        case "k":
          if (showingHelp.value) {
            return
          }
          window.scrollBy({ top: -100, behavior: "smooth" })
          e.preventDefault()
          break
        case "g":
          // Wait for next key press
          const handleNextKey = (nextEvent: KeyboardEvent) => {
            if (nextEvent.key === "g") {
              window.scrollTo({ top: 0, behavior: "smooth" })
            } else if (nextEvent.key === "h") {
              window.location.href = "/"
            } else if (nextEvent.key === "m") {
              window.location.href = "/me"
            } else if (nextEvent.key === "p") {
              window.location.href = "/projects"
            } else if (nextEvent.key === "n") {
              window.location.href = "/notes"
            }
            document.removeEventListener("keydown", handleNextKey)
          }
          document.addEventListener("keydown", handleNextKey, { once: true })
          e.preventDefault()
          break
        case "G":
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
          e.preventDefault()
          break
      }
    }
  }

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown)
  return () => {
    document.removeEventListener("keydown", handleKeyDown)
  }
})

watchEffect(() => {
  document.querySelectorAll(".jump-target-label").forEach((el) => el.remove())

  if (mode.value === "jump" && jumpTargets.value.length > 0) {
    // Create labels for each jump target
    jumpTargets.value.forEach(({ element, key }) => {
      const rect = element.getBoundingClientRect()
      const label = document.createElement("div")
      label.className = "jump-target-label"
      label.textContent = key

      // Position the label near the element
      label.style.position = "fixed"
      label.style.left = `${rect.left}px`
      label.style.top = `${rect.top - 20}px`

      document.body.appendChild(label)
    })
  }

  return () => {
    // Clean up labels when component unmounts or mode changes
    document.querySelectorAll(".jump-target-label").forEach((el) => el.remove())
  }
})

const getCurrentPage = () => {
  if (pathname === "/") return "home"
  return pathname.substring(1)
}
</script>

<template>
    <DialogHolder client:only>
        <Header />
        <slot />
        <footer class="border-t border-muted/20 py-6 mt-auto ">
            <div class="container mx-auto px-4 text-center text-xs text-text md:px-6">
                <p>
                    <span class="text-accent">&copy;</span> {{ new Date().getFullYear() }} {{ getConfig("site.title") }}
                    <span class="text-accent">|</span> Built with <span class="text-accent">Astro</span>
                </p>
            </div>
        </footer>
        <VimNavigation />
    </DialogHolder>

</template>

<script setup lang="ts">
import DialogHolder from "@/components/dialog/DialogHolder.vue";
import Header from "@/components/Header.vue";
import VimNavigation from "@/components/vim/VimNavigation.vue";
import { getConfig } from "@/lib/utils";
</script>

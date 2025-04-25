<template>
    <DialogHolder client:only>
        <Header />
        <slot />

        <VimNavigation />
    </DialogHolder>
</template>

<script setup lang="ts">
import DialogHolder from "@/components/dialog/DialogHolder.vue";
import Header from "@/components/Header.vue";
import VimNavigation from "@/components/vim/VimNavigation.vue";
</script>

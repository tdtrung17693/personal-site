<template>
    <DialogHolder client:only="vue">
        <Header client:only="vue" />
        <slot />
    </DialogHolder>
</template>

<script setup lang="ts">
import DialogHolder from '@/components/dialog/DialogHolder.vue';
import Header from '@/components/Header.vue';
</script>

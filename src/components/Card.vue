<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'vue';

/** @vue-ignore */
interface CardProps extends HTMLAttributes {
    asLink?: boolean;
}

const props = defineProps<CardProps>();
</script>

<template>
    <component 
        :is="props.asLink ? 'a' : 'div'" 
        :class="cn('bg-surface/60 hover:bg-surface rounded-lg block rounded border px-4 py-2 border-muted/20', $attrs.class as string)"
        v-bind="$attrs"
    >
        <slot />
    </component>
</template>

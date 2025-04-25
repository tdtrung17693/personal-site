<script setup lang="ts">
import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";

interface Props {
    mobileImgUrl: string | ImageMetadata;
    desktopImgUrl: string | ImageMetadata;
    alt: string;
}

const { mobileImgUrl, desktopImgUrl, alt } = defineProps<Props>();

const mobileImg = await getImage({
    src: mobileImgUrl,
    format: "webp",
    width: 200,
    height: 200,
});

const desktopImg = await getImage({
    src: desktopImgUrl,
    format: "webp",
    width: 800,
    height: 200,
});
</script>

<template>
    <picture>
        <source srcset={mobileImg.src} media="(max-width: 768px)" />
        <source srcset={desktopImg.src} media="(min-width: 768px)" />
        <img :src="mobileImg.src" :alt="alt" />
    </picture>
</template>

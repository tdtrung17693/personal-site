<template>
    <main class="container mx-auto px-4 py-12 md:px-6">
        <a href="/" class="mb-8 inline-flex items-center gap-2 text-sm text-text hover:text-primary">
            <span>←</span> cd ..
        </a>

        <Card class="mb-8 w-min">
            <h1 class="text-2xl font-bold sm:text-3xl ">~/projects</h1>
        </Card>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card class="mt-8 flex flex-col" v-for="project in projects" :key="project.id">
                <h3 class="text-lg font-bold text-text">{{ project.data.name }}</h3>
                <div class="mt-2 text-sm text-subtle" v-html="project.rendered.html"></div>
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="badge badge-foam" v-for="tag in project.data.tags" :key="tag">
                        {{ tag }}
                    </span>
                </div>
                <div class="mt-auto flex flex-wrap gap-2 pt-4" v-if="project.data.github || project.data.demo">
                    <a :href="project.data.github" class="text-sm text-text flex items-center gap-2 hover:text-primary"
                        v-if="project.data.github">
                        <GitHubIcon class="w-4 h-4" />
                        <span>github</span>
                    </a>
                    <a :href="project.data.demo" class="text-sm text-text flex items-center gap-2 hover:text-primary"
                        v-if="project.data.demo">
                        <ExternalLinkIcon stroke-width="1.5" class="w-4 h-4" />
                        <span>demo</span>
                    </a>
                </div>
            </Card>
        </div>
    </main>


</template>

<script setup lang="ts">
import Card from "../Card.vue";
import { ExternalLinkIcon } from "lucide-vue-next";
import { GitHubIcon } from "vue3-simple-icons";
interface Project {
    id: string;
    rendered: {
        html: string;
    };
    data: {
        name: string;
        tags: string[];
        description: string;
        github: string;
        demo?: string;
    }
    body: string;
}

const props = defineProps<{
    projects: Project[]
}>()

</script>

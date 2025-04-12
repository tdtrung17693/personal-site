<template></template>

<script setup lang="ts">
const projects = [{
    id: "personal-site",
    title: "Personal Website",
    description:
        "A terminal-inspired personal website built with Next.js and TailwindCSS. Features a digital garden, blog aggregation from multiple sources, and activity tracking.",
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "React"],
    links: {
        demo: "https://tdtrung.tech",
        github: "https://github.com/username/personal-site",
    },
    featured: true,
},
{
    id: "note-taking-app",
    title: "Digital Garden",
    description:
        "A note-taking application inspired by the Zettelkasten method. Supports bidirectional linking, markdown formatting, and knowledge graph visualization.",
    technologies: ["React", "TypeScript", "IndexedDB", "D3.js"],
    links: {
        demo: "https://garden.tdtrung.tech",
        github: "https://github.com/username/digital-garden",
        details: "/projects/digital-garden",
    },
    featured: true,
},
{
    id: "cli-tools",
    title: "Developer CLI Tools",
    description:
        "A collection of command-line utilities to improve developer workflow. Includes tools for project scaffolding, git automation, and productivity tracking.",
    technologies: ["Node.js", "Rust", "CLI"],
    links: {
        github: "https://github.com/username/dev-tools",
    },
    featured: false,
},
{
    id: "markdown-editor",
    title: "Markdown Editor",
    description:
        "A minimalist markdown editor with live preview, syntax highlighting, and keyboard shortcuts. Supports custom themes and export to multiple formats.",
    technologies: ["Vue.js", "JavaScript", "Marked", "LocalStorage"],
    links: {
        demo: "https://markdown.tdtrung.tech",
        github: "https://github.com/username/markdown-editor",
    },
    featured: false,
},
{
    id: "api-dashboard",
    title: "API Dashboard",
    description:
        "A dashboard for monitoring and testing API endpoints. Features request history, environment variables, and response visualization.",
    technologies: ["React", "Redux", "Express", "MongoDB"],
    links: {
        github: "https://github.com/username/api-dashboard",
    },
    featured: false,
},
{
    id: "code-snippets",
    title: "Code Snippet Manager",
    description:
        "A web application for storing and organizing code snippets with syntax highlighting, tags, and search functionality.",
    technologies: ["SvelteKit", "TypeScript", "Prisma", "PostgreSQL"],
    links: {
        demo: "https://snippets.tdtrung.tech",
        github: "https://github.com/username/snippet-manager",
    },
    featured: true,
},]


</script>

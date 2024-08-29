<template>
    <div>
        <p class="mb-10 text-center text-prim font-bold text-4xl md:text-6xl">{{ props.title }}</p>
    </div>
</template>

<script setup>

const props = defineProps({
    title: {
        type: String,
        default: 'Title',
    }
})

</script>
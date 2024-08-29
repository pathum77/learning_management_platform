<template>
    <div>
        <p class="mb-10 text-prim font-bold text-3xl md:text-3xl">{{ props.title }}</p>
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
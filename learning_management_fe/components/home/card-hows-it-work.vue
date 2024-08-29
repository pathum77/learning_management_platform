<template>
    <div class="max-w-[300px] w-full p-10 rounded-md flex flex-col items-center bg-[#fccd9031]">
        <div class="w-[70px] h-[70px] mb-5 rounded-full grid place-items-center bg-prim">
            <UIcon class="w-10 h-10 text-white" :name="props.icon" dynamic />
        </div>
        <p class="mb-5 text-lg text-center font-bold">{{ props.title }}</p>
        <p class="text-center">{{ props.description }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    icon: {
        type: String,
        default: 'ri:login-circle-line',
    },

    title: {
        type: String,
        default: 'Title',
    },

    description: {
        type: String,
        default: 'Description',
    }
})
</script>
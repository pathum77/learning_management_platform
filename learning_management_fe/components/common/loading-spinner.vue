<template>
    <div v-if="props.isLoading" class="h-screen bg-[#00000074] flex justify-center items-center fixed top-0 left-0 right-0 z-50">
        <UIcon class="text-[40px] text-sec" name="svg-spinners:blocks-shuffle-3" dynamic />
    </div>
</template>

<script setup>

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false,
    }
});

</script>
<template>
    <button @click="buttonClick()"
        class="min-h-[52px] min-w-[150px] py-3 px-8 rounded-md text-white font-bold border-2 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-transparent"
        :class="props.isPrimaryCol === true ? 'bg-prim border-prim hover:text-prim' : 'bg-sec border-sec hover:text-sec'">
        <UIcon v-if="props.loadingSpinner" class="text-[25px]" name="line-md:loading-twotone-loop" dynamic />
        <UIcon v-if="props.icon" class="text-[35px]" :name="props.icon" dynamic />
        <p v-if="!props.loadingSpinner">{{ props.text }}</p>
    </button>
</template>

<script setup>

const props = defineProps({

    loadingSpinner: {
        type: Boolean,
        default: false
    },

    icon: {
        type: String,
        default: '',
    },

    text: {
        type: String,
        default: '',
    },

    isPrimaryCol: {
        type: Boolean,
        default: true
    }
});

const emits = defineEmits(['btn-click']);

const buttonClick = () => {
    emits('btn-click');
};

</script>
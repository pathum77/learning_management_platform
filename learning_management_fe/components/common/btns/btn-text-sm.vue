<template>
    <button @click="buttonClick()"
        class="py-1 px-8 rounded-md text-white font-bold border-2 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out hover:bg-transparent"
        :class="props.isPrimaryCol === true ? 'bg-prim border-prim hover:text-prim' : 'bg-sec border-sec hover:text-sec'">
        <UIcon v-if="props.icon" class="text-[25px]" :name="props.icon" dynamic />
        <p>{{ props.text }}</p>
    </button>
</template>

<script setup>

const props = defineProps({

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
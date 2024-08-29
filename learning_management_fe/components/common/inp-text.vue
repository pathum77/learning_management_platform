<template>
    <div class="w-full mb-4">
        <p class="mb-1">{{ props.label }}</p>
        <input v-model="inputValue" @input="emitNewValue()" class="w-full h-10 px-3 outline-none border rounded-md"
            :class="props.error !== '' ? 'border-red-600' : 'border-[#0000002b]'" :type=props.type :id="props.id" :placeholder="props.placeholder">
        <p v-if="error !== ''" class="text-sm text-red-600">{{ props.error }}</p>
    </div>
</template>
<script setup>

const props = defineProps({

    id: {
        type: String,
    },

    label: {
        type: String,
    },

    type: {
        type: String,
        default: 'text'
    },

    value: {
        type: String,
    },

    placeholder: {
        type: String,
    },

    error: {
        type: String,
        default: ''
    }
});

let inputValue = ref('');

watch(() => props.value, (val) => {
    if (val === '') {
        inputValue.value = val;
    }
});

const emits = defineEmits(['inputFieldValueChanged']);

const emitNewValue = () => {
    emits('inputFieldValueChanged', inputValue.value);
};

</script>
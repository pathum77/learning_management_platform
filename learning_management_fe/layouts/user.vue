<template>
    <div>
        <navigation />
        <div>
            <slot />
        </div>
    </div>
</template>

<script setup>
import navigation from '../components/common/navigation/navigationUser.vue';

</script>
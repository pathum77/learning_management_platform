<template>
    <div class="min-h-screen flex bg-bg-light">
        <LoadingSpinner :is-loading="isLoading" />
        <div class="w-[300px] flex-shrink-0 bg-fg-light hidden lg:block">
            <div class="p-5 fixed left-0 top-0 bottom-0 right-0">
                <leftNavigationLinksAdmin />
            </div>
        </div>
        <div class="w-full p-5 relative">
            <TopNavigation @loaderTrigger="loaderTrigger" />
            <div class="mt-[75px]">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
import LoadingSpinner from '~/components/common/loading-spinner.vue';
import leftNavigationLinksAdmin from '~/components/common/navigation/leftNavigationLinksAdmin.vue';
import TopNavigation from '../components/common/navigation/topNavigationAdmin.vue';

const isLoading = ref(false);

const loaderTrigger = (value) => {
    isLoading.value = value;
};

</script>
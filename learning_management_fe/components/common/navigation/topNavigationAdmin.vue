<template>
    <div class="ml-0 lg:ml-[300px] pr-5 pt-5 pl-5 backdrop-blur-sm fixed top-0 left-0 right-0">
        <div class="container py-2 rounded-md flex justify-between lg:justify-end gap-5 shadow-sm bg-[#ffffffc2]">
            <button @click="mobileNavigationHideShowTrigger()" class="flex lg:hidden justify-center items-center">
                <UIcon class="w-6 h-6" name="humbleicons:bars" dynamic />
            </button>
            <UDropdown :items="profileBtnItems" :ui="{ item: { disabled: 'cursor-text select-text' } }"
                :popper="{ placement: 'bottom-start' }">
                <button class="w-10 h-10 flex justify-center items-center rounded-full bg-prim relative">
                    <UIcon class="w-7 h-7 text-fg-light" name="material-symbols:person" dynamic />
                </button>
                <template #item="{ item }">
                    <span class="truncate">{{ item.label }}</span>
                    <UIcon class="ms-auto text-[20px] text-red-600" :name="item.icon" dynamic />
                </template>
            </UDropdown>
        </div>
        <div class="block lg:hidden">
            <USlideover v-model="isMobileNavigationOpen" side="left">
                <div class="p-5">
                    <div class="flex justify-end">
                        <UIcon @click="mobileNavigationHideShowTrigger()" class="text-[25px] cursor-pointer"
                            name="material-symbols:close" dynamic />
                    </div>
                    <leftNavigationLinksAdmin />
                </div>
            </USlideover>
        </div>
    </div>
</template>

<script setup>
// import { useAuthStore } from '~/store/index.js';
import leftNavigationLinksAdmin from './leftNavigationLinksAdmin.vue';

// const authStore = process.client ? useAuthStore() : null;
const router = useRouter();

const profileBtnItems = [
    [{
        label: 'Logout',
        icon: 'ri:logout-circle-line',
        click: () => {
            logout();
        },
    }]
];
const isMobileNavigationOpen = ref(false);

const logout = () => {
    loaderTrigger(true);

    authStore.logout();
    setTimeout(() => {
        loaderTrigger(false);
        router.push('/admin/login');
    }, 1000);
}

const mobileNavigationHideShowTrigger = () => {
    isMobileNavigationOpen.value = !isMobileNavigationOpen.value;
};

const emits = defineEmits(['loaderTrigger']);

const loaderTrigger = (value) => {
    emits('loaderTrigger', value);
};

</script>
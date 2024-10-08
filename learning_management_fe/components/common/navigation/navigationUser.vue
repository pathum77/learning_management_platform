<template>
    <transition name="nav-transition">
        <div v-if="isNavigationVisible"
            class="py-3 drop-shadow-md fixed top-0 left-0 right-0 z-20 bg-white transition-all duration-300 ease-in-out'">
            <div class="container py-0 flex justify-between items-center">
                <nuxt-link to="/">
                    <div class="w-[100px] h-[50px] flex-shrink-0 flex items-center">
                        <img src="../../../public/public-assets/logo/logo-sample.png" alt="">
                    </div>
                </nuxt-link>
                <div class="flex justify-between items-center gap-5">
                    <nuxt-link to="/">Home</nuxt-link>
                    <nuxt-link to="/courses">Courses</nuxt-link>
                    <nuxt-link v-if="isUserLoggedIn === false" to="/register">Join</nuxt-link>
                    <nuxt-link v-if="isUserLoggedIn === false" to="/login">Sign in</nuxt-link>
                    <UDropdown v-if="isUserLoggedIn === true" :items="profileBtnItems" :ui="{ item: { disabled: 'cursor-text select-text' } }"
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
            </div>
        </div>
    </transition>
</template>

<script setup>
import { useAuthStore } from '~/store/index.js';

const router = useRouter();

const isNavigationVisible = ref(true);
let lastScrollTop = ref(0);

const profileBtnItems = [
    [{
        label: 'Profile',
        icon: 'ri:user-line',
        click: () => {
            router.push('/profile');
        },
    },
    {
        label: 'Logout',
        icon: 'ri:logout-circle-line',
        click: () => {
            useAuthStore().logout();
            router.push('/login');
        },
    }
]
];

const isUserLoggedIn = computed(() => {
    if (process.client) {
        return useAuthStore().isUserLoggedIn;
    }
});

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop.value) {
        if (st > 100) {
            isNavigationVisible.value = false;
        }
    } else {
        isNavigationVisible.value = true;
    }
    lastScrollTop.value = st <= 0 ? 0 : st;
};

</script>

<style scoped>
a:hover {
    color: #FCCE90;
}

.router-link-active {
    color: #00D2B5;
}

/* navigation transition */
.nav-transition-enter-from,
.nav-transition-leave-to {
    top: -100px;
    opacity: 0;
}

.nav-transition-enter-active,
.nav-transition-leave-active {
    transition: all .3s ease;
}
</style>
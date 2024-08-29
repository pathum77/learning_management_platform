<template>
    <div class="lg:max-w-[270px] w-full">
        <div class="w-[150px] h-[50px] flex-shrink-0 flex items-center">
            <img src="../../../public/public-assets/logo/logo-sample.png" alt="">
        </div>
        <div class="mt-10">
            <div v-for="(item, index) in links" :key="index">
                <nuxt-link @click="subLinksVisibilityTrigger(index)" v-if="item.subLinks.length === 0" :to="item.redirect">
                    <div class="link-box hov p-3 flex items-center rounded-md">
                        <UIcon class="w-5 h-5 mr-5" :name="item.icon" dynamic />
                        <p class="text-sm">{{ item.name }}</p>
                    </div>
                </nuxt-link>
                <div v-if="item.subLinks.length > 0">
                    <button @click="subLinksVisibilityTrigger(index)"
                        class="w-full hov p-3 flex justify-between items-center rounded-md"
                        :class="item.isSubLinkSelected === true ? 'bg-bg-light dark:bg-bg-dark' : ''">
                        <div class="flex">
                            <UIcon class="w-5 h-5 mr-5" :name="item.icon" dynamic />
                            <p class="text-sm">{{ item.name }}</p>
                        </div>
                        <UIcon class="w-5 h-5 mr-5 transition-all duration-300 ease-in-out"
                            :class="item.isSubLinksVisible === true ? '-rotate-180' : ''"
                            name="ic:baseline-keyboard-arrow-down" dynamic />
                    </button>
                    <transition name="sub-links">
                        <div v-if="item.isSubLinksVisible" class="overflow-hidden"
                            :class="item.subLinks.length === 2 ? 'max-h-[88px]' : item.subLinks.length === 3 ? 'max-h-[132px]' : 'max-h-[156px]'">
                            <div v-for="(subItem, index) in item.subLinks" :key="index">
                                <router-link @click="subLinksVisibilityTrigger()" :to="subItem.redirect">
                                    <div class="link-box hov p-3 flex items-center rounded-md">
                                        <UIcon class="w-3 h-3 mr-5 ml-2" name="ic:outline-circle" dynamic />
                                        <p class="text-sm">{{ subItem.name }}</p>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();

const links = ref([
    { name: 'Students', icon: 'mdi:email-newsletter', subLinks: [], redirect: '/admin/students' },
    { name: 'Courses', icon: 'mdi:tshirt-crew', subLinks: [{ index: 0, name: 'Add', redirect: '/admin/add-course' }, { index: 0, name: 'Manage', redirect: '/admin/manage-course' }], isSubLinkSelected: false, isSubLinksVisible: false },
]);

let selectedLinkIndex = ref(0);

watch(() => route.fullPath, (newPath) => {
    links.value.forEach((link) => {
        link.subLinks.forEach((subLink) => {
            if (subLink.redirect === newPath) {
                links.value[subLink.index].isSubLinksVisible = true;
                links.value[subLink.index].isSubLinkSelected = true;
            }
        });
    });
}
);

const subLinksVisibilityTrigger = (index) => {

    if (index !== undefined) {
        selectedLinkIndex.value = index;

        for (let i = 0; i < links.value.length; i++) {
            if (i !== index) {
                links.value[i].isSubLinksVisible = false;
                links.value[i].isSubLinkSelected = false;
            }
        }

        links.value[index].isSubLinksVisible = !links.value[index].isSubLinksVisible;
        links.value[index].isSubLinkSelected = !links.value[index].isSubLinkSelected;

        if (links.value[index].subLinks.length === 0) {
            links.value.forEach((link) => {
                link.isSubLinksVisible = false;
                link.isSubLinkSelected = false;
            });
        }
    } else {
        links.value.forEach((link) => {
            if (link.subLinks.length > 0) {
                link.isSubLinkSelected = false;
            }
        });
    }

    setTimeout(() => {

        let routePath = route.fullPath;
        links.value.forEach((link) => {
            if (link.subLinks.length > 0) {
                link.subLinks.forEach((subLink) => {
                    if (subLink.redirect == routePath) {
                        links.value[subLink.index].isSubLinkSelected = true;
                    }
                });
            }
        });
    }, 1);
};

</script>

<style scoped>
a.router-link-exact-active .link-box {
    background: linear-gradient(to right, #00D2B5, #FCCE90);
    color: white;
}

a.router-link-exact-active .link-icon {
    color: white;
}

.sub-links-enter-active,
.sub-links-leave-active {
    transition: all .3s ease;
}

.sub-links-enter-from,
.sub-links-leave-to {
    max-height: 0px;
}
</style>
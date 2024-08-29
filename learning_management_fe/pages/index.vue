<template>
    <div>
        <UNotifications />
        <Banner />
        <div class="container">
            <Title title="How's It Work" />
            <div class="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-10">
                <CardHowsItWork icon="ri:login-circle-line" title="Sign In"
                    description="Start by logging in to access your personalized learning dashboard." />
                <CardHowsItWork icon="material-symbols:search" title="Find"
                    description="Explore our wide range of courses and find the one that suits your needs." />
                <CardHowsItWork icon="hugeicons:credit-card-accept" title="Enroll"
                    description="Enroll in your chosen course and begin your learning journey today." />
            </div>
        </div>
        <div class="container">
            <Title title="Our Latest Courses" />
            <div v-if="latestCoursesIsLoading && courses.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div v-for="item in 6" :key="item">
                    <SkeletonCardCourse />
                </div>
            </div>
            <div v-else ref="refLatestCourses" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div v-for="(course, index) in courses" :key="index">
                    <CardCourse :id="course.id" :title="course.name" :lessons="course.lesson_count" :img="course.img"
                        :isEnrolled="course.isEnrolled" />
                </div>
            </div>
            <div class="mt-14 flex justify-end">
                <NuxtLink class="px-5 py-5 font-bold rounded-3xl bg-prim text-white" to="/courses">Explore Courses
                </NuxtLink>
            </div>
        </div>
        <div class="mt-5 border-t">
            <div class="container flex justify-end">
                <nuxt-link to="/admin/login" class="text-blue-500">Login as admin</nuxt-link>
            </div>
        </div>
    </div>
</template>
<script setup>
import Banner from '../components/home/banner.vue';
import Title from '../components/common/title.vue';
import CardHowsItWork from '../components/home/card-hows-it-work.vue';
import SkeletonCardCourse from '../components/common/skeleton-card-course.vue';
import CardCourse from '../components/common/card-course.vue';
import { createObserver } from '../utils/helper';
import { getLatestCourses } from '../services/api/users/course';

definePageMeta({
    layout: 'user',
});

const toast = useToast();

const latestCoursesIsLoading = ref(false);
const refLatestCourses = ref(null);
const courses = ref([]);

onMounted(() => {
    createObserver(refLatestCourses.value, () => getCourses());
});

const getCourses = async () => {
    latestCoursesIsLoading.value = true;
    try {
        const response = await getLatestCourses();
        courses.value = response.data;
    } catch (error) {
        toast.add({
            title: error.response.data.title,
            description: error.response.data.message,
            icon: 'i-heroicons-exclamation-circle-solid',
            color: 'red',
        });
    }
    latestCoursesIsLoading.value = false;
};

</script>
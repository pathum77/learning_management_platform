<template>
    <div>
        <UNotifications />
        <div class="container pt-[100px]">
            <Title title="All Courses" />
            <p v-if="!coursesLoading && courses.length === 0" class="my-[100px] text-center text-lg">There are no courses available right now</p>
            <div v-if="coursesLoading && courses.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div v-for="item in 12" :key="item">
                    <SkeletonCardCourse />
                </div>
            </div>
            <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-white">
                <div v-for="(course, index) in courses" :key="index">
                    <CardCourse :id="course.id" :title="course.name" :lessons="course.lesson_count" :img="course.img"
                        :isEnrolled="course.isEnrolled" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Title from '@/components/common/title.vue';
import SkeletonCardCourse from '@/components/common/skeleton-card-course.vue';
import CardCourse from '@/components/common/card-course.vue';
import { getCourses } from '@/services/api/users/course';

definePageMeta({
    layout: 'user',
});

const toast = useToast();
const router = useRouter();

const coursesLoading = ref(false);
const courses = ref([]);

onMounted(() => {
    getAllCourses();
});

const getAllCourses = async () => {
    coursesLoading.value = true;
    try {
        const response = await getCourses();
        courses.value = response.data;
    } catch (error) {
        if(error.response.status === 401) {
            router.push('/login');
        } else {
            toast.add({
                title: error.response.data.title,
                description: error.response.data.message,
                icon: 'i-heroicons-exclamation-circle-solid',
                color: 'red',
            });
        }
    }
    coursesLoading.value = false;
};

</script>
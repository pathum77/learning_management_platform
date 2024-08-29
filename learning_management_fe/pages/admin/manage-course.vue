<template>
    <div>
        <UNotifications />
        <LoadingSpinner :is-loading="isLoading" />
        <CoursesEditPopup v-if="isCourseEditPopupVisible" :course="selectedCourse" @courseEditPopupClose="courseEditPopupClose"/>
        <TitleSm title="Manage Courses"/>
        <div>
            <div v-for="(course, index) in courses" :key="index" class="p-2 flex flex-col md:flex-row justify-between gap-5 border-b">
                <div class="flex flex-col sm:flex-row gap-5">
                    <div class="w-full sm:w-[200px] h-[300px] sm:h-[150px] flex-shrink-0 bg-red-200 relative">
                        <NuxtImg class="w-full h-full absolute object-cover" :src="course.img" loading="lazy" />
                    </div>
                    <div>
                        <p class="mb-3 text-lg font-bold">{{ course.name }}</p>
                        <p>{{ course.description }}</p>
                    </div>
                </div>
                <div class="flex justify-end gap-3">
                    <button @click="courseEditPopupOpen(course)" class="w-7 h-7 rounded-md grid place-items-center bg-orange-300">
                        <UIcon class="w-5 h-5 text-white" name="ic:baseline-edit" dynamic />
                    </button>
                    <button @click="deleteACourse(course.id)" class="w-7 h-7 rounded-md grid place-items-center bg-red-600">
                        <UIcon class="w-5 h-5 text-white" name="ic:baseline-delete" dynamic />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import LoadingSpinner from '~/components/common/loading-spinner.vue';
import TitleSm from '@/components/common/titles/title-sm.vue';
import CoursesEditPopup from '@/components/popups/admin-course-edit.vue';
import { getCourses, deleteCourse } from '@/services/api/admin/operations';
import Swal from 'sweetalert2';

definePageMeta({
    layout: 'admin'
});

const toast = useToast();

const isLoading = ref(false);
const courses = ref([]);
const isCourseEditPopupVisible = ref(false);
const selectedCourse = ref(null);

onMounted(() => {
    getCoursesData();
});

const getCoursesData = async () => {
    isLoading.value = true;
    try {
        const response = await getCourses();
        courses.value = response.data;        
    } catch (error) {
        toast.add({
            title: error.response.data.title,
            description: error.response.data.message,
            icon: 'i-heroicons-exclamation-circle-solid',
            color: 'red',
        });
    }
    isLoading.value = false;
};

const courseEditPopupOpen = (course) => {
    selectedCourse.value = course;
    isCourseEditPopupVisible.value = true;
};

const courseEditPopupClose = (val) => {
    isCourseEditPopupVisible.value = false;

    if(val) {
        getCoursesData();
        toast.add({
            title: val.title,
            description: val.message,
            icon: 'i-heroicons-check-circle-solid',
            color: 'green',
        });
    }
};

const deleteACourse = (id) => {
    Swal.fire({
        title: "Confirmation",
        text: `Are you sure you want to delete this course permanently?`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonColor: 'red',
        confirmButtonColor: '#00D2B5',
    }).then(async (result) => {
        if (result.isConfirmed) {
            isLoading.value = true;
            try {
                const response = await deleteCourse(id);
                toast.add({
                    title: response.data.title,
                    description: response.data.message,
                    icon: 'i-heroicons-check-circle-solid',
                    color: 'green',
                });
                getCoursesData();
            } catch (error) {
                toast.add({
                    title: error.response.data.title,
                    description: error.response.data.message,
                    icon: 'i-heroicons-exclamation-circle-solid',
                    color: 'red',
                });
            }
            isLoading.value = false;
        }
    });
};

</script>
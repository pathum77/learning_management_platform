<template>
    <div class="max-w-[400px] w-full mx-auto shadow-lg hover:shadow-2xl hover:scale-[1.01] cursor-pointer duration-300">
        <UNotifications />
        <div class="w-full h-[250px] relative">
            <NuxtImg class="w-full h-full absolute object-cover" :src="props.img" loading="lazy" />
        </div>
        <div class="p-5">
            <p class="mb-5 font-bold">{{ props.title }}</p>
            <div class="flex justify-between items-center">
                <BtnTextLg :isPrimaryCol="isUserEnrolled ? false : true" :text="isUserEnrolled ? 'Withdraw' : 'Enroll'"
                    :loadingSpinner="isLoading" @btn-click="courseOptionsTrigger()" />
                <p>{{ props.lessons }} Lessons</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import BtnTextLg from '@/components/common/btns/btn-text-lg.vue';
import { withdrawCourse } from '@/services/api/users/course';
import { enrollCourse } from '@/services/api/users/course';

const toast = useToast();
const router = useRouter();

const props = defineProps({

    id: {
        type: Number,
    },

    img: {
        type: String,
        default: ''
    },

    title: {
        type: String,
        default: 'This is a course title',
    },

    lessons: {
        type: Number,
        default: 10
    },

    isEnrolled: {
        type: Boolean,
        default: false
    }
});

const isLoading = ref(false);
const isUserEnrolled = ref(props.isEnrolled);

const courseOptionsTrigger = async () => {
    if (isUserEnrolled.value) {
        isLoading.value = true;
        try {
            const postData = {
                courseId: props.id
            };

            const response = await withdrawCourse(postData);
            toast.add({
                title: response.data.title,
                description: response.data.message,
                icon: 'i-heroicons-check-circle-solid',
                color: 'green',
            });
            isUserEnrolled.value = false;
        } catch (error) {
            if (error.response.status === 401) {
                router.push('/login');
            } else {
                toast.add({
                    title: error.response.data.title,
                    description: error.response.data.message,
                    icon: 'i-heroicons-exclamation-circle-solid',
                    color: 'orange',
                });
            }
        }
        isLoading.value = false;
    } else {
        isLoading.value = true;
        try {
            const postData = {
                courseId: props.id
            };
            const response = await enrollCourse(postData);
            toast.add({
                title: response.data.title,
                description: response.data.message,
                icon: 'i-heroicons-check-circle-solid',
                color: 'green',
            });
            isUserEnrolled.value = true;
        } catch (error) {
            if (error.response.status === 401) {
                router.push('/login');
            } else {
                toast.add({
                    title: error.response.data.title,
                    description: error.response.data.message,
                    icon: 'i-heroicons-exclamation-circle-solid',
                    color: 'orange',
                });
            }
        }
        isLoading.value = false;
    }
};

</script>
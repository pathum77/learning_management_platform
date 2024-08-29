<template>
    <div @click="courseEditPopupClose()"
        class="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 backdrop-blur-sm bg-[#00000038] z-10">
        <UNotifications />
        <LoadingSpinner :is-loading="isLoading" />
        <div @click.stop
            class="max-w-[700px] max-h-[80vh] w-full p-5 flex flex-col justify-start rounded-md relative bg-bg-light">
            <div class="h-[20px] mb-5">
                <div class="flex justify-end">
                    <button @click="courseEditPopupClose()">
                        <UIcon class="w-5 h-5" name="ic:baseline-close" dynamic />
                    </button>
                </div>
            </div>
            <div class="max-h-full overflow-y-auto">
                <div>
                    <div class="mb-5">
                        <p class="text-sm">Title</p>
                        <input v-model="name" class="w-full h-10 pl-2 text-sm border rounded-md" type="text" name="" id=""
                            placeholder="Enter the title of the course">
                        <p v-if="errors.name" class="text-sm text-red-600">{{ errors.name }}</p>
                    </div>
                    <div class="mb-5">
                        <p class="text-sm">Lesson Count</p>
                        <input v-model="lessonCount" class="w-full h-10 pl-2 text-sm border rounded-md" type="text" name=""
                            id="" placeholder="Enter the lesson count">
                        <p v-if="errors.lessonCount" class="text-sm text-red-600">{{ errors.lessonCount }}</p>
                    </div>
                    <div class="mb-5">
                            <label for="img"
                                class="w-[300px] h-[200px] border rounded-md cursor-pointer flex justify-center items-center overflow-hidden relative">
                                <Icon v-if="!imgURL" class="w-10 h-10 text-white"
                                    icon="material-symbols:add-a-photo-outline-rounded" />
                                <img v-else class="w-full h-full absolute object-cover" :src="imgURL" alt="">
                                <input class="w-0 opacity-0" type="file" name="" id="img" accept=".jpg, .jpeg, .png, .webp"
                                    @change="imgUpload()" ref="img">
                            </label>
                    </div>
                    <div class="mb-5">
                        <p class="text-sm">Description</p>
                        <textarea v-model="description" class="w-full p-2  text-sm border rounded-md" name="" id="" rows="5"
                            placeholder="Enter your description"></textarea>
                        <p v-if="errors.description" class="text-sm text-red-600">{{ errors.description }}</p>
                    </div>
                    <BtnTextSm class="mx-auto" text="Edit Course" @btn-click="edit()" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BtnTextSm from '../components/common/btns/btn-text-sm.vue';
import { updateCourse } from '@/services/api/admin/operations';
import LoadingSpinner from '~/components/common/loading-spinner.vue';

const toast = useToast();

const emits = defineEmits(['courseEditPopupClose']);

const props = defineProps({
    course: Object
});

const isLoading = ref(false);
const id = ref(props.course.id);
const name = ref(props.course.name);
const lessonCount = ref(props.course.lesson_count);
const description = ref(props.course.description);
const imgURL = ref(props.course.img);
const img = ref(null);
const imgFile = ref(null);

const errors = ref({
    name: '',
    lessonCount: '',
    description: '',
});

const imgUpload = () => {
    imgFile.value = img.value.files[0];
    imgURL.value = URL.createObjectURL(imgFile.value);
};

const edit = async () => {
    if(!name.value) {
        errors.value.name = 'Course title is required';
    } else {
        errors.value.name = '';
    }

    if(!lessonCount.value) {
        errors.value.lessonCount = 'Course lesson count is required';
    } else if (lessonCount.value < 1) {
        errors.value.lessonCount = 'Course lesson count must be greater than 0';
    } else {
        errors.value.lessonCount = '';
    }

    if(!description.value) {
        errors.value.description = 'Course description is required';
    } else {
        errors.value.description = '';
    }

    if(!errors.value.name && !errors.value.lessonCount && !errors.value.description) {
        isLoading.value = true;
        try {
            const formData = new FormData();
            formData.append('id', props.course.id);
            formData.append('name', name.value === props.course.name ? null : name.value);
            formData.append('lesson_count', lessonCount.value === props.course.lesson_count ? null : lessonCount.value);
            formData.append('description', description.value === props.course.description ? null : description.value);
            formData.append('img', imgFile.value); 
    
            const response = await updateCourse(formData);
            
            courseEditPopupClose(response.data);
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
};

const courseEditPopupClose = (response) => {
    emits('courseEditPopupClose', response);
};
</script>
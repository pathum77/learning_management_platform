<template>
    <div>
        <UNotifications />
        <LoadingSpinner :is-loading="isLoading" />
        <div>
            <TitleSm title="Add a New Course" />
            <div class="flex justify-center">
                <div class="max-w-[600px] w-full">
                    <InpText id="title" label="Course Title" v-model="password" placeholder="Enter the course title"
                        :error="errors.name" type="text" @inputFieldValueChanged="nameValueChanged" />
                    <InpText id="count" label="Lesson Count" v-model="lessonCount" placeholder="Enter the lesson count"
                        :error="errors.lessonCount" type="number" @inputFieldValueChanged="lessonCountValueChanged" />
                    <div class="mb-5">
                        <p>Image</p>
                        <label for="img"
                            class="w-[300px] h-[200px] border rounded-md cursor-pointer flex justify-center items-center overflow-hidden relative bg-white" :class="errors.imgURL ? 'border-red-600' : ''">
                            <UIcon v-if="!imgURL" class="w-10 h-10 text-gray-400"  name="material-symbols:add-a-photo-outline-rounded"
                                dynamic />
                            <img v-else class="w-full h-full absolute object-cover" :src="imgURL" alt="">
                            <input class="w-0 opacity-0" type="file" name="" id="img" accept=".jpg, .jpeg, .png, .webp"
                                @change="imgUpload()" ref="img">
                        </label>
                        <p v-if="errors.imgURL" class="text-red-600 text-sm">{{ errors.imgURL }}</p>
                    </div>
                    <div class="mb-5">
                        <p>Description</p>
                        <textarea class="w-full p-2 border rounded-sm" :class="errors.description ? 'border-red-600' : ''" v-model="description" name="" id="" rows="5" placeholder="Enter the description"></textarea>
                        <p v-if="errors.description" class="text-red-600 text-sm">{{ errors.description }}</p>
                    </div>
                    <BtnTextLg class="mx-auto" text="Add" @btn-click="add()" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import LoadingSpinner from '~/components/common/loading-spinner.vue';
import TitleSm from '@/components/common/titles/title-sm.vue';
import InpText from '../components/common/inp-text.vue';
import BtnTextLg from '@/components/common/btns/btn-text-lg.vue';
import { createCourse } from '@/services/api/admin/operations';

definePageMeta({
    layout: 'admin'
});

const toast = useToast();

const isLoading = ref(false);
const name = ref('');
const lessonCount = ref('');
const description = ref('');
const img = ref(null);
const imgFile = ref('');
const imgURL = ref('');
const errors = ref({
    name: '',
    lessonCount: '',
    description: '',
    imgURL: '',
});

const nameValueChanged = (val) => {
    name.value = val;
    errors.value.name = '';
};

const lessonCountValueChanged = (val) => {
    lessonCount.value = val;
    errors.value.lessonCount = '';
};

const imgUpload = () => {
    imgFile.value = img.value.files[0];
    imgURL.value = URL.createObjectURL(imgFile.value);
};

const add = async () => {
    if(!name.value) {
        errors.value.name = 'Course title is required';
    } else {
        errors.value.name = '';
    }

    if(!lessonCount.value) {
        errors.value.lessonCount = 'Course lesson count is required';
    } else if (lessonCount.value < 1) {
        errors.value.lessonCount = 'Course lesson count must be greater than 0';
    }
    
    else {
        errors.value.lessonCount = '';
    }

    if(!description.value) {
        errors.value.description = 'Course description is required';
    } else {
        errors.value.description = '';
    }

    if(!imgFile.value) {
        errors.value.imgURL = 'Course image is required';
    } else {
        errors.value.imgURL = '';
    }

    isLoading.value = true;
    try {
        if(errors.value.name === '' && errors.value.lessonCount === '' && errors.value.description === '' && errors.value.imgURL === '') {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('lesson_count', lessonCount.value);
            formData.append('description', description.value);
            formData.append('img', imgFile.value);

            const response = await createCourse(formData);
            toast.add({
                title: response.data.title,
                description: response.data.message,
                icon: 'i-heroicons-check-circle-solid',
                color: 'green',
            });

            name.value = '';
            lessonCount.value = '';
            description.value = '';
            img.value.value = null;
            imgURL.value = '';
            errors.value = {
                name: '',
                lessonCount: '',
                description: '',
                imgURL: '',
            };
        }
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

</script>
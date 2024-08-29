<template>
    <div class="container min-h-screen grid place-items-center">
        <LoadingSpinner :is-loading="isLoading" />
        <UNotifications />
        <div class="max-w-[500px] w-full p-10 rounded-md flex flex-col items-center bg-[#f9f9f9]">
            <nuxt-link to="/">
                <div class="w-[100px] mb-10 flex-shrink-0 flex items-center">
                    <img src="../../public/public-assets/logo/logo-sample.png" alt="">
                </div>
            </nuxt-link>
            <p class="text-3xl font-bold">Welcome Back!</p>
            <p class="mb-10 text-sm text-gray-500">Please login as an admin</p>
            <InpText id="username" label="Username" v-model="username" placeholder="Enter your username" :error="errors.username"
                @inputFieldValueChanged="usernameValueChanged" />
            <InpText id="password" label="Password" v-model="password" placeholder="Enter your password"
                :error="errors.password" type="password" @inputFieldValueChanged="passwordValueChanged" />
            <BtnTextSm text="Login" @btn-click="loginUser()" />
        </div>
    </div>
</template>

<script setup>
import InpText from '../components/common/inp-text.vue';
import BtnTextSm from '../components/common/btns/btn-text-sm.vue';
import { login } from '../services/api/admin/operations';
import LoadingSpinner from '~/components/common/loading-spinner.vue';
import { useAuthStore } from '~/store/index.js';

const toast = useToast();
const authStore = process.client ? useAuthStore() : null;
const router = useRouter();

const isLoading = ref(false);
const username = ref('');
const password = ref('');
const errors = ref({
    username: '',
    password: ''
});

const usernameValueChanged = (val) => {
    username.value = val;
    errors.value.username = '';
};

const passwordValueChanged = (val) => {
    password.value = val;
    errors.value.password = '';
};

const loginUser = async () => {
    if (username.value === '') {
        errors.value.username = 'Username is required!';
    } else {
        errors.value.username = '';
    }

    if (password.value === '') {
        errors.value.password = 'Password is required!';
    } else {
        errors.value.password = '';
    }

    if (errors.value.username === '' && errors.value.password === '') {
        try {
            const response = await login(username.value, password.value);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    if (errors.value.username === '' && errors.value.password === '') {
        isLoading.value = true;
        try {
            const postData = {
                username: username.value,
                password: password.value
            };

            const response = await login(postData);
            authStore.adminLogin(response.data.token);
            router.push('/admin/manage-course');

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

</script>
<template>
    <div class="container min-h-screen grid place-items-center">
        <LoadingSpinner :is-loading="isLoading" />
        <UNotifications />
        <div class="max-w-[500px] w-full p-10 rounded-md flex flex-col items-center bg-[#f9f9f9]">
            <nuxt-link to="/">
                <div class="w-[100px] mb-10 flex-shrink-0 flex items-center">
                    <img src="../public/public-assets/logo/logo-sample.png" alt="">
                </div>
            </nuxt-link>
            <p class="text-3xl font-bold">Welcome Back!</p>
            <p class="mb-10 text-sm text-gray-500">Please login to your account</p>
            <InpText id="email" label="Email" v-model="email" placeholder="Enter your email" :error="errors.email"
                @inputFieldValueChanged="emailValueChanged" />
            <InpText id="password" label="Password" v-model="password" placeholder="Enter your password"
                :error="errors.password" type="password" @inputFieldValueChanged="passwordValueChanged" />
            <BtnTextSm text="Login" @btn-click="loginUser()" />
            <p class="text-sm mt-5">Don't have an account? <nuxt-link to="/register" class="text-prim">Register</nuxt-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import InpText from '../components/common/inp-text.vue';
import BtnTextSm from '../components/common/btns/btn-text-sm.vue';
import { login } from '../services/api/users/auth';
import LoadingSpinner from '~/components/common/loading-spinner.vue';
import { useAuthStore } from '~/store/index.js';

const toast = useToast();
const authStore = process.client ? useAuthStore() : null;
const router = useRouter();

const isLoading = ref(false);
const email = ref('');
const password = ref('');
const errors = ref({
    email: '',
    password: ''
});

const emailValueChanged = (val) => {
    email.value = val;
    errors.value.email = '';
};

const passwordValueChanged = (val) => {
    password.value = val;
    errors.value.password = '';
};

const loginUser = async () => {
    if (email.value === '') {
        errors.value.email = 'Email is required!';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        errors.value.email = 'Invalid email!';
    } else {
        errors.value.email = '';
    }

    if (password.value === '') {
        errors.value.password = 'Password is required!';
    } else {
        errors.value.password = '';
    }

    if (errors.value.email === '' && errors.value.password === '') {
        try {
            const response = await login(email.value, password.value);
            console.log(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    if (errors.value.email === '' && errors.value.password === '') {
        isLoading.value = true;
        try {
            const postData = {
                email: email.value,
                password: password.value
            };

            const response = await login(postData);
            authStore.userLogin(response.data.token);
            router.push('/');

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
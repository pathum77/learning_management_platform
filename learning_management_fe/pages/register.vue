<template>
    <div class="container min-h-screen grid place-items-center">
        <div class="max-w-[500px] w-full p-10 rounded-md flex flex-col items-center bg-[#f9f9f9]">
            <LoadingSpinner :is-loading="isLoading" />
            <UNotifications />
            <nuxt-link to="/">
                <div class="w-[100px] mb-10 flex-shrink-0 flex items-center">
                <img src="../public/public-assets/logo/logo-sample.png" alt="">
            </div>
            </nuxt-link>
            <p class="text-3xl font-bold">Welcome!</p>
            <p class="mb-10 text-sm text-gray-500">Please create an account</p>
            <div class="grid grid-cols-2 gap-5">
                <InpText id="firstName" label="First Name" v-model="email" placeholder="Enter your first name" :error="errors.firstName" type="text" @inputFieldValueChanged="fNameValueChanged" />
                <InpText id="lastName" label="Last Name" v-model="email" placeholder="Enter your last name" :error="errors.lastName" type="text" @inputFieldValueChanged="lNameValueChanged" />
            </div>
            <InpText id="email" label="Email" v-model="email" placeholder="Enter your email" :error="errors.email" type="email" @inputFieldValueChanged="emailValueChanged" />
            <InpText id="password" label="Password" v-model="password" placeholder="Enter your password" :error="errors.password" type="password" @inputFieldValueChanged="passwordValueChanged" />
            <BtnTextSm text="Register" @btn-click="registerUser()" />
            <p class="text-sm mt-5">Already have an account? <nuxt-link to="/login" class="text-prim">Login</nuxt-link></p>
        </div>
    </div>
</template>

<script setup>
import InpText from '../components/common/inp-text.vue';
import BtnTextSm from '../components/common/btns/btn-text-sm.vue';
import { register } from '../services/api/users/auth';
import LoadingSpinner from '~/components/common/loading-spinner.vue';
import { useAuthStore } from '~/store/index.js';

const toast = useToast();
const authStore = process.client ? useAuthStore() : null;
const router = useRouter();

const isLoading = ref(false);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const errors = ref({
    firstName: '',
    lastName: '',
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

const fNameValueChanged = (val) => {
    firstName.value = val;
    errors.value.firstName = '';
};

const lNameValueChanged = (val) => {
    lastName.value = val;
    errors.value.lastName = '';
};

const registerUser = async () => {

    if (firstName.value === '') {
        errors.value.firstName = 'First name is required!';
    } else {
        errors.value.firstName = '';
    }

    if (lastName.value === '') {
        errors.value.lastName = 'Last name is required!';
    } else {
        errors.value.lastName = '';
    }


    if (email.value === '') {
        errors.value.email = 'Email is required!';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        errors.value.email = 'Invalid email!';
    } else {
        errors.value.email = '';
    }

    if (password.value === '') {
        errors.value.password = 'Password is required!';
    } else if(password.value.length < 6) {
        errors.value.password = 'Password must be at least 6 characters';
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

    if (errors.value.firstName === '' && errors.value.lastName === '' && errors.value.email === '' && errors.value.password === '') {
        isLoading.value = true;
        try {
            const postData = {
                first_name: firstName.value,
                last_name: lastName.value,
                email: email.value,
                password: password.value
            };

            const response = await register(postData);
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
<template>
    <div>
        <UNotifications />
        <LoadingSpinner :is-loading="isLoading" />
        <div>
            <TitleSm title="Manage Students" />
            <div>
                <table class="min-w-[700px] w-full">
                    <tr>
                        <th class="px-2 py-4 text-center bg-white">Student ID</th>
                        <th class="px-2 py-4 text-center bg-white">First Name</th>
                        <th class="px-2 py-4 text-center bg-white">Last Name</th>
                        <th class="px-2 py-4 text-center bg-white">Options</th>
                    </tr>
                    <tr v-for="(user, index) in users" :key="index" @click="orderDetailsPopupOpen(index)"
                        class="border-b border-gray-200 dark:border-gray-600 cursor-pointer">
                        <td class="px-2 py-3 text-sm text-center">{{ user.id }}</td>
                        <td class="px-2 py-3 text-sm text-center">{{ user.first_name }}</td>
                        <td class="px-2 py-3 text-sm text-center">{{ user.last_name }}</td>
                        <td class="px-2 py-3 flex justify-center">
                            <button @click="deleteAUser(user.id)"
                            class="w-7 h-7 rounded-md grid place-items-center bg-red-600">
                            <UIcon class="w-5 h-5 text-white" name="ic:baseline-delete" dynamic />
                        </button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import LoadingSpinner from '~/components/common/loading-spinner.vue';
import TitleSm from '@/components/common/titles/title-sm.vue';
import { getUsers, deleteUser } from '@/services/api/admin/operations';
import Swal from 'sweetalert2';

definePageMeta({
    layout: 'admin'
});

const toast = useToast();

const isLoading = ref(false);
const users = ref([]);

onMounted(() => {
    getAllUsers();
})

const getAllUsers = async () => {
    isLoading.value = true;
    try {
        const response = await getUsers();
        users.value = response.data.users;
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

const deleteAUser = (id) => {
    Swal.fire({
        title: "Confirmation",
        text: `Are you sure you want to delete this student account?`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonColor: 'red',
        confirmButtonColor: '#00D2B5',
    }).then(async (result) => {
        if (result.isConfirmed) {
            isLoading.value = true;
            try {
                const response = await deleteUser(id);
                toast.add({
                    title: response.data.title,
                    description: response.data.message,
                    icon: 'i-heroicons-check-circle-solid',
                    color: 'green',
                });
                isLoading.value = false;
                getAllUsers();            
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
    })
}

</script>
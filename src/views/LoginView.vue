<template>
    <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl font-bold text-center mb-4">Đăng Nhập</h2>
        <form @submit.prevent="handleLogin" class="space-y-4">
            <input v-model="username" type="text" placeholder="Tên đăng nhập" required
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <input v-model="password" type="password" placeholder="Mật khẩu" required
                class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <button type="submit"
                class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">Đăng Nhập</button>

            <p class="text-center text-gray-600">Chưa có tài khoản?
                <router-link to="/register" class="text-blue-500 hover:underline">Đăng ký</router-link>
            </p>

            <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { login } from "../api/authApi";

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async handleLogin() {
            try {
                await login(this.username, this.password);
                this.$router.push("/my-info");
            } catch (error) {
                this.errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng!";
            }
        },
    },
};
</script>

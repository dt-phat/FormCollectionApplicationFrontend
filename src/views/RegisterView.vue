<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-gray-800">Đăng Ký</h1>
        <form @submit.prevent="handleRegister" class="mt-4 space-y-4">
            <div>
                <label for="firstname" class="block text-sm font-medium text-gray-700">Tên của bạn</label>
                <input id="firstname" v-model="firstName" type="text" required
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label for="lastname" class="block text-sm font-medium text-gray-700">Họ đệm của bạn</label>
                <input id="lastname" v-model="lastName" type="text" required
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                <input id="username" v-model="username" type="text" required
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <input id="password" v-model="password" type="password" required
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label for="dob" class="block text-sm font-medium text-gray-700">Ngày sinh</label>
                <input id="dob" v-model="dob" type="date"
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit"
                class="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">Đăng
                Ký</button>
            <p class="text-center mt-2 text-gray-600">Đã có tài khoản? <router-link to="/login"
                    class="text-blue-500">Đăng nhập</router-link></p>
            <p v-if="errorMessage" class="text-red-500 text-center mt-2 text-sm">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { register } from "../api/authApi";

export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            dob: "2000-01-01",
            errorMessage: "",
        };
    },
    methods: {
        async handleRegister() {
            this.errorMessage = "";

            if (this.username.length < 4) {
                this.errorMessage = "Tên đăng nhập phải ít nhất 4 ký tự";
                return;
            }
            if (this.password.length < 6) {
                this.errorMessage = "Mật khẩu phải có ít nhất 6 ký tự";
                return;
            }

            try {
                await register(this.username, this.password, this.firstName, this.lastName, this.dob);
                alert("Đăng ký thành công!");
                this.$router.push("/login");
            } catch (error) {
                this.errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
            }
        },
    },
};
</script>
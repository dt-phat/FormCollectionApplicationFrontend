<template>
    <nav class="w-full bg-white shadow-lg px-8 py-3 flex items-center top-0 left-0 z-50 border-b border-gray-200">
        <!-- Logo -->
        <div class="flex items-center space-x-3 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md mr-6">
            <button class="text-white hover:bg-indigo-700 p-2 rounded-full focus:outline-none lg:hidden">
                <i class="fas fa-bars text-xl"></i>
            </button>
            <router-link to="/" class="flex text-lg font-semibold items-center p-2">
                <i class="fa-brands fa-google text-xl mr-2"></i>
                <span class="text-xl font-bold tracking-wider">MYFORMS</span>
            </router-link>
        </div>

        <!-- Menu Links -->
        <div class="flex space-x-4">
            <div class="w-50 bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600">
                <router-link to="/project" class="flex items-center text-lg font-semibold">
                    <i class="fa-solid fa-diagram-project mr-2"></i>
                    <span>Dự Án</span>
                </router-link>
            </div>
            <div class="w-50 bg-purple-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-purple-600">
                <router-link to="/form" class="flex items-center text-lg font-semibold">
                    <i class="fa-regular fa-folder-open mr-2"></i>
                    <span>Form Đã Điền</span>
                </router-link>
            </div>
            <!-- button user chỉ hiện khi là admin -->
            <div v-if="tendangnhap === 'admin'" class="w-50 bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600">
                <router-link to="/users" class="flex items-center text-lg font-semibold">
                    <i class="fa-solid fa-users mr-2"></i>
                    <span>Người Dùng</span>
                </router-link>
            </div>
        </div>

        <!-- User Actions -->
        <div class="flex items-center space-x-4 ml-auto">
            <router-link v-if="!user" to="/login"
                class="px-5 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium transition duration-300 hover:bg-indigo-700 shadow-md">
                Đăng Nhập
            </router-link>
            <router-link v-if="!user" to="/register"
                class="px-5 py-2 bg-green-600 text-white rounded-full text-sm font-medium transition duration-300 hover:bg-green-700 shadow-md">
                Đăng Ký
            </router-link>
            <div v-else class="relative">
                <button @click="toggleMenu"
                    class="flex items-center px-5 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
                    <i class="fa-solid fa-user mr-2"></i> {{ user.username }}
                </button>
                <div v-if="menuOpen"
                    class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <router-link to="/profile"
                        class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300">Xem thông
                        tin</router-link>
                    <button @click="logout"
                        class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300">Đăng
                        xuất</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { getUserInfo } from '../api/infoApi';

export default {
    name: "Navbar",
    data() {
        return {
            user: null,
            menuOpen: false,
            tendangnhap: null,
        };
    },
    async mounted() {
        await this.loadUser();
    },
    methods: {
        async loadUser() {
            const token = localStorage.getItem('token');
            if (token) {
                this.user = await getUserInfo();
            }
            this.tendangnhap = localStorage.getItem("tendangnhap") || null;
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        logout() {
            localStorage.removeItem('token'); 
            localStorage.removeItem("tendangnhap"); // xóa tendangnhap khỏi local Storage
            this.user = null;
            this.menuOpen = false;
            this.$router.push('/');
            window.location.reload();
        }
    }
};
</script>
<style></style>
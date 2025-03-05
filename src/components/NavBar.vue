<template>
    <nav class="bg-white shadow-md p-3 flex items-center justify-between top-0 left-0 w-full z-50">
        <!-- Logo + Tên -->
        <div class="flex items-center space-x-3">
            <button class="text-gray-700 hover:bg-gray-200 p-2 rounded-full focus:outline-none lg:hidden">
                <i class="fas fa-bars text-xl"></i>
            </button>
            <router-link to="/" class="flex text-2xl font-semibold text-purple-600 items-center">
                <i class="fa-solid fa-table-list mr-2"></i> MyForms
            </router-link>
        </div>

        <!-- Ô tìm kiếm -->
        <div class="hidden lg:flex items-center w-full max-w-md bg-gray-100 px-4 py-2 rounded-full shadow-sm">
            <i class="fas fa-search text-gray-500"></i>
            <input type="text" placeholder="Search..." class="w-full bg-transparent outline-none px-2 text-gray-700" />
        </div>

        <!-- Điều hướng + Avatar -->
        <div class="flex items-center space-x-4 relative">
            <router-link v-if="!user" to="/login"
                class="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm font-medium transition">
                Đăng Nhập
            </router-link>
            <router-link v-if="!user" to="/register"
                class="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm font-medium transition">
                Đăng Ký
            </router-link>
            <div v-else class="relative">
                <button @click="toggleMenu"
                    class="text-gray-700 font-semibold px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
                    {{ user.username }}
                </button>
                <div v-if="menuOpen"
                    class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Xem
                        thông tin</router-link>
                    <button @click="logout"
                        class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Đăng
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
            menuOpen: false
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
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
        },
        logout() {
            localStorage.removeItem('token');
            this.user = null;
            this.menuOpen = false;
            this.$router.push('/');
        }
    }
};
</script>

<style scoped></style>

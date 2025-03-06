<template>
    <nav class="w-50 bg-white shadow-md px-8 py-2 flex items-center top-0 left-0 w-full z-50">
        <div class="flex items-center space-x-3 bg-indigo-600 text-white px-4 py-1 rounded-lg shadow-md mr-8">
            <button class="text-white hover:bg-indigo-700 p-2 rounded-full focus:outline-none lg:hidden">
                <i class="fas fa-bars text-xl"></i>
            </button>
            <router-link to="/" class="flex text-lg font-semibold items-center p-2">
                <i class="fa-brands fa-google text-xl mr-2"></i>
                <span class="text-xl font-bold tracking-wider">MYFORMS</span>
            </router-link>
        </div>

        <div class="w-50 flex items-center space-x-2 bg-red-600 text-white px-4 py-1 rounded-lg shadow-md mr-8">
            <router-link to="/project" class="flex text-lg font-semibold items-center p-2">
                <i class="fa-solid fa-diagram-project mr-2"></i>
                <span class="text-xl font-bold tracking-wider">Dự Án</span>
            </router-link>
        </div>

        <div class="w-50 flex items-center space-x-2 bg-purple-600 text-white px-4 py-1 rounded-lg shadow-md mr-5">
            <router-link to="/form" class="flex text-lg font-semibold items-center p-2">
                <i class="fa-regular fa-folder-open mr-2"></i>
                <span class="text-xl font-bold tracking-wider">
                    Điền Form
                </span>
            </router-link>
        </div>


        <div class="flex items-center space-x-4 relative ml-auto">
            <router-link v-if="!user" to="/login"
                class="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium transition duration-300 hover:bg-indigo-700">
                Đăng Nhập
            </router-link>
            <router-link v-if="!user" to="/register"
                class="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium transition duration-300 hover:bg-indigo-700">
                Đăng Ký
            </router-link>
            <div v-else class="relative">
                <button @click="toggleMenu"
                    class="flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md transition duration-300 hover:bg-gray-200">
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
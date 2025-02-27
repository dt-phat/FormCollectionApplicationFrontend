<template>
    <nav class="bg-white shadow-md p-3 flex items-center justify-between fixed top-0 left-0 w-full z-50">
        <!-- Logo + Tên -->
        <div class="flex items-center space-x-3">
            <button class="text-gray-700 hover:bg-gray-200 p-2 rounded-full focus:outline-none lg:hidden">
                <i class="fas fa-bars text-xl"></i> <!-- Biểu tượng menu -->
            </button>
            <router-link to="/" class="flex text-2xl font-semibold text-purple-600 items-center">
                <i class="fa-solid fa-table-list mr-2"></i> MyForms
            </router-link>
        </div>

        <!-- Ô tìm kiếm -->
        <div class="hidden lg:flex items-center w-full max-w-md bg-gray-100 px-4 py-2 rounded-full">
            <i class="fas fa-search text-gray-500"></i>
            <input type="text" placeholder="Search..." class="w-full bg-transparent outline-none px-2 text-gray-700" />
        </div>

        <!-- Điều hướng + Avatar -->
        <div class="flex items-center space-x-4">
            <router-link v-if="!user" to="/login" class="nav-button bg-purple-600 hover:bg-purple-700">
                Đăng Nhập
            </router-link>
            <router-link v-if="!user" to="/register" class="nav-button bg-purple-600 hover:bg-purple-700">
                Đăng Ký
            </router-link>
            <img v-else src="https://via.placeholder.com/40" alt="User Avatar"
                class="w-10 h-10 rounded-full border border-gray-300">
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {
            user: null,
        };
    }
};
</script>

<style scoped>
.nav-button {
    text-decoration: none;
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.3s ease-in-out;
}
</style>

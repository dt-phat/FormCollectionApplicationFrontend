<template>
    <div class="container mx-auto p-6 bg-gray-50 min-h-screen flex flex-col items-center">
        <div class="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
            <h1
                class="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700 uppercase tracking-wide py-2">
                Quản lý Dự Án
            </h1>

            <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div class="w-full md:w-2/3 flex bg-gray-100 rounded-lg p-2">
                    <input v-model="searchQuery" type="text" placeholder="Nhập tên dự án cần tìm"
                        class="w-full p-3 bg-transparent focus:outline-none text-gray-700" />
                    <button @click="filterProjects"
                        class="w-40 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition hover:scale-105">
                        <i class="fa-solid fa-magnifying-glass mr-2"></i> Tìm kiếm
                    </button>
                </div>
                <button @click="showProjectForm = !showProjectForm"
                    class="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition shadow-md hover:scale-105">
                    <i class="fa-solid fa-plus mr-2"></i> Tạo Dự Án
                </button>
            </div>

            <div v-if="showProjectForm" class="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-300">
                <h2 class="text-xl font-semibold text-gray-800 border-l-4 border-indigo-500 pl-3 mb-4">Tạo Dự Án Mới
                </h2>
                <input v-model="newProject.name" type="text" placeholder="Tên dự án"
                    class="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500">
                <textarea v-model="newProject.description" placeholder="Mô tả dự án"
                    class="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500"></textarea>
                <div class="flex gap-3">
                    <button @click="addProject"
                        class="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
                        Lưu Dự Án
                    </button>
                    <button @click="showProjectForm = false"
                        class="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
                        <i class="fa-solid fa-xmark mr-2"></i> Hủy Dự Án
                    </button>
                </div>
            </div>

            <ul class="space-y-6">
                <li v-for="project in filteredProjects" :key="project.id"
                    class="p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition border-l-4 border-indigo-500">
                    <h2 class="text-xl font-semibold text-gray-800">{{ project.name }}</h2>
                    <p class="text-gray-600 mt-2">{{ project.description }}</p>
                    <div class="flex gap-3 mt-4">
                        <button @click="viewProject(project.id)"
                            class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
                            <i class="fa-solid fa-eye mr-2"></i> Xem Dự Án
                        </button>
                        <button @click="deleteProject(project.id)"
                            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            <i class="fa-solid fa-trash mr-2"></i> Xóa Dự Án
                        </button>
                    </div>
                </li>
            </ul>
        </div>

        <div v-if="showToast"
            class="fixed bottom-5 right-5 flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl transition-transform duration-500 transform scale-95 animate-fade-in-out">
            <i class="fa-solid fa-circle-check text-2xl"></i>
            <span class="font-medium text-lg">Tạo dự án thành công!</span>
        </div>

        <div v-if="showDeleteToast"
            class="fixed bottom-5 right-5 w-96 bg-red-600 text-white px-6 py-4 rounded-lg shadow-xl transition-transform duration-500 transform scale-95">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-exclamation-circle text-2xl"></i>
                <span class="font-medium text-lg">Bạn có chắc chắn muốn xóa?</span>
            </div>
            <div class="flex justify-end gap-3 mt-3">
                <button @click="confirmDeleteProject"
                    class="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition shadow-md hover:scale-105">
                    Xác nhận
                </button>
                <button @click="showDeleteToast = false"
                    class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition shadow-md hover:scale-105">
                    Hủy
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllProjects, createProject, deleteProject } from '../../api/projectApi';

export default {
    data() {
        return {
            searchQuery: "",
            showProjectForm: false,
            newProject: { name: "", description: "" },
            projects: [],
            showToast: false,
            showDeleteToast: false,
            deleteProjectId: null,
        };
    },
    computed: {
        filteredProjects() {
            return this.projects.filter(project =>
                project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async getAllProjects() {
            this.projects = await getAllProjects();
        },
        addProject() {
            if (this.newProject.name.trim() && this.newProject.description.trim()) {
                createProject({ name: this.newProject.name, description: this.newProject.description });
                this.showToast = true;
                setTimeout(() => {
                    this.showToast = false;
                    this.$router.go(0);
                }, 500);
            }
        },
        viewProject(id) {
            this.$router.push(`/project/${id}`);
        },
        deleteProject(id) {
            this.deleteProjectId = id;
            this.showDeleteToast = true;
        },
        async confirmDeleteProject() {
            if (this.deleteProjectId) {
                await deleteProject(this.deleteProjectId);
                this.showDeleteToast = false;
                setTimeout(() => {
                    this.$router.go(0);
                }, 500);
            }
        },
    },
    mounted() {
        this.getAllProjects();
    }
};
</script>

<style scoped>
/* Animation cho toast */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
        transform: translateX(50px);
    }

    20% {
        opacity: 1;
        transform: translateX(0);
    }

    80% {
        opacity: 1;
        transform: translateX(0);
    }

    100% {
        opacity: 0;
        transform: translateX(50px);
    }
}

.animate-fade-in-out {
    animation: fadeInOut 1.5s ease-in-out;
}
</style>

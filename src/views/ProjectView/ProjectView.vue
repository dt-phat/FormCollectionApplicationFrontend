<template>
    <div class="container mx-auto p-6 bg-gray-50 min-h-screen flex flex-col items-center">
        <div class="w-full max-w-4xl bg-white shadow-md rounded-xl p-6">
            <h1 class="text-3xl font-medium text-gray-800 text-center mb-6">Quản lý Dự Án</h1>

            <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div class="w-165 flex bg-gray-100 rounded-lg p-2">
                    <input v-model="searchQuery" type="text" placeholder="Nhập tên dự án cần tìm"
                        class="w-full p-3 bg-transparent focus:outline-none text-gray-700" />
                    <button @click="filterProjects"
                        class="w-40 bg-red-600 text-white  rounded-lg hover:text-gray-900 transition">
                        🔍 Tìm kiếm
                    </button>
                </div>
                <button @click="showProjectForm = !showProjectForm"
                    class="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
                    + Tạo Dự Án
                </button>
            </div>

            <div v-if="showProjectForm" class="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-300">
                <h2 class="text-xl font-medium text-gray-800 mb-4">Tạo Dự Án Mới</h2>
                <input v-model="newProject.name" type="text" placeholder="Tên dự án"
                    class="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none">
                <textarea v-model="newProject.description" placeholder="Mô tả dự án"
                    class="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none"></textarea>
                <div class="flex gap-3">
                    <button @click="addProject"
                        class="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
                        Lưu
                    </button>
                    <button @click="showProjectForm = false"
                        class="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
                        Hủy
                    </button>
                </div>
            </div>

            <ul class="space-y-6">
                <li v-for="project in filteredProjects" :key="project.id"
                    class="p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition">
                    <h2 class="text-xl font-medium text-gray-800">{{ project.name }}</h2>
                    <p class="text-gray-600 mt-2">{{ project.description }}</p>
                    <div class="flex gap-3 mt-4">
                        <button @click="viewProject(project.id)"
                            class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purle-600 transition">
                            Xem Dự Án
                        </button>
                        <button @click="deleteProject(project.id)"
                            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Xóa Dự Án
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "",
            showProjectForm: false,
            newProject: { name: "", description: "" },
            projects: [
                { id: 1, name: "Dự án A", description: "Mô tả dự án A" },
                { id: 2, name: "Dự án B", description: "Mô tả dự án B" },
                { id: 3, name: "Dự án C", description: "Mô tả dự án C" },
            ],
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
        addProject() {
            if (this.newProject.name.trim() && this.newProject.description.trim()) {
                this.projects.push({
                    id: this.projects.length + 1,
                    name: this.newProject.name,
                    description: this.newProject.description
                });
                this.newProject.name = "";
                this.newProject.description = "";
                this.showProjectForm = false;
            }
        },
        viewProject(id) {
            this.$router.push(`/project/${id}`);
        },
        deleteProject(id) {
            this.projects = this.projects.filter(project => project.id !== id);
        },
        filterProjects() {
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 1000px;
}
</style>

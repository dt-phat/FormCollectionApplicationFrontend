<template>
    <div class="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">

        <div class="mb-4">
            <div class="mb-2">
                <label for="projectName" class="text-2xl font-semibold text-gray-900">Tên Dự Án: </label>
                <input id="projectName" class="text-2xl font-semibold text-gray-900" value="Tên Của Dự Án"
                    :disabled="!editProject" />
            </div>
            <div>
                <label for="projectDescription" class="block text-2xl font-semibold text-gray-900">Mô Tả Dự Án: </label>
                <input id="projectDescription" class="text-2xl text-gray-900 mt-2" value="Mô Tả cho Dự Án"
                    :disabled="!editProject" />
            </div>
        </div>

        <div class="mb-4">
            <button v-if="!editProject" @click="editProject = true"
                class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
                <i class="fa-solid fa-pen-to-square mr-2"></i> Chỉnh Sửa
            </button>
            <button v-if="editProject" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <i class="fa-solid fa-file-lines mr-2"></i> Lưu Thông Tin
            </button>
            <button v-if="editProject"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition ml-4">
                <i class="fa-solid fa-xmark mr-2"></i> Hủy Thay Đổi
            </button>
        </div>

        <!-- Search & Create Project -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div class="flex w-full md:w-auto items-center bg-gray-100 p-2 rounded-lg shadow-sm">
                <input v-model="searchQuery" type="text" placeholder="Nhập tên dự án cần tìm"
                    class="flex-grow p-2 bg-transparent outline-none border-none text-gray-700" />
                <button @click="filterProjects"
                    class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                    <i class="fa-solid fa-magnifying-glass mr-2"></i> Tìm Kiếm
                </button>
            </div>

            <router-link to="/"
                class=" bg-green-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-800 transition">
                + Tạo Form
            </router-link>
        </div>

        <!-- Danh sách dự án -->
        <ul class="space-y-4">
            <li v-for="project in filteredProjects" :key="project.id"
                class="p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 class="text-2xl font-semibold text-gray-900">{{ project.name }}</h2>
                <p class="text-gray-600 mt-2">{{ project.description }}</p>
                <div class="flex gap-3 mt-4">
                    <button @click="viewProject(project.id)"
                        class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
                        👁 Xem Form
                    </button>
                    <button @click="deleteProject(project.id)"
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        🗑 Xóa Form
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    data() {
        return {
            searchQuery: "",
            showProjectForm: false,
            newProject: { name: "", description: "" },
            editProject: false,
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
    max-width: 900px;
    margin: 0 auto;
}
</style>
<template>
    <div class="max-w-4xl mx-auto p-8 bg-gray-300 min-h-screen">

        <!-- Thông tin dự án -->
        <div class="bg-white shadow-lg rounded-xl p-6 w-full mx-auto">
            <div class="mb-6">
                <label for="projectName" class="text-lg font-semibold text-gray-900 block">Tên Dự Án:</label>
                <input id="projectName"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg text-gray-900 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    :class="{ 'bg-white': editProject }" :value="project.name" :disabled="!editProject" />

                <label for="projectDescription" class="text-lg font-semibold text-gray-900 block mt-4">Mô Tả Dự
                    Án:</label>
                <textarea id="projectDescription"
                    class="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg text-gray-900 bg-gray-100 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    :class="{ 'bg-white': editProject }" :value="project.description"
                    :disabled="!editProject"></textarea>
            </div>

            <div class="flex justify-end gap-4">
                <button v-if="!editProject" @click="editProject = true"
                    class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition shadow-md flex items-center">
                    <i class="fa-solid fa-pen-to-square mr-2"></i> Chỉnh Sửa
                </button>
                <button v-if="editProject"
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center">
                    <i class="fa-solid fa-file-lines mr-2"></i> Lưu Thông Tin
                </button>
                <button v-if="editProject" @click="cancelEditProject"
                    class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md flex items-center">
                    <i class="fa-solid fa-xmark mr-2"></i> Hủy Thay Đổi
                </button>
            </div>
        </div>

        <!-- Tìm kiếm & Tạo Form -->
        <div class="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md mt-6">
            <div class="flex w-full md:w-auto items-center bg-gray-100 p-2 rounded-lg shadow-sm">
                <input v-model="searchQuery" type="text" placeholder="Nhập tên biểu mẫu cần tìm"
                    class="flex-grow w-100 p-2 bg-transparent outline-none border-none text-gray-700" />
                <button @click="filterProjects"
                    class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                    <i class="fa-solid fa-magnifying-glass mr-2"></i> Tìm Kiếm
                </button>
            </div>

            <router-link :to="`/project/${projectId}/create-form`"
                class="mt-3 md:mt-0 bg-green-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-800 transition">
                <i class="fa-solid fa-plus mr-2"></i> Tạo Form
            </router-link>
        </div>

        <!-- Danh sách form -->
        <ul class="space-y-4 mt-6">
            <li v-for="form in project.forms" :key="form.id"
                class="p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition hover:scale-105">
                <h2 class="text-2xl font-semibold text-gray-900">{{ form?.name }}</h2>
                <p class="text-gray-600 mt-2">{{ form?.introduction }}</p>
                <div class="flex gap-3 mt-4">
                    <button @click="viewForm(form.id)"
                        class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition">
                        👁 Xem Form
                    </button>
                    <button @click="deleteForm(form.id)"
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        🗑 Xóa Form
                    </button>
                </div>
            </li>
        </ul>

    </div>
</template>


<script>
import { getUserProject } from '../../api/projectApi';
export default {
    props: {
        projectId: String,
    },
    data() {
        return {
            searchQuery: "",
            showProjectForm: false,
            newProject: { name: "", description: "" },
            editProject: false,
            project: {

            }
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
        async getProject() {
            this.project = await getUserProject(this.projectId);
        },
        cancelEditProject() {
            this.editProject = false;
            this.getProject();
        },
        addFrom() {
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
        viewForm(id) {
            this.$router.push(`/form/${id}`);
        },
        deleteForm(id) {
            this.projects = this.projects.filter(project => project.id !== id);
        },
        filterForm() {

        }
    },
    mounted() {
        this.getProject();
    }
};
</script>

<style scoped>
.container {
    max-width: 900px;
    margin: 0 auto;
}
</style>
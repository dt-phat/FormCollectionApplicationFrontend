<template>
    <div class="max-w-4xl mx-auto p-8 bg-gray-300 min-h-screen">
        <!-- Thông tin dự án -->
        <div class="bg-white shadow-lg rounded-3xl p-6 w-full">
            <div
                class="bg-white shadow-2xl rounded-3xl p-8 bg-opacity-90 backdrop-blur-md hover:shadow-3xl transition-all">
                <div class="mb-6">
                    <label class="text-xl font-semibold text-gray-900 block">Tên Dự Án:</label>
                    <input v-model="project.name" :disabled="!editProject"
                        class="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg text-gray-900 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none" />

                    <label class="text-xl font-semibold text-gray-900 block mt-4">Mô Tả Dự Án:</label>
                    <textarea v-model="project.description" :disabled="!editProject"
                        class="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg text-gray-900 bg-gray-100 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                </div>
            </div>
            <div class="flex justify-end gap-4 mt-6">
                <button v-if="!editProject" @click="editProject = true"
                    class="bg-yellow-500 text-white px-5 py-2 rounded-xl hover:bg-yellow-600 transition shadow-lg flex items-center">
                    <i class="fa-solid fa-pen-to-square mr-2"></i> Chỉnh Sửa
                </button>
                <button v-if="editProject" @click="saveChangedProject"
                    class="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center">
                    <i class="fa-solid fa-file-lines mr-2"></i> Lưu Thông Tin
                </button>
                <button v-if="editProject" @click="cancelEditProject"
                    class="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition shadow-lg flex items-center">
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
                class="p-6 bg-white border rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105">
                <div class="flex items-center">
                    <div class="w-full">
                        <h2 class="text-2xl font-bold text-gray-900">{{ form?.name }}</h2>
                        <p class="text-gray-600 mt-2 line-clamp-2">{{ form?.introduction }}</p>
                    </div>
                    <div class="ml-auto w-40">
                        <button @click="getLink(form.id)" class="text-white px-4 py-2 rounded-lg transition"
                            :class="shareForms.includes(form.id) ? 'bg-cyan-300 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'">
                            <i class="fa-solid" :class="shareForms.includes(form.id) ? 'fa-check' : 'fa-share'"></i>
                            Chia Sẻ
                        </button>
                    </div>
                </div>
                <div class="flex gap-3 mt-4 flex-wrap">
                    <router-link :to="`/form/${form.id}/view`"
                        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        <i class="fa-solid fa-eye mr-2"></i> Xem
                    </router-link>
                    <button :disabled="form.status !== 'UNOPENED'" @click="viewForm(form.id)"
                        class="px-4 py-2 rounded-lg text-white transition"
                        :class="form.status === 'UNOPENED' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-500 cursor-not-allowed'">
                        <i class="fa-solid fa-gear mr-2"></i> Chỉnh Sửa
                    </button>
                    <button @click="toggleOpenAndCloseForm(form.id, form.status)"
                        class="px-4 py-2 rounded-lg text-white transition"
                        :class="form.status === 'OPEN' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'">
                        <i class="fa-solid" :class="form.status === 'OPEN' ? 'fa-lock-open' : 'fa-lock'"></i>
                        {{ form.status === "OPEN" ? "Đóng Form" : "Mở Form" }}
                    </button>
                    <button @click="deleteForm(form.id)"
                        class="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                        <i class="fa-solid fa-trash mr-2"></i> Xóa
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>



<script>
import { getUserProject, updateProject } from '../../api/projectApi';
import { openForm, closeForm, deleteForm } from '../../api/formApi';

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

            },
            shareForms: [],
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
        saveChangedProject() {
            console.log(`${this.project.name} ${this.project.description}`);
            updateProject(this.projectId, { name: this.project.name, description: this.project.description });
            window.location.reload();
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
            this.$router.push(`/project/${this.projectId}/form/${id}`);
        },
        async deleteForm(id) {
            await deleteForm("123", id);
            this.$router.go(0);
        },
        getLink(formId) {
            navigator.clipboard.writeText("http://localhost:5173/fill-form/" + formId);
            if (!this.shareForms.includes(formId)) {
                this.shareForms.push(formId);
            }
        },
        filterForm() {

        },
        async toggleOpenAndCloseForm(id, status) {
            if (status !== "OPEN") {
                await openForm(this.projectId, id);
            } else {
                await closeForm(this.projectId, id);
            }
            window.location.reload();
        },
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

.button-container>* {
    width: 145px;
}

.button-container>* {
    width: 145px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.button-container>*:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.bg-blue-500,
.bg-blue-600:hover {
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.5);
}

.bg-amber-500,
.bg-amber-600:hover {
    box-shadow: 0 4px 8px rgba(245, 158, 11, 0.5);
}

.bg-cyan-500,
.bg-cyan-600:hover {
    box-shadow: 0 4px 8px rgba(6, 182, 212, 0.5);
}

.bg-green-500,
.bg-green-600:hover {
    box-shadow: 0 4px 8px rgba(34, 197, 94, 0.5);
}

.bg-red-500,
.bg-red-600:hover {
    box-shadow: 0 4px 8px rgba(239, 68, 68, 0.5);
}

.bg-gray-700,
.bg-gray-900:hover {
    box-shadow: 0 4px 8px rgba(75, 85, 99, 0.5);
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
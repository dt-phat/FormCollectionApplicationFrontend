<template>
    <div class="container mx-auto p-8 bg-gray-100 min-h-screen flex flex-col items-center">
        <!-- Thông tin tên Form và mô tả Form -->
        <div class="w-full max-w-3xl bg-white shadow-xl rounded-xl p-6 border border-gray-200">
            <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Tạo Form Mới</h1>

            <input v-model="form.name" type="text" placeholder="Tiêu đề form"
                class="w-full p-3 border border-gray-300 rounded-lg outline-none text-lg font-medium mb-3 shadow-md focus:ring-2 focus:ring-purple-500 hover:shadow-lg transition">
            <textarea v-model="form.introduction" placeholder="Mô tả"
                class="w-full p-3 border border-gray-300 rounded-lg outline-none text-lg text-gray-600 mb-3 shadow-md focus:ring-2 focus:ring-purple-500 hover:shadow-lg transition"></textarea>
        </div>
        <!-- Danh sách câu hỏi -->
        <div class="w-full max-w-3xl bg-white shadow-xl rounded-xl p-4 mt-4 border border-gray-200"
            v-for="(question, index) in form.questions" :key="index">
            <label class="block text-lg font-medium text-gray-700 mb-2">Câu hỏi số {{ index + 1 }}:</label>
            <select v-model="question.type"
                class="w-full p-2 border border-gray-300 rounded-lg outline-none mb-3 shadow-md focus:ring-2 focus:ring-purple-500 hover:shadow-lg transition">
                <option value="TEXT">Trả lời ngắn</option>
                <option value="CHECKBOX">Hộp kiểm</option>
                <option value="RADIO">Nút radio</option>
                <option value="FILE">Tải tệp</option>
            </select>
            <input v-model="question.question" type="text" placeholder="Nội dung câu hỏi"
                class="w-full p-2 border border-gray-300 rounded-lg outline-none text-lg mb-3 shadow-md focus:ring-2 focus:ring-purple-500 hover:shadow-lg transition">
            <!-- Hiển thị danh sách phương án -->
            <div v-if="question.type === 'CHECKBOX' || question.type === 'RADIO'">
                <div v-for="(option, optIndex) in question.options" :key="optIndex"
                    class="flex items-center gap-2 mb-2">
                    <input v-model="question.options[optIndex]" type="text" placeholder="Nhập phương án"
                        class="w-full p-2 border border-gray-300 rounded-lg outline-none shadow-md focus:ring-2 focus:ring-purple-500 hover:shadow-lg transition">
                    <button @click="removeOption(question, optIndex)" class="text-red-500 hover:text-red-700">✖</button>
                </div>
                <button @click="addOption(question)" class="text-purple-600 hover:text-purple-800 font-semibold">
                    + Thêm phương án
                </button>
            </div>

            <!-- Hiển thị input tải file -->
            <div v-if="question.type === 'FILE'">
                <label class="block text-gray-700 font-medium mb-2">Tải tệp:</label>
                <input type="file" @change="handleFileUpload($event, index)"
                    class="w-full p-2 border border-gray-300 rounded-lg outline-none shadow-md focus:ring-2 focus:ring-purple-500 hover:shadow-lg transition">

                <div v-if="question.fileName"
                    class="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg p-3 mt-3">
                    <span class="text-gray-700 font-medium truncate">{{ question.fileName }}</span>
                    <button @click="removeFile(index)"
                        class="text-red-500 hover:text-red-700 text-sm font-semibold ml-3">
                        ✖ Xóa
                    </button>
                </div>
            </div>


            <button @click="removeQuestion(index)" class="text-red-500 mt-2 hover:text-red-700 font-semibold">Xóa Câu
                Hỏi</button>
        </div>

        <div class="w-full max-w-3xl bg-white shadow-xl rounded-xl p-4 mt-6 border border-gray-200">
            <button @click="showQuestionTypeModal = true"
                class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105 shadow-lg hover:shadow-2xl font-semibold">
                <i class="fa-solid fa-plus mr-2"></i> Thêm Câu Hỏi
            </button>
        </div>

        <div
            class="w-full max-w-3xl px-6 py-8 flex gap-20 justify-center bg-white shadow-xl rounded-2xl mt-6 border border-gray-300">
            <router-link :to="`/project/${projectId}`"
                class="w-48 bg-gradient-to-r from-rose-500 to-red-500 text-white py-4 rounded-2xl text-center text-lg font-semibold shadow-md hover:bg-rose-600 transition transform hover:scale-105 hover:shadow-2xl">
                <i class="fa-solid fa-arrow-left mr-2"></i> Trở Về
            </router-link>
            <button @click="saveForm"
                class="w-48 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-2xl text-lg font-semibold shadow-md hover:bg-indigo-700 transition transform hover:scale-105 hover:shadow-2xl">
                <i class="fa-solid fa-file-export mr-2"></i> Xuất Bản Form
            </button>
        </div>

        <!-- Modal chọn loại câu hỏi -->
        <div v-if="showQuestionTypeModal"
            class="fixed inset-0 bg-gray-100/60 flex justify-center items-center transition">
            <div class="bg-white p-6 rounded-xl shadow-2xl w-80 border border-gray-200">
                <h2 class="text-lg font-semibold mb-4">Chọn Loại Câu Hỏi</h2>
                <select v-model="selectedQuestionType"
                    class="w-full p-2 border border-gray-300 rounded-lg mb-4 shadow-md focus:ring-2 focus:ring-purple-500 hover:shadow-lg transition">
                    <option value="TEXT">Trả lời ngắn</option>
                    <option value="CHECKBOX">Hộp kiểm</option>
                    <option value="RADIO">Nút radio</option>
                    <option value="FILE">Tải tệp</option>
                </select>
                <div class="flex justify-end gap-3">
                    <button @click="showQuestionTypeModal = false"
                        class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition transform hover:scale-105 shadow-lg hover:shadow-2xl">
                        Hủy
                    </button>
                    <button @click="addQuestion"
                        class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition transform hover:scale-105 shadow-lg hover:shadow-2xl">
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import { createForm } from '../../api/formApi';

export default {
    props: {
        projectId: String,
    },
    data() {
        return {
            form: {
                name: "",
                introduction: "",
                questions: []
            },
            showQuestionTypeModal: false,
            selectedQuestionType: "TEXT"
        };
    },
    methods: {
        addQuestion() {
            this.form.questions.push({
                question: "",
                type: this.selectedQuestionType,
                options: [],
            });
            this.showQuestionTypeModal = false;
        },
        removeQuestion(index) {
            this.form.questions.splice(index, 1);
        },
        addOption(question) {
            question.options.push("");
        },
        removeOption(question, index) {
            question.options.splice(index, 1);
        },
        handleFileUpload(event, index) {
            const file = event.target.files[0];
            if (file) {
                this.form.questions[index].fileName = file.name;
                this.form.questions[index].fileData = file;
            }
        },
        async saveForm() {
            console.log(this.form);
            await createForm(this.projectId, this.form);
            this.$router.push(`/project/${this.projectId}`);
        }
    },
};
</script>
<style></style>
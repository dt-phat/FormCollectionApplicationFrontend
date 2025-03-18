<template>
    <div class="container mx-auto p-8 bg-gray-100 min-h-screen flex flex-col items-center">
        <!-- Form container -->
        <div class="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Cập Nhật Form</h1>

            <input v-model="form.name" type="text" placeholder="Tiêu đề form"
                class="w-full p-3 border border-gray-300 rounded-lg outline-none text-lg font-medium mb-4 focus:ring-2 focus:ring-purple-400">
            <textarea v-model="form.introduction" placeholder="Mô tả"
                class="w-full p-3 border border-gray-300 rounded-lg outline-none text-lg text-gray-600 mb-4 focus:ring-2 focus:ring-purple-400"></textarea>
        </div>

        <!-- Danh sách câu hỏi -->
        <div v-for="(question, index) in form.questions" :key="index"
            class="w-full max-w-3xl bg-white shadow-md rounded-xl p-5 mt-4">
            <label class="text-lg font-semibold">Câu hỏi số {{ index + 1 }}:</label>
            <select v-model="question.type"
                class="w-full p-2 mt-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-400">
                <option value="TEXT">Trả lời ngắn</option>
                <option value="CHECKBOX">Hộp kiểm</option>
                <option value="RADIO">Nút radio</option>
                <option value="FILE">Tải tệp</option>
            </select>
            <input v-model="question.question" type="text" placeholder="Nội dung câu hỏi"
                class="w-full p-2 mt-3 border border-gray-300 rounded-lg outline-none text-lg focus:ring-2 focus:ring-purple-400">

            <!-- Tùy chọn cho CHECKBOX và RADIO -->
            <div v-if="question.type === 'CHECKBOX' || question.type === 'RADIO'" class="mt-3">
                <div v-for="(option, optIndex) in question.options" :key="optIndex"
                    class="flex items-center gap-2 mb-2">
                    <input v-model="question.options[optIndex]" type="text" placeholder="Nhập phương án"
                        class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-400">
                    <button @click="removeOption(question, optIndex)"
                        class="text-red-500 hover:text-red-700 transition transform hover:scale-110">
                        ✖
                    </button>
                </div>
                <button @click="addOption(question)"
                    class="text-purple-600 font-semibold hover:text-purple-800 transition transform hover:scale-105">
                    + Thêm phương án
                </button>
            </div>

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

            <button @click="removeQuestion(index)"
                class="mt-4 text-red-500 font-semibold hover:text-red-700 transition transform hover:scale-105">
                Xóa Câu Hỏi
            </button>
        </div>

        <!-- Nút thêm câu hỏi -->
        <div class="w-full max-w-3xl bg-white shadow-md rounded-xl p-4 mt-6">
            <button @click="showQuestionTypeModal = true"
                class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105 font-semibold">
                <i class="fa-solid fa-plus mr-2"></i> Thêm Câu Hỏi
            </button>
        </div>

        <!-- Các nút điều hướng -->
        <div class="w-full max-w-3xl px-3 py-8 flex gap-4 justify-center bg-white shadow-md rounded-xl mt-4">
            <router-link :to="`/project/${projectId}`"
                class="w-40 bg-rose-500 text-white py-3 rounded-lg text-center hover:bg-rose-600 transition transform hover:scale-105 font-semibold">
                <i class="fa-solid fa-arrow-left mr-2"></i> Trở Về
            </router-link>
            <button @click="saveForm"
                class="w-40 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 font-semibold">
                <i class="fa-solid fa-save mr-2"></i> Lưu Form
            </button>
        </div>

        <!-- Modal chọn loại câu hỏi -->
        <div v-if="showQuestionTypeModal"
            class="fixed inset-0 bg-gray-100/60 flex justify-center items-center transition">
            <div class="bg-white p-6 rounded-lg shadow-xl w-80">
                <h2 class="text-lg font-semibold mb-4">Chọn Loại Câu Hỏi</h2>
                <select v-model="selectedQuestionType"
                    class="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-400">
                    <option value="TEXT">Trả lời ngắn</option>
                    <option value="CHECKBOX">Hộp kiểm</option>
                    <option value="RADIO">Nút radio</option>
                    <option value="FILE">Tải tệp</option>
                </select>
                <div class="flex justify-end gap-3">
                    <button @click="showQuestionTypeModal = false"
                        class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                        Hủy
                    </button>
                    <button @click="addQuestion"
                        class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                        Thêm
                    </button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import { getForm, updateForm } from '../../api/formApi';

export default {
    props: {
        projectId: String,
        formId: String,
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
        async getForm() {
            this.form = await getForm(this.projectId, this.formId);
        },
        addQuestion() {
            this.form.questions.push({ question: "", type: this.selectedQuestionType, options: [] });
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
        async saveForm() {
            this.form.questions = this.form.questions.map((question, index) => ({
                ...question,
                numericalOrder: index + 1,
            }));
            console.log(this.form);
            await updateForm(this.projectId, this.formId, this.form);
            this.$router.push(`/project/${this.projectId}`);
        }
    },
    mounted() {
        this.getForm();
    }
};
</script>
<style scoped></style>
<template>
    <div class="container mx-auto p-8 bg-purple-200 min-h-screen flex flex-col items-center">
        <div class="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
            <h1 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Tạo Form Mới</h1>

            <input v-model="form.name" type="text" placeholder="Tiêu đề form"
                class="w-full p-3 border-b border-gray-300 outline-none text-lg font-medium mb-3">
            <textarea v-model="form.introduction" placeholder="Mô tả"
                class="w-full p-3 border-b border-gray-300 outline-none text-lg text-gray-600 mb-3"></textarea>
        </div>
        <div class="w-full max-w-3xl bg-white shadow-md rounded-lg p-4 mt-4" v-for="(question, index) in form.questions"
            :key="index">
            <label class="w-full p-2 outline-none text-lg mb-3">Câu hỏi số {{ index + 1 }}: </label>
            <select v-model="question.type" class="w-full p-2 border-b border-gray-300 outline-none mb-3">
                <option value="TEXT">Trả lời ngắn</option>
                <option value="CHECKBOX">Hộp kiểm</option>
                <option value="RADIO">Nút radio</option>
            </select>
            <input v-model="question.question" type="text" placeholder="Nội dung câu hỏi"
                class="w-full p-2 border-b border-gray-300 outline-none text-lg mb-3">

            <div v-if="question.type === 'checkbox' || question.type === 'radio'">
                <div v-for="(option, optIndex) in question.options" :key="optIndex"
                    class="flex items-center gap-2 mb-2 opacity-100">
                    <input v-model="question.options[optIndex]" type="text" placeholder="Nhập phương án"
                        class="w-full p-2 border-b border-gray-300 outline-none">
                    <button @click="removeOption(question, optIndex)" class="text-red-500 hover:text-red-700">✖</button>
                </div>
                <button @click="addOption(question)" class="text-purple-600 hover:text-purple-800">+ Thêm phương
                    án</button>
            </div>

            <button @click="removeQuestion(index)" class="text-red-500 mt-2 hover:text-red-700">Xóa Câu Hỏi</button>
        </div>

        <div class="w-full max-w-3xl bg-white -mt-4 shadow-md text-lg font-semibold rounded-lg p-4">
            <button @click="showQuestionTypeModal = true"
                class="w-full max-w-3xl bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition-all">
                <i class="fa-solid fa-plus mr-2"></i> Thêm Câu Hỏi
            </button>
        </div>



        <div class="w-full max-w-3xl px-3 py-8 -mt-3 flex rounded-lg justify-around bg-white">
            <div>
                <router-link :to="`/project/${projectId}`"
                    class="block text-center w-[350px] bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-all text-lg font-semibold hover:scale-105">
                    <i class="fa-solid fa-delete-left mr-2"></i> Hủy Tạo Form
                </router-link>
            </div>
            <div>
                <button @click="saveForm"
                    class="block w-[350px] bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all text-lg font-semibold hover:scale-105">
                    <i class="fa-solid fa-file-export mr-2"></i> Xuất Bản Form
                </button>
            </div>
        </div>


        <!-- Model chọn loại câu hỏi -->
        <div v-if="showQuestionTypeModal"
            class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-80 opacity-100">
                <h2 class="text-lg font-semibold mb-4">Chọn Loại Câu Hỏi</h2>
                <select v-model="selectedQuestionType" class="w-full p-2 border border-gray-300 rounded-lg mb-4">
                    <option value="TEXT">Trả lời ngắn</option>
                    <option value="CHECKBOX">Hộp kiểm</option>
                    <option value="RADIO">Nút radio</option>
                </select>
                <div class="flex justify-end gap-3">
                    <button @click="showQuestionTypeModal = false"
                        class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Hủy</button>
                    <button @click="addQuestion"
                        class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Thêm</button>
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
        saveForm() {
            console.log(this.form);
            createForm(this.projectId, this.form);
        }
    },
};
</script>

<style scoped>
.container {
    max-width: 900px;
    margin: 0 auto;
}
</style>

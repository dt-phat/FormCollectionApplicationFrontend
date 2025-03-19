<template>
    <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Danh sách Form</h1>
        <ul class="mb-6">
            <li v-for="form in forms" :key="form.id"
                class="cursor-pointer p-2 bg-gray-100 rounded-lg mb-2 hover:bg-gray-200"
                @click="toggleSelectForm(form.id)">
                {{ form.formSummary.name }}
                <div v-if="selectedForm?.id === form.id" class="mt-4">
                    <h2 class="text-xl font-semibold mb-4">Câu trả lời - {{ selectedForm.formSummary.name }}</h2>
                    <table class="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="border p-2">Câu hỏi</th>
                                <th class="border p-2">Câu trả lời</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(answer, index) in selectedForm.answerResponses" :key="index">
                                <td class="border p-2">{{ answer.questionResponse.question }}</td>
                                <td class="border p-2" :class="{ 'text-red-500': answer.answer !== answer.correct }">
                                    {{ answer.answer }}
                                    <div class="mt-2">
                                        <button v-if="answer.questionResponse.type == 'FILE'"
                                            @click="downloadFile(form.formSummary.id, answer.id, answer.answer)"
                                            class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">
                                            <i class="fa-solid fa-download mr-2"></i> Tải File
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { getAllFormAnswers } from "../api/infoApi"
import { downloadFile } from "../api/formApi";
export default {
    data() {
        return {
            forms: [],
            selectedForm: null,
        };
    },
    methods: {
        toggleSelectForm(id) {
            // if (this.selectedForm?.id === id) this.selectedForm = null;
            // else
            this.selectedForm = this.forms.find(form => form.id === id);
        },
        async downloadFile(formId, questionId, fileName) {
            console.log(formId, questionId, fileName);
            await downloadFile(formId, questionId, fileName);
        },
    },
    async mounted() {
        this.forms = await getAllFormAnswers();
    }
};
</script>

<style scoped></style>

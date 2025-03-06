<template>
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl mt-10 border border-gray-200">
        <div class="flex">
            <h1 class="text-4xl font-bold text-purple-700 mb-6 text-left">Kết Quả Form:</h1>
            <button @click="exportToExcel"
                class=" ml-auto mb-4 px-4 py-2 bg-green-500 hover:scale-105 hover:bg-green-700 text-white rounded-lg shadow">
                <i class="fa-solid fa-file-excel mr-2"></i> Xuất File Excel
            </button>
        </div>

        <div v-if="form">
            <h2 class="text-2xl font-semibold text-purple-800 mb-2">Tên: {{ form.name }}</h2>
            <p class="text-gray-600 mb-6">Mô tả: {{ form.introduction }}</p>

            <div v-for="(question, index) in form.questions" :key="index" class="mb-4">
                <div @click="toggleExpand(index)"
                    class="cursor-pointer p-5 bg-gray-50 shadow-md border border-gray-300 rounded-xl flex justify-between items-center">
                    <h3 class="text-lg font-medium text-purple-900">{{ question.question }}</h3>
                    <i :class="expandedQuestions[index] ? 'fas fa-chevron-down' : 'fas fa-chevron-right'"
                        class="text-purple-600"></i>
                </div>

                <div v-if="expandedQuestions[index]" class="p-4 border border-gray-200 rounded-lg mt-2 bg-gray-100">
                    <div v-for="(response, i) in answers[question.id]" :key="i"
                        class="p-2 bg-white shadow-sm rounded-md mb-2">
                        <strong class="text-purple-800">{{ response.name }}:</strong>
                        <span class="text-gray-700">{{ formatAnswer(response.answer) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <p class="text-gray-500 text-center">Không tìm thấy kết quả.</p>
        </div>
    </div>
</template>

<script>
import { getForm, getFormAnswers } from "../../api/formApi";
import * as XLSX from "xlsx";

export default {
    props: {
        formId: String,
    },
    data() {
        return {
            form: {},
            formAnswers: [],
            answers: {},
            expandedQuestions: [],
            previewVisible: true,
        };
    },
    async created() {
        this.form = await getForm("projectId", this.formId);
        this.form.questions.forEach(question => {
            this.answers[question.id] = [];
        });

        this.formAnswers = await getFormAnswers(this.formId);
        this.formAnswers.forEach(formAnswer => {
            const userName = formAnswer.userSummary.firstName + " " + formAnswer.userSummary.lastName;
            formAnswer.answerResponses.forEach(response => {
                const questionId = response.questionResponse.id;
                if (!this.answers[questionId]) {
                    this.answers[questionId] = [];
                }
                this.answers[questionId].push({
                    name: userName,
                    answer: response.answer || "Chưa trả lời",
                });
            });
        });
        this.expandedQuestions = new Array(this.form.questions.length).fill(false);
    },
    methods: {
        toggleExpand(index) {
            this.expandedQuestions[index] = !this.expandedQuestions[index];
        },
        formatAnswer(answer) {
            return Array.isArray(answer) ? answer.join(', ') : answer;
        },
        exportToExcel() {
            const headers = ["Tên Người Dùng", ...this.form.questions.map(q => q.question)];
            const data = this.formAnswers.map(formAnswer => {
                const userName = formAnswer.userSummary.firstName + " " + formAnswer.userSummary.lastName;
                const row = [userName];
                this.form.questions.forEach(q => {
                    const answerObj = formAnswer.answerResponses.find(a => a.questionResponse.id === q.id);
                    row.push(answerObj ? this.formatAnswer(answerObj.answer) : "Chưa trả lời");
                });
                return row;
            });
            const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Form Kết Quả");
            XLSX.writeFile(workbook, "Form_Ket_Qua.xlsx");
        },
    }
};
</script>

<style scoped></style>

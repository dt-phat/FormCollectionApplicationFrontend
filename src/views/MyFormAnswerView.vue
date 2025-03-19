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
export default {
    data() {
        return {
            formsA: [
                {
                    id: 1,
                    name: "Bài kiểm tra Toán",
                    answers: [
                        { question: "2 + 2 =", answer: "4", correct: "4" },
                        { question: "5 * 6 =", answer: "30", correct: "30" },
                        { question: "10 / 2 =", answer: "4", correct: "5" }
                    ]
                },
                {
                    id: 2,
                    name: "Bài kiểm tra Lịch sử",
                    answers: [
                        { question: "Năm 1945 xảy ra sự kiện gì?", answer: "CMT8", correct: "Cách mạng tháng 8" },
                        { question: "Ai là chủ tịch đầu tiên của Việt Nam?", answer: "Hồ Chí Minh", correct: "Hồ Chí Minh" }
                    ]
                }
            ],
            forms: [],
            selectedForm: null,
        };
    },
    methods: {
        toggleSelectForm(id) {
            if (this.selectedForm?.id === id) this.selectedForm = null;
            else this.selectedForm = this.forms.find(form => form.id === id);
        }
    },
    async mounted() {
        this.forms = await getAllFormAnswers();
    }
};
</script>

<style scoped></style>

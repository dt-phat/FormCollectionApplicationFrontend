<template>
    <div
        class="max-w-3xl mx-auto bg-gradient-to-b from-purple-50 to-white p-8 rounded-xl shadow-2xl mt-10 border border-gray-200">
        <h1 class="text-4xl font-bold text-purple-700 mb-6 text-center">Điền Form</h1>

        <div v-if="form">
            <h2 class="text-2xl font-semibold text-purple-800 mb-2">{{ form.name }}</h2>
            <p class="text-gray-600 mb-6">{{ form.introduction }}</p>

            <form @submit.prevent="submitForm" class="space-y-8">
                <div v-for="(question, index) in form.questions" :key="index"
                    class="p-5 rounded-xl bg-white shadow-md border border-gray-300 hover:shadow-lg transition duration-200">
                    <label class="block text-lg font-medium text-purple-900 mb-3">{{ question.question }}</label>

                    <!-- Input Text -->
                    <input v-if="question.type === 'TEXT'" v-model="answers[index].answer" type="text"
                        class="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm bg-gray-50" />

                    <!-- Checkbox -->
                    <div v-if="question.type === 'CHECKBOX'" class="space-y-2">
                        <div v-for="(option, i) in question.options" :key="i" class="flex items-center space-x-3">
                            <input type="checkbox" :value="option" v-model="answers[index].answer"
                                class="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded-md focus:ring-purple-500 cursor-pointer transition" />
                            <label class="text-purple-900 cursor-pointer">{{ option }}</label>
                        </div>
                    </div>

                    <!-- Radio -->
                    <div v-if="question.type === 'RADIO'" class="space-y-2">
                        <div v-for="(option, i) in question.options" :key="i" class="flex items-center space-x-3">
                            <input type="radio" :value="option" v-model="answers[index].answer"
                                class="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 cursor-pointer transition" />
                            <label class="text-purple-900 cursor-pointer">{{ option }}</label>
                        </div>
                    </div>

                    <!-- File Upload -->
                    <div v-if="question.type === 'FILE'" class="space-y-2">
                        <input type="file" @change="handleFileUpload($event, index)"
                            class="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition shadow-sm bg-gray-50" />
                    </div>
                </div>

                <button type="submit"
                    class="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-3 rounded-lg transition text-lg shadow-lg">
                    Gửi Form
                </button>
            </form>
        </div>

        <div v-else>
            <p class="text-gray-500 text-center">Không tìm thấy form.</p>
        </div>
    </div>
</template>

<script>
import { getForm, submitForm } from '../../api/formApi';

export default {
    props: {
        formId: String,
    },
    data() {
        return {
            form: null,
            answers: [],
            files: {} // Store uploaded files
        };
    },
    created() {
        this.loadForm();
    },
    methods: {
        async loadForm() {
            this.form = await getForm("123", this.formId);
            this.answers = this.form.questions.map(q =>
                q.type === "CHECKBOX" ? { questionId: null, answer: [] } : { questionId: null, answer: null }
            );
            this.form.questions.forEach((q, i) => {
                this.answers[i].questionId = q.id;
            });
        },
        handleFileUpload(event, index) {
            const file = event.target.files[0];
            if (file) {
                this.files[index] = file;
                this.answers[index].answer = file.name;
            }
        },
        async submitForm() {
            const formData = new FormData();

            // Tạo object JSON chứa câu trả lời
            // Chuyển payload thành JSON string
            // const payload = JSON.stringify({
            //     answers: this.answers.map(answer => ({
            //         questionId: answer.questionId,
            //         answer: answer.answer instanceof File ? answer.answer.name : answer.answer
            //     }))
            // });

            // Chuyển đổi trước khi gửi
            this.answers.forEach(answer => {
                if (Array.isArray(answer.answer)) {
                    answer.answer = answer.answer.join(", "); // Chuyển từ mảng sang chuỗi
                }
            });

            // Sau đó mới stringify và gửi đi
            const payload = JSON.stringify({
                answers: this.answers.map(answer => ({
                    questionId: answer.questionId,
                    answer: String(answer.answer ?? "") // Đảm bảo là chuỗi, tránh null/undefined
                }))
            });


            // Thêm JSON vào formData
            formData.append("data", payload);
            // Thêm file vào nếu có
            Object.keys(this.files).forEach(index => {
                const file = this.files[index];
                if (file) {
                    const questionId = this.answers[index].questionId;
                    formData.append(`files[${questionId}]`, file);
                }
            });

            try {
                await submitForm(this.formId, formData);
                this.$router.push(`/fill-form/${this.formId}/completed`);
            } catch (error) {
                console.error("Lỗi khi gửi form:", error);
            }
        }

    }
};
</script>
<style></style>
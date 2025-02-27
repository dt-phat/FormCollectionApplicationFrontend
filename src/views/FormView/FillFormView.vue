<template>
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mt-10 border border-gray-200">
        <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">Điền Form</h1>

        <div v-if="form">
            <h2 class="text-2xl font-semibold text-gray-700 mb-2">{{ form.name }}</h2>
            <p class="text-gray-500 mb-6">{{ form.description }}</p>

            <form @submit.prevent="submitForm" class="space-y-8">
                <div v-for="(question, index) in form.questions" :key="index"
                    class="p-4 rounded-lg bg-gray-50 shadow-sm">
                    <label class="block text-lg font-medium text-gray-900 mb-3">{{ question.text }}</label>

                    <!-- Input Text -->
                    <input v-if="question.type === 'text'" v-model="answers[index]" type="text"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm bg-white" />

                    <!-- Checkbox -->
                    <div v-if="question.type === 'checkbox'" class="space-y-2">
                        <div v-for="(option, i) in question.options" :key="i" class="flex items-center space-x-3">
                            <input type="checkbox" :value="option" v-model="answers[index]"
                                class="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded-md focus:ring-blue-500 cursor-pointer" />
                            <label class="text-gray-800 cursor-pointer">{{ option }}</label>
                        </div>
                    </div>

                    <!-- Radio -->
                    <div v-if="question.type === 'radio'" class="space-y-2">
                        <div v-for="(option, i) in question.options" :key="i" class="flex items-center space-x-3">
                            <input type="radio" :value="option" v-model="answers[index]"
                                class="w-5 h-5 text-blue-600 bg-white border-gray-300 focus:ring-blue-500 cursor-pointer" />
                            <label class="text-gray-800 cursor-pointer">{{ option }}</label>
                        </div>
                    </div>
                </div>

                <button type="submit"
                    class="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-3 rounded-lg transition text-lg shadow-md">
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
export default {
    data() {
        return {
            form: null,
            answers: [],
        };
    },
    created() {
        this.loadForm();
    },
    methods: {
        loadForm() {
            this.form = {
                name: "Khảo sát ý kiến",
                description: "Hãy điền vào biểu mẫu dưới đây.",
                questions: [
                    { text: "Bạn tên gì?", type: "text" },
                    { text: "Bạn thích màu gì?", type: "checkbox", options: ["Đỏ", "Xanh", "Vàng"] },
                    { text: "Giới tính của bạn?", type: "radio", options: ["Nam", "Nữ"] },
                ]
            };

            // Gán giá trị đúng cho answers
            this.answers = this.form.questions.map(q => q.type === "checkbox" ? [] : null);
        },
        submitForm() {
            console.log("Dữ liệu đã gửi:", this.answers);
            alert("Gửi thành công!");
        },
    }
};
</script>

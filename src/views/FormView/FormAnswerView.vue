<template>
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl mt-10 border border-gray-200">
        <h1 class="text-4xl font-bold text-purple-700 mb-6 text-center">Kết Quả Form</h1>

        <div v-if="form">
            <h2 class="text-2xl font-semibold text-purple-800 mb-2">{{ form.name }}</h2>
            <p class="text-gray-600 mb-6">{{ form.introduction }}</p>

            <div v-for="(question, index) in questions" :key="index" class="mb-4">
                <div @click="toggleExpand(index)"
                    class="cursor-pointer p-5 bg-gray-50 shadow-md border border-gray-300 rounded-xl flex justify-between items-center">
                    <h3 class="text-lg font-medium text-purple-900">{{ question.text }}</h3>
                    <i :class="expandedQuestions[index] ? 'fas fa-chevron-down' : 'fas fa-chevron-right'"
                        class="text-purple-600"></i>
                </div>

                <div v-if="expandedQuestions[index]" class="p-4 border border-gray-200 rounded-lg mt-2 bg-gray-100">
                    <div v-for="(response, i) in question.responses" :key="i"
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
export default {
    data() {
        return {
            form: {
                name: "Khảo sát sản phẩm",
                introduction: "Cảm ơn bạn đã tham gia khảo sát của chúng tôi!"
            },
            questions: [
                {
                    text: "Bạn có hài lòng với sản phẩm không?",
                    responses: [
                        { name: "Nguyễn Văn A", answer: "Có" },
                        { name: "Trần Thị B", answer: "Không" }
                    ]
                },
                {
                    text: "Bạn thích tính năng nào nhất?",
                    responses: [
                        { name: "Nguyễn Văn A", answer: "Thiết kế đẹp, dễ sử dụng" },
                        { name: "Trần Thị B", answer: "Chưa có tính năng nổi bật" }
                    ]
                },
                {
                    text: "Những cải tiến nào bạn mong muốn?",
                    responses: [
                        { name: "Nguyễn Văn A", answer: ["Giảm giá thành", "Thêm nhiều mẫu mã"] },
                        { name: "Trần Thị B", answer: ["Bổ sung tính năng mới"] }
                    ]
                }
            ],
            expandedQuestions: []
        };
    },
    created() {
        this.expandedQuestions = new Array(this.questions.length).fill(false);
    },
    methods: {
        toggleExpand(index) {
            this.expandedQuestions[index] = !this.expandedQuestions[index];
        },
        formatAnswer(answer) {
            return Array.isArray(answer) ? answer.join(', ') : answer;
        }
    }
};
</script>

<style scoped></style>

<template>
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10 border border-gray-300 text-center">
        <h1 class="text-4xl font-bold text-purple-700 mb-4">Cảm ơn bạn!</h1>
        <p class="text-gray-600 mb-6">Chúng tôi đã nhận được phản hồi của bạn. Cảm ơn bạn đã dành thời gian để điền vào
            biểu mẫu.</p>

        <router-link to="/"
            class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition">
            Quay về trang chủ
        </router-link>
    </div>
</template>

<script>
export default {
    name: "ThankYouView",
};
</script>

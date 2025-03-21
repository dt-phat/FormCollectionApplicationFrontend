<template>
  <div ref="parentRef" class="w-full">
    <div v-if="open" 
         class="fixed bottom-0 right-0 h-[100%] bg-white p-4 shadow-lg rounded-lg flex flex-col z-50"
         :style="{ width: (parentWidth) + 'px' }">
      <div class="flex justify-between items-center bg-blue-500 text-white p-2 rounded">
        <div class="flex items-center gap-2">
          <span class="bg-green-500 w-3 h-3 rounded-full"></span>
          <span>Tạo form mẫu</span>
        </div>
        <button @click="open = false">-</button>
      </div>
      <div class="flex-1 overflow-y-auto p-2">
        <div v-for="(msg, index) in messages" :key="index" class="mb-2" :class="{'text-right': msg.role === 'user'}">
            <span 
            class="p-2 rounded inline-block whitespace-pre-wrap" 
            :class="msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'"
            >
                {{ extractOutsideBackticks(msg.text) }}
            </span>
        </div>
        <div ref="bottomRef"></div>
      </div>
      <div class="flex items-center p-2 border-t">
        <input v-model="input" @keydown.enter="sendMessage" placeholder="Nhập tin nhắn..." class="flex-1 p-1 border rounded" />
        <button @click="sendMessage" class="ml-2 p-1 bg-blue-500 text-white rounded">Gửi</button>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, nextTick } from 'vue';
import { GoogleGenerativeAI } from "@google/generative-ai";
import systemInstruction from './SystemInstructionData.js';
import { onMounted, onUnmounted } from 'vue';

export default {
  props: {
    form: Object,
  },
  setup(props, { emit }) {
    const messages = ref([{ role: "bot", text: "Chào mừng bạn đến với chat bot tạo form mẫu!" }]);
    const input = ref("");
    const open = ref(true); // Form luôn hiển thị
    const bottomRef = ref(null);
    const genAI = new GoogleGenerativeAI("AIzaSyDwdcPo0iYZNvGYZ5uhGnHrsIWCio_T_kQ");

    const parentRef = ref(null);
    const parentWidth = ref(500); // Giá trị mặc định

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });
    const chat = model.startChat({ history: [] });

    const sendMessage = async () => {
      if (!input.value.trim()) return;
      messages.value.push({ role: "user", text: input.value.trim() });

      const formState = JSON.stringify(props.form, null, 2);

      const userMessage = `
        ${input.value.trim()}
        
        Hệ thống: Đây là trạng thái mới nhất của form được dùng khi người dùng yêu cầu chỉnh sửa:
        \`\`\`json
        ${formState}
        \`\`\`
      `;
      input.value = "";

      try {
        const response = await chat.sendMessage(userMessage);
        messages.value.push({ role: "bot", text: response.response.text() });
        emit("botResponse", extractInsideBackticks(response.response.text()));
      } catch (error) {
        console.error("Error:", error);
        messages.value.push({ role: "bot", text: "Xin lỗi, đã có lỗi xảy ra." });
      }
      nextTick(() => bottomRef.value?.scrollIntoView({ behavior: "smooth" }));
    };

    function extractInsideBackticks(text) {
      const match = text.match(/```([\s\S]+?)```/);
      return match ? match[1].trim() : null;
    }

    function extractOutsideBackticks(text) {
      return text.replace(/```[\s\S]+?```/g, '').trim();
    }

     const updateWidth = () => {
      if (parentRef.value) {
        parentWidth.value = parentRef.value.clientWidth;
      }
    };

    onMounted(() => {
      updateWidth();
      window.addEventListener('resize', updateWidth);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateWidth);
    });

    return { messages, input, open, bottomRef, sendMessage, extractOutsideBackticks, parentRef, parentWidth };
  }
};
</script>

<style>
button {
  cursor: pointer;
}
</style>

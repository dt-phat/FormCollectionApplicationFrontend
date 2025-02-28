<template>
    <div class="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <div class="w-full max-w-lg bg-white shadow-lg rounded-xl p-6">
            <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">Thông Tin Cá Nhân</h2>

            <div class="space-y-4">
                <div class="info-box">
                    <label class="block text-gray-700 font-medium">Mã người dùng:</label>
                    <input v-model="user.id" type="text" class="input-field" :disabled="!isEditing" />
                </div>
                <div class="info-box">
                    <label class="block text-gray-700 font-medium">Tên đăng nhập:</label>
                    <input v-model="user.username" type="text" class="input-field" :disabled="!isEditing" />
                </div>
                <div class="info-box">
                    <label class="block text-gray-700 font-medium">Tên:</label>
                    <input v-model="user.firstName" type="text" class="input-field" :disabled="!isEditing" />
                </div>
                <div class="info-box">
                    <label class="block text-gray-700 font-medium">Họ đệm:</label>
                    <input v-model="user.lastName" type="text" class="input-field" :disabled="!isEditing" />
                </div>
                <div class="info-box">
                    <label class="block text-gray-700 font-medium">Ngày sinh:</label>
                    <input v-model="user.dob" type="date" class="input-field" :disabled="!isEditing" />
                </div>
            </div>

            <div class="flex justify-center space-x-4 mt-6">
                <button v-if="!isEditing" @click="editProfile" class="btn-primary">Chỉnh sửa</button>
                <button v-if="isEditing" @click="saveProfile" class="btn-success">Lưu</button>
                <button v-if="isEditing" @click="cancelEdit" class="btn-danger">Hủy</button>
            </div>

            <p v-if="message" class="text-center text-green-600 font-medium mt-4">{{ message }}</p>
        </div>
    </div>
</template>

<script>
import { getUserInfo } from "../api/infoApi";

export default {
    data() {
        return {
            user: {
                id: "",
                username: "",
                firstName: "",
                lastName: "",
                dob: null,
            },
            isEditing: false,
            message: "",
        };
    },
    methods: {
        async getUserInfo() {
            this.message = "";
            try {
                this.user = await getUserInfo();
            } catch (error) {
                this.message = "Không tìm thấy người dùng!";
            }
        },
        editProfile() {
            this.isEditing = true;
        },
        async saveProfile() {
            try {
                await api.put("/user/me", this.user);
                this.message = "Cập nhật thành công!";
                this.isEditing = false;
            } catch (error) {
                this.message = "Cập nhật thất bại!";
                console.error("Lỗi cập nhật:", error);
            }
        },
        cancelEdit() {
            this.isEditing = false;
            this.getUserInfo();
        },
    },
    mounted() {
        this.getUserInfo();
    },
};
</script>

<style scoped>
.input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    font-size: 16px;
    background-color: #f9fafb;
    outline: none;
    transition: border 0.3s;
}

.input-field:focus {
    border-color: #2563eb;
}

.btn-primary {
    background-color: #2563eb;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s;
}

.btn-primary:hover {
    background-color: #1d4ed8;
}

.btn-success {
    background-color: #16a34a;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s;
}

.btn-success:hover {
    background-color: #15803d;
}

.btn-danger {
    background-color: #dc2626;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
    transition: background 0.3s;
}

.btn-danger:hover {
    background-color: #b91c1c;
}
</style>

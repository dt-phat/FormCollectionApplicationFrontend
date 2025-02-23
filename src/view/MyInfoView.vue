<template>
    <div class="container">
        <h2>Thông Tin Cá Nhân</h2>
        <div class="info-box">
            <label>Mã người dùng:</label>
            <input v-model="user.id" type="text" :disabled="!isEditing" />
        </div>
        <div class="info-box">
            <label>Tên đăng nhập:</label>
            <input v-model="user.username" type="text" :disabled="!isEditing" />
        </div>
        <div class="info-box">
            <label>Tên:</label>
            <input v-model="user.firstName" type="text" :disabled="!isEditing" />
        </div>
        <div class="info-box">
            <label>Họ đệm:</label>
            <input v-model="user.lastName" type="text" :disabled="!isEditing" />
        </div>
        <div class="info-box">
            <label>Ngày sinh:</label>
            <input v-model="user.dob" type="date" :disabled="!isEditing" />
        </div>
        <div class="btn-group">
            <button v-if="!isEditing" @click="editProfile">Chỉnh sửa</button>
            <button v-if="isEditing" @click="saveProfile">Lưu</button>
            <button v-if="isEditing" @click="cancelEdit">Hủy</button>
        </div>

        <p v-if="message" class="message">{{ message }}</p>
    </div>
</template>

<script>
import { getUserInfo } from "../api/info";

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
            this.message = ""
            try {
                this.user = await getUserInfo();
            } catch (error) {
                this.message = "Không tìm thấy người dùng!"
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
.container {
    width: 500px;
    margin: 50px auto;
    padding: 20px;
    background: #242424;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
}

h2 {
    color: #007bff;
    margin-bottom: 20px;
}

.info-box {
    margin-bottom: 15px;
    text-align: left;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 15px;
}

.btn-group {
    margin-top: 20px;
}

button {
    margin: 5px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

button:first-child {
    background-color: #007bff;
    color: white;
}

button:nth-child(2) {
    background-color: #28a745;
    color: white;
}

button:last-child {
    background-color: #dc3545;
    color: white;
}

.message {
    margin-top: 15px;
    font-weight: bold;
    color: green;
}
</style>
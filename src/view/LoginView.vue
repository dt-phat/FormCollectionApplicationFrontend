<template>
    <div class="container">
        <h2>Đăng Nhập</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="username" type="text" placeholder="Tên đăng nhập" required />
            <input v-model="password" type="password" placeholder="Mật khẩu" required />
            <button type="submit">Đăng Nhập</button>
            <p>Chưa có tài khoản? <router-link to="/register">Đăng ký</router-link></p>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { login } from "../api/auth"

export default {
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async handleLogin() {
            try {
                await login(this.username, this.password);
                this.$router.push("/my-info");
            }
            catch (error) {
                this.errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng!"
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
}

input {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    margin-top: 15px;
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
}

.error {
    color: red;
}
</style>
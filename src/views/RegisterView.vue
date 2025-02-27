<!-- <template>
    <div class="container">
        <h1 class="">Đăng Ký</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="firstname">Tên của bạn</label>
                <input id="firstname" v-model="firstname" type="text" required />
            </div>

            <div class="form-group">
                <label for="lastname">Họ đệm của bạn</label>
                <input id="lastname" v-model="lastname" type="text" required />
            </div>

            <div class="form-group">
                <label for="username">Tên đăng nhập</label>
                <input id="username" v-model="username" type="text" required />
            </div>

            <div class="form-group">
                <label for="password">Mật khẩu</label>
                <input id="password" v-model="password" type="password" required />
            </div>

            <div class="form-group">
                <label for="dob">Ngày sinh</label>
                <input id="dob" v-model="dob" type="date" required />
            </div>

            <button type="submit">Đăng Ký</button>
            <p>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { register } from "../api/authApi";

export default {
    data() {
        return {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            dob: "",
            errorMessage: "",
        };
    },
    methods: {
        async handleRegister() {
            this.errorMessage = "";

            if (this.username.length < 4) {
                this.errorMessage = "Tên đăng nhập phải ít nhất 4 ký tự";
                return;
            }
            if (this.password.length < 6) {
                this.errorMessage = "Mật khẩu phải có ít nhất 6 ký tự";
                return;
            }

            try {
                await register(this.username, this.password, this.firstname, this.lastname, this.dob);
                alert("Đăng ký thành công!");
                this.$router.push("/login");
            } catch (error) {
                this.errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
            }
        },
    },
};
</script>

<style scoped>
.container {
    width: 500px;
    margin: 100px auto;
    padding: 0px 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    text-align: center;
    background: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #333;
}

.form-group {
    text-align: left;
    margin-bottom: 10px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    color: #555;
}

input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

button {
    margin-top: 10px;
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

p {
    color: #333;
}

.error {
    color: red;
    margin-top: 10px;
    font-size: 14px;
}
</style> -->
<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-center text-gray-800">Đăng Ký</h1>
        <form @submit.prevent="handleRegister" class="mt-4 space-y-4">
            <div>
                <label for="firstname" class="block text-sm font-medium text-gray-700">Tên của bạn</label>
                <input id="firstname" v-model="firstname" type="text" required
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label for="lastname" class="block text-sm font-medium text-gray-700">Họ đệm của bạn</label>
                <input id="lastname" v-model="lastname" type="text" required
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label for="username" class="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                <input id="username" v-model="username" type="text" required
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <input id="password" v-model="password" type="password" required
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <div>
                <label for="dob" class="block text-sm font-medium text-gray-700">Ngày sinh</label>
                <input id="dob" v-model="dob" type="date" required
                    class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>

            <button type="submit"
                class="w-full mt-4 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">Đăng
                Ký</button>
            <p class="text-center mt-2 text-gray-600">Đã có tài khoản? <router-link to="/login"
                    class="text-blue-500">Đăng nhập</router-link></p>
            <p v-if="errorMessage" class="text-red-500 text-center mt-2 text-sm">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { register } from "../api/authApi";

export default {
    data() {
        return {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            dob: "",
            errorMessage: "",
        };
    },
    methods: {
        async handleRegister() {
            this.errorMessage = "";

            if (this.username.length < 4) {
                this.errorMessage = "Tên đăng nhập phải ít nhất 4 ký tự";
                return;
            }
            if (this.password.length < 6) {
                this.errorMessage = "Mật khẩu phải có ít nhất 6 ký tự";
                return;
            }

            try {
                await register(this.username, this.password, this.firstname, this.lastname, this.dob);
                alert("Đăng ký thành công!");
                this.$router.push("/login");
            } catch (error) {
                this.errorMessage = error.response?.data?.message || "Đăng ký thất bại!";
            }
        },
    },
};
</script>
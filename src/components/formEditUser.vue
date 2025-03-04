<template>
  <div class="form-overlay"> 
    <div class="form-container">
      <h3>Cập Nhật Người Dùng</h3>
      <label >ID</label>
      <input v-model="user.id" disabled/>  

      <label for="tendangnhap">Tên đăng nhập</label>
      <input id="tendangnhap" v-model="editedUser.username"/>

      <label for="ho">Họ</label>
      <input id="ho" v-model="editedUser.firstName"/>
      
      <label for="ten">Tên </label>
      <input id="ten" v-model="editedUser.lastName"/>

      <label for="ngaysinh">Ngày sinh</label>
      <input id="ngaysinh" v-model="editedUser.dob" type="date"/>

      <button @click="submitForm" class="submit">Lưu</button>
      <button @click="$emit('close')" class="cancel">Hủy</button>
    </div>
  </div>
</template>

<script>
import { updateUser } from "../api/userApi"; // Import API cập nhật người dùng

export default {
  props: ["user"],
  data() {
    return {
      errorMessages: "",
      editedUser: { ...this.user },
    };
  },
  methods: {
    async submitForm() {
      try {
        const { id, ...userData } = this.editedUser;
        const updatedUser = await updateUser(id, userData);

        console.log("Người dùng đã cập nhật:", updatedUser || this.editedUser);

        this.$emit("update", updatedUser || this.editedUser);
        this.$emit("close");
      } 
      catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
        this.errorMessages = "Cập nhật thất bại! Vui lòng thử lại.";
      }
    },
    resetForm() {
      this.editedUser = { id: "", username: "", firstName: "", lastName: "", dob: "" };
      this.errorMessages = "";
    },
  },
  watch: {
    user(newUser) {
      this.editedUser = { ...newUser };
    },
  },
};
</script>


<style scoped>

.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}

label {
  display: block;
  font-weight: bold;
  text-align: left;
  margin: 10px 0px 0px 0px;
}

input, select {
  width: 100%;
  margin: 2px 0 0 0;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 8px 15px;
  margin: 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.cancel {
  background-color: red;
  color: white;
}

.submit {
background-color: green;
  color: white;
}
</style>

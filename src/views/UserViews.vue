<template>
  <div>
    <h1>DANH SÁCH NGƯỜI DÙNG</h1>
    <div v-if="loading">Đang tải...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên đăng nhập</th>
          <th>Họ</th>
          <th>Tên</th>
          <th>Ngày sinh</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ (user.firstName || '') }}</td>
          <td>{{ (user.lastName || '') }}</td>
          <td>{{ user.dob || 'Chưa cập nhật' }}</td>
          <td>
               <div class="action">
                  <button class="delete" @click="confirmDelete(user.id)">XÓA</button>
                  <button class="edit" @click="openFormEdit(user)">Chỉnh sửa</button>
               </div>
          </td>
        </tr>
      </tbody>
    </table>
    <UserEditForm 
      v-if="selectedUser" 
      :user="selectedUser" 
      @update="updateUserInfo" 
      @close="selectedUser = null" 
    />

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { deleteUser, getUsers, updateUser } from "../api/userApi";
import UserEditForm from "../components/formEditUser.vue"; 

export default {
  components: { UserEditForm},

  setup() {
    const users = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const selectedUser = ref(null);

    const fetchUser = (async () => {
      try {
        users.value = (await getUsers()).result;
        console.log("Danh sách users:", users.value); // Kiểm tra dữ liệu nhận được
      } catch (err) {
        error.value = "Không thể lấy danh sách người dùng: " + (err.response?.data?.message || err.message);
        console.error("Lỗi khi gọi API:", err);
      } finally {
        loading.value = false;
      }
    });

    const confirmDelete = async (id) => {
      if (confirm("Bạn có chắc chắn muốn xóa người dùng này ?")){
        try {
          await deleteUser(id);
          users.value = users.value.filter(users => users.id !== id);
          console.log(` Người dùng có id ${id} đã bị xóa`);
        }
        catch (error) {
          error.value = "Không thể xóa người dùng: " + (err.response?.data?.message || err.message);
          throw error;
        }
      }
    }

    const openFormEdit = (user) => {
      selectedUser.value = { ...user};
    }

    const updateUserInfo = (updatedUser) => {
      users.value = users.value.map(u => (u.id === updatedUser.id ? updatedUser : u));
      selectedUser.value = null; // Đóng form sau khi cập nhật
    }

    onMounted(fetchUser);
    return { users, loading, error, confirmDelete, updateUserInfo, selectedUser, openFormEdit};


  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-weight: bold;
  font-size: 28px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
  text-align: center;
}

th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

tr:nth-child(odd) {
  background-color: #f8f9fa;
}

 .delete {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

 .delete:hover {
  background-color: #c82333;
}

 .edit {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
}

 .edit:hover {
  background-color: #218838;
}

.action {
  display: flex;
  justify-content: space-evenly;
}

.error {
  color: #b30000;
  font-weight: bold;
  margin-top: 10px;
}
</style>

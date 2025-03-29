<template>
  <div class="container">
    <h1>DANH SÁCH NGƯỜI DÙNG</h1>
    <div v-if="loading" class="loading">Đang tải...</div>
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
          <td>{{ user.firstName || '' }}</td>
          <td>{{ user.lastName || '' }}</td>
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
  components: { UserEditForm },

  setup() {
    const users = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const selectedUser = ref(null);

    const fetchUser = async () => {
      try {
        users.value = (await getUsers()).result;
      } catch (err) {
        error.value = "Không thể lấy danh sách người dùng: " + (err.response?.data?.message || err.message);
      } finally {
        loading.value = false;
      }
    };

    const confirmDelete = async (id) => {
      if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
        try {
          await deleteUser(id);
          users.value = users.value.filter(user => user.id !== id);
        } catch (err) {
          error.value = "Không thể xóa người dùng: " + (err.response?.data?.message || err.message);
        }
      }
    };

    const openFormEdit = (user) => {
      selectedUser.value = { ...user };
    };

    const updateUserInfo = (updatedUser) => {
      users.value = users.value.map(u => (u.id === updatedUser.id ? updatedUser : u));
      selectedUser.value = null;
    };

    onMounted(fetchUser);
    return { users, loading, error, confirmDelete, updateUserInfo, selectedUser, openFormEdit };
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.loading {
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
}

.error {
  color: #b30000;
  font-weight: bold;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

tr:hover {
  background-color: #e2e6ea;
}

.action {
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.delete {
  background-color: #dc3545;
  color: white;
}

.delete:hover {
  background-color: #c82333;
}

.edit {
  background-color: #28a745;
  color: white;
}

.edit:hover {
  background-color: #218838;
}
</style>

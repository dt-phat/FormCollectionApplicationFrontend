import api from "./axios";

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    throw error;
  }
};

// xóa người dùng
export const deleteUser = async (ID) => {
  try {
    await api.delete(`/users/${ID}`);
  }
  catch (error) {
    console.error("Lỗi khi xóa :", error);
    throw error;
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const response = await api.put(`/users/${id}`, updateData);
    return response.data;
  }
  catch (error) {
    console.log(` Lỗi khi cập nhật`, error);
    throw error;
  }
};
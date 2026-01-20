import axios from "axios";
import { API_URL } from "../../NwConfig";

export const DeleteRegistration = async (data) => {
  try {
    const response = await axios.delete(`${API_URL}/api/register/deleteregistration`, {
      data: data,
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting registration:', error);
    return { success: false, message: error.response?.data?.message || 'Network error' };
  }
};

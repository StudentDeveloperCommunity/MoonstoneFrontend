import axios from "axios";
import { API_URL } from "../../NwConfig";

const UpdateSponsor = async (sponsorId, formData) => {
  try {
    // Prefer explicit update path to avoid dynamic route matching issues
    const res = await axios.put(`${API_URL}/api/sponsor/update/${sponsorId}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating sponsor:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update sponsor",
    };
  }
};

export default UpdateSponsor;

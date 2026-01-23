import axios from "axios";
import { API_URL } from "../../NwConfig";

const UpdateSponsor = async (sponsorId, formData) => {
  try {
    // Add sponsorId to formData for POST request
    formData.append("sponsorId", sponsorId);
    
    // Use POST method like delete route
    const res = await axios.post(`${API_URL}/api/sponsor/update`, formData, {
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

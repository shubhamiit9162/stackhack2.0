import axios from "axios";
class TheaterService {
  static BASE_URL = "http://localhost:1010";

  static async addTheater(TheaterData, token) {
    try {
      const response = await axios.post(
        `${TheaterService.BASE_URL}/admin/theaters/add`,
        TheaterData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllTheaters(token) {
    try {
      const response = await axios.get(
        `${TheaterService.BASE_URL}/admin/theaters`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getTheaterById(theaterId, token) {
    try {
      const response = await axios.get(
        `${TheaterService.BASE_URL}/admin/theaters/${theaterId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching theater by ID:", err);
      throw err;
    }
  }

  static async deleteTheater(TheaterId, token) {
    try {
      const response = await axios.delete(
        `${TheaterService.BASE_URL}/admin/theaters/delete/${TheaterId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateTheater(theaterId, Theaters, token) {
    try {
      const response = await axios.put(
        `${TheaterService.BASE_URL}/admin/theaters/update/${theaterId}`,
        Theaters,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Update Response:", response.data);
      return response.data;
    } catch (err) {
      console.error(
        "Error in updateTheater:",
        err.response ? err.response.data : err.message
      );
      throw err;
    }
  }
}
export default TheaterService;

// src/api/userApi.js
import axios from "axios";

const API_BASE_URL = "https://nexusdndn.duckdns.org/api"; // Swagger에서 base 확인 필요

// 회원가입 API
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error.response ? error.response.data : error.message);
    throw error;
  }
};

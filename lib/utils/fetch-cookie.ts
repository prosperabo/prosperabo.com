// src/utils/fetchCookie.ts
import useAuthStore from "@/stores/auth/token.store";

const fetchCookie = async () => {
  try {
    const response = await fetch('/api/get-cookie');
    if (!response.ok) {
      throw new Error('Failed to fetch auth token');
    }
    const data = await response.json();
    useAuthStore.getState().setToken(data.token);
  } catch (error) {
    console.error(error);
  }
};

export default fetchCookie;

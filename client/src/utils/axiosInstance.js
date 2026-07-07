import axios from "axios";

// A pre-configured axios instance. Any request made with this
// automatically carries the logged-in user's JWT token, so we don't
// have to manually attach it everywhere.
const authAxios = axios.create();

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("chat-app-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authAxios;

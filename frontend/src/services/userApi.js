import api from "./api";

export const registerUser = async (userData) => {
    const response = await api.post("/api/users", userData);
    return response.data;
};

export const loginUser = async (loginData) => {
    const response = await api.post("/api/users/login", loginData);
    return response.data;
};

export const getUsers = async () => {
    const response = await api.get("/api/users");
    return response.data;
};

export const getUserById = async (id) => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
};
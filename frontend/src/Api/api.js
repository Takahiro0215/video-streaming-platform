import axios from "axios";

const API = "http://localhost:3010";

export const loginUser = (email, password) => {
    return axios.post(`${API}/auth/login`, {
        email,
        password,
    });
};

export const signupUser = (email, password) => {
    return axios.post(`${API}/auth/signup`, {
        email,
        password,
    });
};

export const getVideos = () => {
    return axios.get(`${API}/videoRouter/videos`);
};

export const addVideo = (title, description, url, token) => {
    return axios.post(
        `${API}/videoRouter/add`,
        { title, description, url },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteVideo = (id, token) => {
    return axios.delete(`${API}/videoRouter/videos/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updatePassword = (email, currentPassword, newPassword, token) => {
    return axios.put(
        `${API}/auth/updatePassword`,
        {
            email,
            currentPassword,
            newPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteAccount = (password, token) => {
    return axios.delete(`${API}/auth/deleteAccount`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { password },
    });
};

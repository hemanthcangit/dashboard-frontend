import axios from "axios";
const API_URL = "http://localhost:8080/dashboard";

export const getAllDashboards = () => {
    return axios.get(API_URL);
};

export const getDashboardById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createDashboard = (dashboard) => {
    return axios.post(API_URL, dashboard);
};

export const updateDashboard = (id) => {
    return axios.put(`${API_URL}/${id}`, dashboard);
};

export const deleteDashboard = (id) =>{
    return axios.delete(`${API_URL}/${id}`);
};
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
});

export const getStudents = async () => {
    const response = await api.get("/student");
    return response.data;
}

export const addStudent = async (student) => {
    return await api.post("/student", student);
}

export const updateStudent = async (id, student) => {
    return await api.put(`/student/${id}`, student);
}

export const deleteStudent = async (id) => {
    return await api.delete(`/student/${id}`);
}
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Ensure the correct backend URL

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error; // Re-throw the error for handling in the component
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Doctors List
export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/doctors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error.response?.data || error.message);
    throw error;
  }
};

// Book Appointment
export const bookAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_URL}/appointments/book`, appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Doctor's Appointments
export const getDoctorAppointments = async (doctorId) => {
  try {
    const response = await axios.get(`${API_URL}/appointments?doctorId=${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch Patient's Appointments
export const getPatientAppointments = async (patientId) => {
  try {
    const response = await axios.get(`${API_URL}/appointments?patientId=${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient appointments:", error.response?.data || error.message);
    throw error;
  }
};

// Admin: Fetch All Appointments
export const getAllAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/appointments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all appointments:", error.response?.data || error.message);
    throw error;
  }
};
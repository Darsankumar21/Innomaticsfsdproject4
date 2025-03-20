import { useEffect, useState } from "react";
import { getAllAppointments } from "../api/api";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [showPatientsTable, setShowPatientsTable] = useState(true); // Default to showing Patients Table

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAllAppointments();
        setAppointments(data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      }
    };
    fetchAppointments();
  }, []);

  // Dummy Data for Testing
  const dummyAppointments = [
    {
      _id: "1",
      patient: { name: "Darsan" },
      doctor: { name: "Dr. Surya", specialization: "Ortho" },
      date: "20-03-2025",
      timeSlot: "3:00 PM",
      status: "Active",
    },
    {
      _id: "2",
      patient: { name: "Rahul" },
      doctor: { name: "Dr. Meera", specialization: "Cardio" },
      date: "21-03-2025",
      timeSlot: "10:00 AM",
      status: "Completed",
    },
    {
      _id: "3",
      patient: { name: "Ananya" },
      doctor: { name: "Dr. Rajesh", specialization: "Dermatology" },
      date: "22-03-2025",
      timeSlot: "1:30 PM",
      status: "Cancelled",
    },
  ];

  const [appointmentsData, setAppointmentsData] = useState(dummyAppointments);

  // Function to update the appointment status
  const updateStatus = (id, newStatus) => {
    setAppointmentsData((prevAppointments) =>
      prevAppointments.map((appt) =>
        appt._id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Admin Dashboard
      </h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setShowPatientsTable(true)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            showPatientsTable
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          Patient Appointment Details
        </button>
        <button
          onClick={() => setShowPatientsTable(false)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            !showPatientsTable
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          Doctor Appointment Details
        </button>
      </div>

      {/* Patients Data Table */}
      {showPatientsTable && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Patients' Appointments
          </h3>
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm">
                <th className="border p-3">Patient Name</th>
                <th className="border p-3">Doctor</th>
                <th className="border p-3">Specialization</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Time</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((appt) => (
                <tr key={appt._id} className="text-center even:bg-gray-100">
                  <td className="border p-3">{appt.patient.name}</td>
                  <td className="border p-3">{appt.doctor.name}</td>
                  <td className="border p-3">{appt.doctor.specialization}</td>
                  <td className="border p-3">{appt.date}</td>
                  <td className="border p-3">{appt.timeSlot}</td>
                  <td className="border p-3">
                    <select
                      value={appt.status}
                      onChange={(e) => updateStatus(appt._id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        appt.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : appt.status === "Completed"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Doctors Data Table */}
      {!showPatientsTable && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Doctors' Appointments
          </h3>
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm">
                <th className="border p-3">Doctor Name</th>
                <th className="border p-3">Specialization</th>
                <th className="border p-3">Patient Name</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Time</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((appt) => (
                <tr key={appt._id} className="text-center even:bg-gray-100">
                  <td className="border p-3">{appt.doctor.name}</td>
                  <td className="border p-3">{appt.doctor.specialization}</td>
                  <td className="border p-3">{appt.patient.name}</td>
                  <td className="border p-3">{appt.date}</td>
                  <td className="border p-3">{appt.timeSlot}</td>
                  <td className="border p-3">
                    <select
                      value={appt.status}
                      onChange={(e) => updateStatus(appt._id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        appt.status === "Active"
                          ? "bg-green-200 text-green-800"
                          : appt.status === "Completed"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

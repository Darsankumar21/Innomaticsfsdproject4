import { useState } from "react";

const DoctorDashboard = () => {
  // Dummy data with Indian names
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "Rajesh Kumar", date: "21-03-2025", time: "10:00 AM", status: "Active" },
    { id: 2, patientName: "Ananya Sharma", date: "22-03-2025", time: "11:30 AM", status: "Active" },
    { id: 3, patientName: "Vikram Singh", date: "23-03-2025", time: "02:00 PM", status: "Active" },
    { id: 4, patientName: "Pooja Iyer", date: "24-03-2025", time: "04:00 PM", status: "Active" },
  ]);

  // Handle status update
  const updateStatus = (id, newStatus) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Doctor Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border p-3">Patient Name</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Time</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="text-center border-b hover:bg-gray-100">
                <td className="border p-3">{appt.patientName}</td>
                <td className="border p-3">{appt.date}</td>
                <td className="border p-3">{appt.time}</td>
                <td
                  className={`border p-3 font-semibold ${
                    appt.status === "Completed" ? "text-green-600" :
                    appt.status === "Cancelled" ? "text-red-600" :
                    "text-yellow-600"
                  }`}
                >
                  {appt.status}
                </td>
                <td className="border p-3">
                  {appt.status === "Active" ? (
                    <>
                      <button
                        onClick={() => updateStatus(appt.id, "Completed")}
                        className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-700 transition"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateStatus(appt.id, "Cancelled")}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span
                      className={`font-semibold px-3 py-1 rounded-md ${
                        appt.status === "Completed" ? "text-green-600" :
                        appt.status === "Cancelled" ? "text-red-600" :
                        "text-gray-600"
                      }`}
                    >
                      {appt.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="5" className="border p-3 text-center text-gray-500">
                  No Appointments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;

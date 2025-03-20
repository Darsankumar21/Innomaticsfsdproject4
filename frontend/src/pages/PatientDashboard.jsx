import { useState } from "react";

const PatientDashboard = () => {
  const [doctors] = useState([
    { id: 1, name: "Dr. Rajesh Khanna", specialization: "Cardiologist", timeSlots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { id: 2, name: "Dr. Priya Sharma", specialization: "Dermatologist", timeSlots: ["9:00 AM", "1:00 PM", "3:00 PM"] },
    { id: 3, name: "Dr. Arvind Kumar", specialization: "Neurologist", timeSlots: ["11:00 AM", "5:00 PM", "7:00 PM"] },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) {
      alert("Please select doctor, date, and slot.");
      return;
    }

    const newAppointment = {
      doctorName: selectedDoctor.name,
      date: selectedDate,
      time: selectedSlot,
    };

    setAppointments([...appointments, newAppointment]);

    // Reset selection
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedSlot("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Patient Dashboard</h2>

      {/* Doctor Selection Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-3/4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className={`border p-3 rounded-lg shadow-md cursor-pointer transition ${
              selectedDoctor?.id === doctor.id ? "bg-blue-500 text-white" : "bg-white"
            } hover:bg-blue-100`}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <h3 className="text-lg font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialization}</p>
          </div>
        ))}
      </div>

      {/* Appointment Booking Section */}
      {selectedDoctor && (
        <div className="mt-6 p-4 border rounded-lg shadow-md bg-white w-3/4">
          <h3 className="text-lg font-semibold text-blue-700">
            Book Appointment with {selectedDoctor.name}
          </h3>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 w-full mt-2 rounded"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedDoctor.timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedSlot(slot)}
                className={`px-3 py-1 rounded text-sm transition ${
                  selectedSlot === slot ? "bg-green-500 text-white" : "bg-gray-200"
                } hover:bg-green-400`}
              >
                {slot}
              </button>
            ))}
          </div>
          <button
            onClick={handleBookAppointment}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full hover:bg-green-700 transition"
          >
            Confirm Appointment
          </button>
        </div>
      )}

      {/* Booked Appointments Table */}
      <div className="mt-6 w-3/4">
        <h3 className="text-lg font-semibold text-gray-700">Booked Appointments</h3>
        <div className="overflow-x-auto">
          <table className="w-3/4 mx-auto border-collapse border border-gray-300 bg-white shadow-md mt-2 text-sm">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border px-4 py-2">Doctor Name</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <tr key={index} className="text-center border-b hover:bg-gray-50">
                    <td className="border px-4 py-2">{appt.doctorName}</td>
                    <td className="border px-4 py-2">{appt.date}</td>
                    <td className="border px-4 py-2">{appt.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border px-4 py-2 text-center text-gray-500">
                    No Appointments Booked
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

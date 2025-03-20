import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarPlus } from "react-icons/fa";

const Navbar = ({ scrollToSection, homeRef, aboutRef, contactRef }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav className="bg-blue-600 py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full shadow-lg z-50">
      {/* Logo */}
      <div className="flex items-center text-white text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        <FaCalendarPlus className="mr-2 text-2xl" /> {/* Appointment Icon */}
        Appointment Booking
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-6">
        <button
          onClick={() => scrollToSection(homeRef)}
          className="relative text-white font-medium hover:text-blue-300 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection(aboutRef)}
          className="relative text-white font-medium hover:text-blue-300 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          About Us
        </button>
        <button
          onClick={() => scrollToSection(contactRef)}
          className="relative text-white font-medium hover:text-blue-300 transition duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
        >
          Contact Us
        </button>

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-bold px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <a
            href="/register"
            className="bg-green-500 text-white font-bold px-4 py-2 rounded-md transition-all duration-300 transform hover:scale-105 hover:bg-green-700"
          >
            Register
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

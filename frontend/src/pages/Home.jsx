import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons
import Navbar from "../components/Navbar";

const Home = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGetStarted = () => {
    if (user) {
      // Redirect based on user category
      if (user.category === "admin") {
        navigate("/admin-dashboard");
      } else if (user.category === "doctor") {
        navigate("/doctor-dashboard");
      } else {
        navigate("/patient-dashboard");
      }
    } else {
      navigate("/register"); // Redirect to register if no user is logged in
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar scrollToSection={scrollToSection} homeRef={homeRef} aboutRef={aboutRef} contactRef={contactRef} />

      {/* Home Section */}
      <section ref={homeRef} className="p-10 h-screen flex flex-col justify-center items-center bg-blue-100 text-center">
        <h1 className="text-5xl font-extrabold text-blue-600">Book Appointments with Ease</h1>
        <p className="text-lg text-gray-700 mt-4 max-w-3xl">
          Your health is our priority. Find the best doctors, schedule appointments instantly, and manage your 
          medical visits effortlessly with our online appointment booking system.
        </p>
        {/* Get Started Button - Redirects to Dashboard if logged in, else to Register Page */}
        <button 
          onClick={handleGetStarted}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </button>
      </section>

      {/* About Us Section */}
      <section ref={aboutRef} className="p-10 h-screen flex flex-col justify-center items-center bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl">
          We are dedicated to making healthcare more accessible and hassle-free. Our platform connects patients with 
          expert doctors across various specialties, ensuring quality medical services with just a few clicks.
        </p>
        <p className="text-lg text-gray-600 mt-2 max-w-3xl">
          Say goodbye to long waiting hours. With our streamlined appointment booking system, you can consult 
          with top healthcare professionals from the comfort of your home.
        </p>
      </section>

      {/* Contact Us (Footer) */}
      <footer ref={contactRef} className="bg-blue-900 text-white py-10 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold">Contact Us</h2>
          <p className="mt-4 text-gray-300">
            📍 Location: Hyderabad, India<br />
            📞 Phone: +91 9876543210<br />
            📧 Email: <a href="mailto:support@appointmentbooker.com" className="underline hover:text-gray-400">support@appointmentbooker.com</a>
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 text-xl">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 text-xl">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 text-xl">
              <FaInstagram />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;

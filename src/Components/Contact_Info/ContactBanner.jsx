import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const ContactBanner = () => {

  const { user } = useAuth()
  // const navigate = useNavigate()

  return (
    <div
      className="hero bg-no-repeat bg-fixed h-[380px]"
      style={{
        backgroundImage:
          "url(https://desertbarbell.co/cdn/shop/files/Untitled_1800_x_1200_px_5.png?v=1696333226&width=3840)",
      }}>
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center">
        <div className="text-white">
          <h1 className="mb-5 text-3xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mb-5 max-w-2xl mx-auto text-gray-300">
            Connect with us to optimize your fitness journey! Our contact page
            is your gateway to personalized guidance, expert advice, and
            tailored support on your path to a healthier, stronger you.
          </p>
          <Link to={user ? '/dashboard/bmi_calculator' : '/login'}
            className="font-semibold border-b border-secondary px-3 uppercase hover:text-secondary"
          >
            Get Started today
          </Link>
        </div>
      </div>
    </div >
  );
};

export default ContactBanner;

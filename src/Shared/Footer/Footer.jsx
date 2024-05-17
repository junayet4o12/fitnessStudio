import { IoLocation, IoMail } from "react-icons/io5";
import { PiPhoneCallBold } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Container from "../../Components/Container/Container";
import moment from "moment";

const Footer = () => {
  return (
    <>
      <div className="bg-primary/50 rounded-tl-md rounded-tr-md px-5 lg:px-0">

        <Container>
          <div className=" text-white/90 py-6 grid grid-cols-2 md:grid-cols-4">
            <div className="mt-12">
              <img
                className="h-24 w-32 md:h-36 md:w-44 lg:h-44 lg:w-52"
                src="/WhatsApp_Image_2024-01-15_at_22.22.44_f2a3d1eb-removebg-preview.png"
                alt=""
              />
            </div>
            <div className="mt-8">
              <h1 className="md:text-lg lg:text-2xl font-bold">Social Media</h1>
              <Link className="flex gap-1 items-center">
                <FaFacebook className="text-xl lg:text-4xl text-blue-700 mt-2 bg-white rounded-full"></FaFacebook>{" "}
                <span className="text-base lg:font-semibold">
                  Facebook
                </span>
              </Link>
              <Link className="flex gap-2 items-center">
                {" "}
                <img
                  className="h-4 w-4 lg:h-8 lg:w-8 mt-2"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                  alt=""
                />{" "}
                <span className="text-base lg:font-semibold">
                  Instagram
                </span>
              </Link>
              <Link className="flex gap-2 items-center">
                {" "}
                <img
                  className="h-4 w-4 lg:h-8 lg:w-8 mt-2 bg-white rounded-md"
                  src="https://cdn-icons-png.flaticon.com/256/174/174857.png"
                  alt=""
                />{" "}
                <span className="text-base lg:font-semibold">
                  LinkedIn
                </span>
              </Link>
              <Link className="flex gap-2 items-center">
                {" "}
                <img
                  className="h-4 w-4 lg:h-8 lg:w-8 mt-2"
                  src="https://static-00.iconduck.com/assets.00/twitter-icon-512x512-opdohtno.png"
                  alt=""
                />{" "}
                <span className="text-base lg:font-semibold">
                  Twitter
                </span>
              </Link>
            </div>
            <div className="mt-8">
              <h1 className="md:text-lg lg:text-2xl font-bold lg:mb-2">Pages</h1>
              <p>
                <Link
                  to="/"
                  className=" lg:font-semibold underline hover:text-primary">
                  Home
                </Link>
              </p>
              <p>
                <Link
                  to="/blogs"
                  className=" lg:font-semibold underline hover:text-primary">
                  Blogs
                </Link>
              </p>
              <p>
                <Link
                  to="/specialRecipe"
                  className=" lg:font-semibold underline hover:text-primary">
                  Special Recipy
                </Link>
              </p>
              <p>
                <Link
                  to="/shop"
                  className=" lg:font-semibold underline hover:text-primary">
                  Shop
                </Link>
              </p>
              <p>
                <Link
                  to="/about_us"
                  className=" lg:font-semibold underline hover:text-primary">
                  About Us
                </Link>
              </p>
              <p>
                <Link
                  to="/contact_us"
                  className=" lg:font-semibold underline hover:text-primary">
                  Contact Us
                </Link>
              </p>
            </div>
            <div className="mt-8">
              <h1 className="md:text-lg lg:text-2xl font-bold mb-2">Address</h1>
              <p className="flex gap-1 items-center">
                <IoLocation className="text-3xl"></IoLocation>{" "}
                <span className="text-sm md:text-base">
                  {" "}
                  Dhanmondi, Dhaka, Bangladesh
                </span>
              </p>
              <p className="flex gap-1 items-center mt-2">
                <IoMail className="text-3xl" />
                <span className="text-sm md:text-base">
                  fitness@studio.com
                </span>
              </p>
              <p className="flex gap-1 items-center mt-2">
                <PiPhoneCallBold className="text-3xl"></PiPhoneCallBold>
                <span className="text-sm md:text-base bmiNumber">
                  +880: 1454256543
                </span>
              </p>
            </div>
          </div>
          <hr className="border-white/90 border-[1.3px]" />
          <div className="footer footer-center p-4  text-white/90">
            <aside>
              <p>{`Copyright © ${moment().format("YYYY")} - All right reserved by FITNESS STUDIO Ltd.`}</p>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;

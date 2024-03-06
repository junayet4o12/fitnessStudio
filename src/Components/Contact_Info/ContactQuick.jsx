import Container from "../Container/Container";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import Title from "../Title/Title";


const ContactQuick = () => {
    return (
        <>
            <Container>
                <div className="lg:mt-16"></div>
                <Title title={"Quick Contact Us"}></Title>
                <div className="grid grid-cols-2 md:grid-cols-none md:flex gap-2 md:gap-5 md:max-w-2xl lg:max-w-3xl md:mx-auto mx-4 mb-8 text-black">
                    <div className="bg-orange-100 p-3 md:p-6 rounded-md w-36 md:w-96 md:h-44">
                        <FaLocationDot className="text-2xl md:text-4xl text-blue-600 md:mb-3" />
                        <p className="text-md md:text-lg font-bold">Address</p>
                        <p className="text-xs md:text-base bmiNumber">12 No. Road Dhanmondi, Dhaka Bangladesh</p>
                    </div>
                    <div className="bg-lime-100 p-3 md:p-6 rounded-md w-36 md:w-96 md:h-44">
                        <IoMail className="text-2xl md:text-4xl text-red-600 md:mb-3" />
                        <p className="text-md md:text-lg font-bold">Mail</p>
                        <p className="text-xs md:text-base">fitness@studio.com</p>
                    </div>
                    <div className="bg-light-green-200 p-3 md:p-6 rounded-md w-36 md:w-96 md:h-44">
                        <FaPhoneAlt className="text-2xl md:text-4xl text-green-600 md:mb-3" />
                        <p className="text-md md:text-lg font-bold">Phone</p>
                        <p className="text-xs md:text-base bmiNumber">+880- 1454-256543</p>
                    </div>
                </div>
            </Container>
            {/* Google Map Section */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9362048023486!2d90.37275122573435!3d23.749654252063543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4d08c0355d%3A0x8ed725d38302c3e7!2zMTIg4Kan4Ka-4Kao4Kau4Kao4KeN4Kah4Ka_IOCmrOCnjeCmsOCmv-CmnCwg4Kai4Ka-4KaV4Ka-IDEyMDU!5e0!3m2!1sbn!2sbd!4v1706164300208!5m2!1sbn!2sbd"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </>

    );
};

export default ContactQuick;
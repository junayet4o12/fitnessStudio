import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import toast from 'react-hot-toast';
import Title from '../Title/Title';

const ContactForm = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_3bc93lk', 'template_r5ho6pf', form.current, '762DomlD135fspJ-3')
            .then(() => {
                form.current.reset();
                toast.success("Message send succsessfully!")
                // console.log(result.text);
            }, (error) => {
                toast.error(error.text)
                // console.log(error.text);
            });
    };
    return (
        <div className=''>
            <Container>
                <div className='md:mt-8'></div>
                <Title title={"Message Us"}></Title>
                {/* Contact section */}
                <div className="flex gap-8 md:m-8 shadow-xl shadow-gray-500 ">
                    <div className="flex-1 hidden md:block">
                        <img className="h-full" src="https://media.discordapp.net/attachments/1177886803424976896/1199788105952133242/dLNlDo0GRPyraLXHtgU5_blog-Blush.jpg?ex=65f1f53f&is=65df803f&hm=99bef23b868e037b6a4c7055bdde4d3820bca87628a411788c0d758ee6cf79b2&=&format=webp&width=439&height=417" alt="" />
                    </div>
                    {/* Contact Feild */}
                    <div className="flex-1 px-8 md:px-4 py-4 text-black">
                        <form ref={form} onSubmit={sendEmail}>
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text text-lg font-bold  text-white">Name:</span>
                                </div>
                                <input type="text" name="from_name" placeholder="Type Your Name...." className="input input-bordered w-full input-info" />
                            </label>
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text text-lg font-bold text-white">Email:</span>
                                </div>
                                <input type="email" name="from_email" placeholder="Type Your Email...." className="input input-bordered w-full input-info" required />
                            </label>
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text text-lg font-bold text-white">Phone Number:</span>
                                </div>
                                <input type="number" name="phone_number" placeholder="Type Your Number...." className="input input-bordered w-full input-info" />
                            </label>
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text text-lg font-bold text-white">Message:</span>
                                </div>
                                <textarea name="message" placeholder="Type Your Message..." className="textarea textarea-bordered textarea-md w-full textarea-info max-w-md" required >
                                </textarea>
                            </label>
                            <button className="px-8 py-3 mt-5 bg-secondary outline rounded-lg text-white font-semibold hover:shadow-xl hover:shadow-gray-400 transition duration-700 ease-in-out">Submit</button>
                        </form>

                        {/* Social Media Icons */}
                        <div className="flex gap-5 mt-4 justify-center">
                            <Link to={''}>
                                <img
                                    className="h-8 w-8 mt-2" title="Facebook"
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
                                    alt="facebook"
                                />
                            </Link>
                            <Link to={''}>
                                <img
                                    className="h-8 w-9 mt-2" title="Instagram"
                                    src="https://i.ibb.co/gg8qnRV/2c262006d4020341cf101a9ba9d7b943.jpg"
                                    alt="instagram"
                                />
                            </Link>
                            <Link to={''}>
                                <img
                                    className="h-8 w-8 mt-2 bg-white rounded-md" title="LinkedIn"
                                    src="https://cdn-icons-png.flaticon.com/256/174/174857.png"
                                    alt="linkedIn"
                                />
                            </Link>
                            <Link to={''}>
                                <img
                                    className="h-8 w-8 mt-2" title="Twitter"
                                    src="https://static-00.iconduck.com/assets.00/twitter-icon-512x512-opdohtno.png"
                                    alt="twitter"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ContactForm;
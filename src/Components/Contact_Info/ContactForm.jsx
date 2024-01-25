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
        <>
            <Container>
                <div className='md:mt-8'></div>
                <Title title={"Message Us"}></Title>
                {/* Contact section */}
                <div className="flex gap-8 md:m-8 shadow-xl shadow-gray-500">
                    <div className="flex-1 hidden md:block">
                        <img className="h-full" src="https://media.discordapp.net/attachments/1177886803424976896/1199788105952133242/dLNlDo0GRPyraLXHtgU5_blog-Blush.jpg?ex=65c3d0bf&is=65b15bbf&hm=6d08e334af8a3b45f1fe3f3ce8570bcb7ecb6abd7c2ce3fee11a4194e12c9909&=&format=webp&width=439&height=417" alt="" />
                    </div>
                    {/* Contact Feild */}
                    <div className="flex-1 px-8 md:px-4 py-4">
                        <form ref={form} onSubmit={sendEmail}>
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text text-lg font-bold">Name:</span>
                                </div>
                                <input type="text" name="from_name" placeholder="Type Your Name...." className="input input-bordered w-full input-error" />
                            </label>
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text text-lg font-bold">Email:</span>
                                </div>
                                <input type="email" name="from_email" placeholder="Type Your Email...." className="input input-bordered w-full input-error" required />
                            </label>
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text text-lg font-bold">Phone Number:</span>
                                </div>
                                <input type="number" name="phone_number" placeholder="Type Your Number...." className="input input-bordered w-full input-error" />
                            </label>
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text text-lg font-bold">Message:</span>
                                </div>
                                <textarea name="message" placeholder="Type Your Message..." className="textarea textarea-bordered textarea-md w-full textarea-error max-w-md" required >
                                </textarea>
                            </label>
                            <button className="px-8 py-3 mt-5 bg-gradient-to-r from-primary to-secondary rounded-lg text-white font-semibold hover:shadow-xl hover:shadow-gray-400 transition duration-700 ease-in-out">Submit</button>
                        </form>

                        {/* Social Media Icons */}
                        <div className="flex gap-5 mt-4 justify-center">
                            <Link to={''}>
                                <img
                                    className="h-8 w-8 mt-2" title="Facebook"
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
                                    alt=""
                                />
                            </Link>
                            <Link to={''}>
                                <img
                                    className="h-8 w-8 mt-2" title="Instagram"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                                    alt=""
                                />
                            </Link>
                            <Link to={''}>
                                <img
                                    className="h-8 w-8 mt-2 bg-white rounded-md" title="LinkedIn"
                                    src="https://cdn-icons-png.flaticon.com/256/174/174857.png"
                                    alt=""
                                />
                            </Link>
                            <Link to={''}>
                                <img
                                    className="h-8 w-8 mt-2" title="Twitter"
                                    src="https://static-00.iconduck.com/assets.00/twitter-icon-512x512-opdohtno.png"
                                    alt=""
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ContactForm;
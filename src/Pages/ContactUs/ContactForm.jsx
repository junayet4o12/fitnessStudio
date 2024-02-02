import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Container from "../../Components/Container/Container";
import toast from 'react-hot-toast';

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
                <div>
                    <h1 className="text-4xl font-semibold text-center underline mt-8">Message Us</h1>
                </div>
                {/* Contact section */}
                <div className="flex gap-8 md:m-8 lg:m-12 shadow-xl shadow-gray-500">
                    <div className="flex-1 hidden md:block">
                        <img className="h-full" src="../src/assets/dLNlDo0GRPyraLXHtgU5_blog-Blush.jpg" alt="" />
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
                            <button className="px-8 py-3 mt-5 bg-orange-600 rounded-lg text-white font-semibold">Submit</button>
                        </form>

                        {/* Social Media Icons */}
                        <div className="flex gap-5 mt-4 justify-center">
                            {/* <FaFacebook title="Facebook" className="text-4xl text-blue-700 mt-2 bg-white rounded-full"></FaFacebook> */}
                            <img
                                className="h-8 w-8 mt-2" title="Facebook"
                                src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
                                alt=""
                            />
                            <img
                                className="h-8 w-8 mt-2" title="Instagram"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                                alt=""
                            />
                            <img
                                className="h-8 w-8 mt-2 bg-white rounded-md" title="LinkedIn"
                                src="https://cdn-icons-png.flaticon.com/256/174/174857.png"
                                alt=""
                            />
                            <img
                                className="h-8 w-8 mt-2" title="Twitter"
                                src="https://static-00.iconduck.com/assets.00/twitter-icon-512x512-opdohtno.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ContactForm;
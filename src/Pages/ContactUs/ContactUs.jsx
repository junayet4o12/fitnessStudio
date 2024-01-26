import ContactBanner from "../../Components/Contact_Info/ContactBanner";
import ContactForm from "../../Components/Contact_Info/ContactForm";
import ContactQuick from "../../Components/Contact_Info/ContactQuick";
import {Helmet} from 'react-helmet-async'
const ContactUs = () => {
    return (
        <div>
             <Helmet>
        <title>Contact us - FitnessStudio</title>
      </Helmet>
            <ContactBanner />
            <ContactForm />
            <ContactQuick />
        </div>
    );
};

export default ContactUs;
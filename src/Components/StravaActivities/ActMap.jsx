/* eslint-disable react/prop-types */
// import React from 'react';

const ActMap = ({map}) => {
    const googleMapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9362048023486!2d90.37275122573435!3d23.749654252063543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4d08c0355d%3A0x8ed725d38302c3e7!2zMTIg4Kan4Ka-4Kao4Kau4Kao4KeN4Kah4Ka_IOCmrOCnjeCmsOCmv-CmnCwg4Kai4Ka-4KaV4Ka-IDEyMDU!5e0!3m2!1sbn!2sbd&path=enc%3A${map?.summary_polyline}`;
    return (
        <div>
            {/* Google Map Section */}
            <iframe src={googleMapEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
    );
};

export default ActMap;
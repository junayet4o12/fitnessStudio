// import React from 'react';

import { DialogBody, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const useAgeSuggestions = (age) => {
    const [ageSuggestions, setAgeSuggestions] = useState('')
    useEffect(() => {
        let modalHeader = '';
        let modalDes = '';
        let modalSuggetions = '';
        if (age <= 12) {
            modalHeader = "You're a child";
            modalDes = `and it's between 5 and 12`;
            modalSuggetions = <>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Play with building blocks, puzzles, or art supplies.</li>
                    <li>Participate at age-appropriate educational games or interactive toys.</li>
                    <li>Plan with you parent for a family outing to a zoo, museum, or a kid-friendly event.</li>
                </ul>
            </>
        }
        else if (age >= 13 && age <= 17) {
            modalHeader = "You're a Teenager";
            modalDes = `and it's between 13 and 17`;
            modalSuggetions = <>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Read a book from a genre you enjoy or a popular series.</li>
                    <li>Consider sports equipment or gear related to your hobbies.</li>
                    <li>Go to Mosque or your religion tample for a better life and stay with friend a little bit</li>
                </ul>
            </>
        }
        else if (age >= 18 && age <= 25) {
            modalHeader = "You're a Young Adult";
            modalDes = `and it's between 18 and 25`;
            modalSuggetions = <>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Try to stay with tech gadgets, accessories, or subscriptions based on your interests.</li>
                    <li>Keep some Personalized items like custom jewelry, monogrammed accessories, or a custom-made piece of art.</li>
                    <li>Outdoor adventure experiences or cooking classes for a unique and memorable gift.</li>
                </ul>
            </>
        }
        else if (age >= 26 && age <= 40) {
            modalHeader = "You're an Adult";
            modalDes = `and it's between 26 and 40`;
            modalSuggetions = <>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>High-quality kitchen gadgets, personalized home decor, or a cozy blanket.</li>
                    <li>Subscription services like streaming, books, or gourmet food.</li>
                    <li>Consider a spa day, weekend getaway, or tickets to a favorite show or event.</li>
                </ul>
            </>
        }
        else if (age >= 41 && age <= 60) {
            modalHeader = "You're a Middle-aged Adult";
            modalDes = `and it's between 41 and 60`;
            modalSuggetions = <>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Classy accessories like a watch, leather goods, or a stylish bag.</li>
                    <li>Customized items such as engraved photo frames or personalized family gifts.</li>
                    <li>Relaxing experiences like a weekend retreat, spa package, or a fine dining experience.</li>
                </ul>
            </>
        }
        else if (age >= 61) {
            modalHeader = "You're a Senior person";
            modalDes = `and it's more than 60`;
            modalSuggetions = <>
                <ul className='list-decimal py-1 px-5 text-sm'>
                    <li>Thoughtful gifts like family photo albums, personalized calendars, or memory books.</li>
                    <li>Comfortable items such as a cozy blanket, warm slippers, or a heated throw.</li>
                    <li>Consider activities like gardening tools, hobby supplies, or tickets to a show or concert.</li>
                </ul>
            </>
        }
        setAgeSuggestions(
            <>
                <DialogHeader className='py-3 text-white'>{modalHeader}</DialogHeader>
                <DialogBody className='py-0 text-white'>
                    <p className='text-lg text-white'>Cause, your age is {age}. {modalDes}</p>
                    <p className='font-bold text-sm underline'>Suggestions According to your age:</p>
                    {modalSuggetions}
                </DialogBody>
            </>
        )


    }, [age])
    return ageSuggestions;

};

export default useAgeSuggestions;
// import React from 'react';

import { DialogBody, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const useAgeSuggestions = (age) => {
    const [ ageSuggestions, setAgeSuggestions] = useState('')
    useEffect(() => {
        if (age <= 12) {
            setAgeSuggestions(<>
                <DialogHeader className='py-3'>You&apos;re a child</DialogHeader>
                <DialogBody className='py-0'>
                    <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 5 and 12</p>
                    <p className='font-bold text-sm underline'>Suggestions According to your age:</p>
                    <ul className='list-decimal py-1 px-5 text-sm'>
                        <li>Play with building blocks, puzzles, or art supplies.</li>
                        <li>Participate at age-appropriate educational games or interactive toys.</li>
                        <li>Plan with you parent for a family outing to a zoo, museum, or a kid-friendly event.</li>
                    </ul>


                </DialogBody>
            </>)
        }
        else if (age >= 13 && age <= 17) {
            setAgeSuggestions(<>
                <DialogHeader className='py-3'>You&apos;re a Teenager</DialogHeader>
                <DialogBody className='py-0'>
                    <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 13 and 17</p>
                    <p className='font-bold text-sm underline'>Suggestions According to your age:</p>
                    <ul className='list-decimal py-1 px-5 text-sm'>
                        <li>Read a book from a genre you enjoy or a popular series.</li>
                        <li>Consider sports equipment or gear related to your hobbies.</li>
                        <li>Go to Mosque or your religion tample for a better life and stay with friend a little bit</li>
                    </ul>


                </DialogBody>
            </>)
        }
        else if (age >= 18 && age <= 25) {
            setAgeSuggestions(<>
                <DialogHeader className='py-3'>You&apos;re a Young Adult</DialogHeader>
                <DialogBody className='py-0'>
                    <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 18 and 25</p>
                    <p className='font-bold text-sm underline'>Suggestions According to your age:</p>
                    <ul className='list-decimal py-1 px-5 text-sm'>
                        <li>Try to stay with tech gadgets, accessories, or subscriptions based on your interests.</li>
                        <li>Keep some Personalized items like custom jewelry, monogrammed accessories, or a custom-made piece of art.</li>
                        <li>Outdoor adventure experiences or cooking classes for a unique and memorable gift.</li>
                    </ul>


                </DialogBody>
            </>)
        }
        else if (age >= 26 && age <= 40) {
            setAgeSuggestions(<>
                <DialogHeader className='py-3'>You&apos;re an Adult</DialogHeader>
                <DialogBody className='py-0'>
                    <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 26 and 40</p>
                    <p className='font-bold text-sm underline'>Suggestions According to your age:</p>
                    <ul className='list-decimal py-1 px-5 text-sm'>
                        <li>High-quality kitchen gadgets, personalized home decor, or a cozy blanket.</li>
                        <li>Subscription services like streaming, books, or gourmet food.</li>
                        <li>Consider a spa day, weekend getaway, or tickets to a favorite show or event.</li>
                    </ul>


                </DialogBody>
            </>)
        }
        else if (age >= 41 && age <= 60) {
            setAgeSuggestions(<>
                <DialogHeader className='py-3'>You&apos;re a Middle-aged Adult</DialogHeader>
                <DialogBody className='py-0'>
                    <p className='text-lg'>Cause, your age is {age}. and it&apos;s between 41 and 60</p>
                    <p className='font-bold text-sm underline'>Suggestions According to your age:</p>
                    <ul className='list-decimal py-1 px-5 text-sm'>
                        <li>Classy accessories like a watch, leather goods, or a stylish bag.</li>
                        <li>Customized items such as engraved photo frames or personalized family gifts.</li>
                        <li>Relaxing experiences like a weekend retreat, spa package, or a fine dining experience.</li>
                    </ul>


                </DialogBody>
            </>)
        }
        else if (age >= 61) {
            setAgeSuggestions(<>
                <DialogHeader className='py-3'>You&apos;re a Senior person</DialogHeader>
                <DialogBody className='py-0'>
                    <p className='text-lg'>Cause, your age is {age}. and it&apos;s more than 60</p>
                    <p className='font-bold text-sm underline'>Suggestions According to your age:</p>
                    <ul className='list-decimal py-1 px-5 text-sm'>
                        <li>Thoughtful gifts like family photo albums, personalized calendars, or memory books.</li>
                        <li>Comfortable items such as a cozy blanket, warm slippers, or a heated throw.</li>
                        <li>Consider activities like gardening tools, hobby supplies, or tickets to a show or concert.</li>
                    </ul>


                </DialogBody>
            </>)
        }
    }, [age])
    return useAgeSuggestions;

};

export default useAgeSuggestions;
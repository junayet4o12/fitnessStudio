// import React from 'react';

import { DialogBody, DialogHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const useBMRSuggestions = (myBMR) => {
    const [BMRSuggestions, setBMRSuggestions] = useState('')

    useEffect(() => {
        setBMRSuggestions(<>
            <DialogHeader className='py-3 text-xl text-white'>Maintaining calory According to BMR.</DialogHeader>
            <DialogBody className='py-0'>
                <ul className='list-disc px-5 text-sm space-y-2 text-white'>
                    <li>If you are  <strong>Sedentary (Little to no exercise)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.2))} calories</strong> in a day</li>
                    <li>If you are  <strong>Lightly Active (Light exercise/sports 1-3 days/week)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.375))} calories</strong> in a day</li>
                    <li>If you are  <strong>Moderately Active (Moderate exercise/sports 3-5 days/week)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.55))} calories</strong> in a day</li>
                    <li>If you are  <strong>Very Active (Hard exercise/sports 6-7 days a week)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.725))} calories</strong> in a day</li>
                    <li>If you are  <strong>Extra Active (Very hard exercise/sports & physical job or 2x training)</strong>, then you need to maintain <strong className='text-base'>{Math.round((myBMR * 1.9))} calories</strong> in a day</li>
                </ul>


            </DialogBody>
        </>)
    }, [myBMR])
    return BMRSuggestions;
};

export default useBMRSuggestions;


/* eslint-disable react/prop-types */
// import React from 'react';

const Title = ({ title }) => {
    return (
        <div className="space-y-4 py-10  px-4 ">
            <h2 className="text-2xl md:text-4xl font-bold text-center border-b-[3px] border-l-[3px] border-secondary max-w-max mx-auto pb-2 px-5 rounded-lg shadow-lg shadow-secondary/40 ">{title}</h2>

        </div>
    );
};

export default Title;
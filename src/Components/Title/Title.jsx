/* eslint-disable react/prop-types */
// import React from 'react';

const Title = ({title}) => {
    return (
        <div className="space-y-4 py-5 px-4">
            <h2 className="text-4xl font-bold text-center">{title}</h2>
            <div className="max-w-[350px] h-1 bg-primary mx-auto"></div>
        </div>
    );
};

export default Title;
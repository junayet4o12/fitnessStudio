// import React from 'react';

import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            {/* <Spinner className="h-16 w-16 text-gray-900/50" /> */}
            <InfinitySpin
                visible={true}
                width="300"
                color="#FF4804"
                ariaLabel="infinity-spin-loading"
            />
        </div>
    );
};

export default Loading;
// import React from 'react';

const StravaActivitiesTitle = ({start_date, name}) => {
    const time = new Date(start_date);
    const formattedTime = time.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit'
    });

    const formattedDate = time.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    return (
        <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <h2 className="text-lg">{formattedDate} - {formattedTime} </h2>
        </div>
    );
};

export default StravaActivitiesTitle;
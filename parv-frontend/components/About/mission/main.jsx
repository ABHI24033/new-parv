// pages/about.js

import React from 'react';
import Vision from './vision';
import Mission from './mission';


const VisionMission = () => {
    return (
        <div className="max-w-7xl w-full mx-auto bg-white min-h-screen py-10">
            {/* <h1 className="text-4xl font-bold text-center mb-10">About Parv Financial Services</h1> */}
            <Vision />
            <Mission />
        </div>
    );
};

export default VisionMission;

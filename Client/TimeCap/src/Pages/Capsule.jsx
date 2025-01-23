import React from 'react';
import Navbar from '../components/Navbar';
import CreateCapsuleForm from '../components/CreateCapsuleForm';

const Capsule = () => {
  return (
    <div 
    style={{
      backgroundImage: "url('./images/bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}
      className="relative min-h-screen">
      <Navbar />
      {/* Centered content */}
      <div className="relative flex flex-col items-center justify-center h-screen z-10">
        <div className="flex gap-10 w-[80%] bg-opacity-90 p-5 rounded-lg items-center">
          {/* Left block */}
          <div className="flex flex-col gap-5 p-5 rounded-lg shadow-md justify-center h-[400px] w-1/2">
            <p className="text-5xl font-semibold text-ledt leading-relaxed">
              Upcoming
              <br />
              Unveil
            </p>
            <p className="text-3xl font-medium text-right leading-relaxed">
              29th January, 2025
              <br />
              <span className="text-2xl">11:00am</span>
            </p>
          </div>
          {/* Right block */}
          <div className=" flex flex-col gap-5 p-5 rounded-lg shadow-md w-1/2">
            <CreateCapsuleForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capsule;

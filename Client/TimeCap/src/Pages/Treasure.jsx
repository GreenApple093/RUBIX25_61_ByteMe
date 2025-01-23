import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import chest from "../assets/graphics/chest.png";
import Chest from "../Pages/Chest";

const Treasure = () => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    setTimeout(() => {
      navigate("/chest"); // Replace `/next-page` with your desired route
    }, 180); // Matches the duration of the animation
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20 flex flex-col items-center">
      <div className="flex justify-between flex-col items-center font-semibold">
      <div className='flex flex-col pt-20 items-center'>
        <p className='text-4xl'>Unlock Your Treasured Memories</p>
        <p className='text-center'>Dive into the Treasure Chest, <br/>a collection of your most cherished and emotionally valuable moments. <br/>Explore and relive special memories that stay close to your heart. Click to uncover the magic</p>
      </div>
  <motion.img
    src={chest}
    className="w-[400px] cursor-pointer"
    initial={{ scale: 1 }}
    whileHover={{
      scale: 1.05,
      x: [0, -3, 5, -3, 3, 0], // Vibrating effect on the x-axis
    }}
    whileTap={{ scale: 10 }}
    onClick={handleImageClick}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 100,
      hover: { duration: 0.2 }, // Duration of vibration
    }}
    style={{ originX: 0.5, originY: 0.5 }}
  />
</div>

      </div>
    </div>
  );
};

export default Treasure;

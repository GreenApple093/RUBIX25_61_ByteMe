import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/Button";
import orange from "../assets/graphics/orange.png";
import purple from "../assets/graphics/purple.png";
import red from "../assets/graphics/red.png";
import { fetchUserName } from "../utils/firebaseUtils.js"; // Adjust the path accordingly

const MainWebsite = () => {
  const [userName, setUserName] = useState(""); // State to store user's name
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const getUserName = async () => {
      const name = await fetchUserName(); // Fetch the name
      setUserName(name);
      setLoading(false); // Stop loading
    };
    getUserName();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar buttonText="Log Out" />

      {/* Main Content */}
      <div className="flex flex-col items-center font-poppins w-full relative bg-gradient-to-b from-[#ffe6e6] to-[#f8f9fa]">
        {/* Welcome Section */}
        <div className="flex flex-col items-center text-center mt-20 pt-10 pb-20 w-full">
          <h1 className="text-5xl font-bold text-black mb-4">
            Welcome Back, {loading ? "Loading..." : userName}!
          </h1>
          <p className="text-lg font-light text-gray-600 mb-8">
            Explore your personal capsule, set goals, and collaborate with friends.
          </p>
        </div>

        {/* Decorative Images */}
        <div className="relative w-full flex justify-center mb-16">
          <img
            src={orange}
            className="h-36 w-36 absolute -top-[100px] left-10 animate-bounce-slow"
            alt="Orange Graphic"
          />
          <img
            src={purple}
            className="h-36 w-36 absolute top-0 right-20 animate-bounce-slow"
            alt="Purple Graphic"
          />
          <img
            src={red}
            className="h-36 w-36 absolute bottom-[350px] right-[100px] transform -translate-x-1/2 animate-bounce-slow"
            alt="Red Graphic"
          />
        </div>

        {/* Features Section */}
        <div className="w-full bg-white py-20 rounded-t-3xl shadow-inner flex flex-col items-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-16">What You Can Do</h2>
          <div className="grid grid-cols-1 gap-12 w-full">
            <div className="flex flex-row gap-28 items-center justify-center w-[100%] h-[300px] mx-auto p-5">
              <h2 className="text-4xl font-semibold text-black mb-3 text-start flex justify-start items-start mr-[30%] ml-10">
                <span>
                  Create and Organize Memories
                  <br />
                  <span className="text-orange-500">Store them securely forever.</span>
                </span>
              </h2>
              <p className="text-black text-center text-sm font-light px-2">
                Upload photos, write journals, and revisit your memories at any time.
              </p>
            </div>
            <div className="flex flex-row gap-28 items-center justify-center w-[100%] h-[300px] mx-auto p-5">
              <p className="text-black text-center text-sm font-light px-2">
                Collaborate with friends and create shared capsules to relive moments together.
              </p>
              <h2 className="text-4xl font-semibold text-black mb-3 text-end flex justify-end items-end ml-[30%] mr-10">
                <span>
                  Share and Collaborate
                  <br />
                  <span className="text-orange-500">Make memories together.</span>
                </span>
              </h2>
            </div>
            <div className="flex flex-row gap-28 items-center justify-center w-[100%] h-[300px] mx-auto p-5">
              <h2 className="text-4xl font-semibold text-black mb-3 text-start flex justify-start items-start mr-[30%] ml-10">
                <span>
                  Set Personal Goals
                  <br />
                  <span className="text-orange-500">Achieve your dreams.</span>
                </span>
              </h2>
              <p className="text-black text-center text-sm font-light px-2">
                Keep track of your goals and milestones using TimeCapsule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWebsite;

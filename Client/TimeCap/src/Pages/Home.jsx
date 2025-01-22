import orange from '../assets/graphics/orange.png';
import { Button } from '@/components/ui/button';
import purple from '../assets/graphics/purple.png';
import red from '../assets/graphics/red.png';
import Navbar from '../components/Navbar';


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center font-poppins w-full relative bg-gradient-to-b from-[#f8f9fa] to-[#ffe6e6]">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mt-20 pt-10 pb-20 w-full" style={{ fontFamily: 'Lora' }}>
          <h1 className="text-6xl font-extrabold text-black mb-4">
            Capture Moments Now,
          </h1>
          <h1
            className="text-5xl font-bold bg-gradient-to-b from-[#fe4141] to-[#900404] text-transparent bg-clip-text mb-8"
          >
            Treasure Them Later.
          </h1>
          <p className="text-lg font-light text-gray-600 mb-8">
            "A timeless way to treasure your memories."
          </p>
          <Button
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold py-3 px-6 mt-5 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 w-[300px] text-lg h-[60px]"
            style={{ fontFamily: 'Poppins' }}
          >
            Create Your Capsule
          </Button>
        </div>

        {/* Decorative Images */}
        <div className="relative w-full flex justify-center mb-16">
          <img src={orange} className="h-36 w-36 absolute -top-[100px] left-10 animate-bounce-slow" alt="Orange Graphic" />
          <img src={purple} className="h-36 w-36 absolute top-0 right-20 animate-bounce-slow" alt="Purple Graphic" />
          <img src={red} className="h-36 w-36 absolute bottom-[350px] right-[100px] transform -translate-x-1/2 animate-bounce-slow" alt="Red Graphic" />
        </div>

        {/* Sections */}
        <div className="w-full bg-white py-20  rounded-t-3xl shadow-inner flex flex-col items-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-16" style={{ fontFamily: 'Poppins' }}>
            Explore Your Capsule
          </h2>
          <div className="grid grid-cols-1 gap-12 w-full">
            <div className='h-2 w-full border-t-4 border-orange-500'></div>
            <div
              className="flex flex-row gap-28 items-center justify-center w-[100%] h-[300px] mx-auto p-5 transition-transform duration-300 "

            >
              <h2 className="text-4xl font-semibold text-black mb-3 text-start flex justify-start items-start mr-[30%] ml-10" style={{ fontFamily: 'Poppins' }}>
                <span>Create Your own Treasure Box<br /><span className='text-orange-500'>Or collaborate with your friends</span><br /> with TimeCapsule
                </span>
              </h2>
              <p className="text-black text-center text-sm font-light px-2">
                Create your personalized capsule to treasure forever.Yet relish whenver you want.
              </p>
            </div>
            <div className='h-2 w-full border-t-4 border-orange-500'></div>
            <div
              className="flex flex-row gap-28 items-center justify-center w-[100%] h-[300px] mx-auto p-5 transition-transform duration-300 "

            >

              <p className="text-black text-center text-sm font-light px-2">
                Create your personalized capsule to treasure forever.Yet relish whenver you want.
              </p>
              <h2 className="text-4xl font-semibold text-black mb-3 text-end flex justify-end items-end ml-[30%] mr-10" style={{ fontFamily: 'Poppins' }}>
                <span>Chart out your personal goals and<br /><span className='text-orange-500'> make it happen</span><br /> with TimeCapsule
                </span>
              </h2>
            </div>
            <div className='h-2 w-full border-t-4 border-orange-500'></div>
            <div
              className="flex flex-row gap-28 items-center justify-center w-[100%] h-[300px] mx-auto p-5 transition-transform duration-300 "

            >
              <h2 className="text-4xl font-semibold text-black mb-3 text-start flex justify-start items-start mr-[30%] ml-10" style={{ fontFamily: 'Poppins' }}>
                <span>Create Your daily<br /><span className='text-orange-500'>To-Do list </span><br /> with TimeCapsule
                </span>
              </h2>
              <p className="text-black text-center text-sm font-light px-2">
                Create your personalized capsule to treasure forever.Yet relish whenver you want.
              </p>
            </div>
            <div className='h-2 w-full border-t-4 border-orange-500'></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

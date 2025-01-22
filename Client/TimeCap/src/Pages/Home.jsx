import graphic1 from '../assets/graphics/pic1.png';
import bg1 from '../assets/graphics/bg1.png'; // Import the background image
import RL from '../assets/graphics/RL.png';
import LL from '../assets/graphics/LL.png';
import bg2 from '../assets/graphics/bg2.png';
import bg3 from '../assets/graphics/bg3.png';
import groupPic from '../assets/graphics/group.png';
import calendar from '../assets/graphics/calendar.png';

const Home = () => {
  return (
    <div className="flex flex-col items-center font-poppins w-full">
         <div 
            className="flex flex-col items-center text-center mt-[5%] bg-[#F6F6F6] w-full pt-10 py-20"
            
            >
            <img src={graphic1} className='w-[60px]' alt="Graphic" />
            <p className="text-5xl">Capture Moments Now,<br/><span className="font-lobster text-5xl text-[#FB612D]">Cherish Them Later.</span></p>
            <p className="mt-3">A timeless way to treasure your memories.</p>
            <button className="bg-white p-3 mt-5 w-[250px] rounded-3xl border shadow-md transition-all duration-300 ease-in-out hover:bg-[#FB612D] hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Create your capsule
            </button>
            <div className='flex gap-16 mt-16'>
                <div className='w-[300px] h-[250px] bg-gray-300 rounded-3xl'>
                    <div className='mt-4 text-2xl'>Add <span className="font-lobster ">Memories</span></div>
                </div>
                <div className='w-[300px] h-[250px] bg-[#A2D2DF] rounded-3xl flex flex-col gap-2 items-center'>
                    <div className='mt-4 text-2xl'>Add <span className="font-lobster ">Goals</span></div>
                    <img src={calendar} className='w-[200px]'/>
                </div>
                <div className='w-[300px] h-[250px] bg-[#A1D6B2] rounded-3xl relative'>
                    <div className='mt-4 text-2xl'>Add <span className="font-lobster ">Treasure</span></div>
                    <img src={groupPic} className='absolute top-5 left-8'/>
                </div>
        </div>
    </div>

    
    </div>
  );
};

export default Home;

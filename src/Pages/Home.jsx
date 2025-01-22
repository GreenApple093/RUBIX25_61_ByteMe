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
            style={{ backgroundImage: `url(${bg2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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

    <div
      className='h-[90vh] w-full flex flex-col justify-center items-center p-10'
      style={{ backgroundImage: `url(${bg3})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <p className='text-3xl font-semibold'>How we work</p>
      <div className='grid grid-cols-2 gap-10 pt-16'>
        <div className='bg-gray-200 rounded-3xl h-[400px] w-[400px] flex flex-col items-center p-3 gap-5'>
          <p className='text-3xl font-lobster'>Capsule</p>
          <div className='flex flex-col pt-10 w-full gap-5'>
            <div className='flex justify-between w-full px-10 items-center'>
              <div className='w-[30px] h-[30px] rounded-full bg-gray-400 flex items-center justify-center'>1</div>
              <div>Set a date</div>
            </div>
            <div className='flex justify-between w-full px-10 items-center'>
              <div className='w-[30px] h-[30px] rounded-full bg-gray-400 flex items-center justify-center'>2</div>
              <div>Add your memory</div>
            </div>
            <div className='flex justify-between w-full px-10 items-center'>
              <div className='w-[30px] h-[30px] rounded-full bg-gray-400 flex items-center justify-center'>3</div>
              <div>Suprise your future</div>
            </div>
          </div>
          <div className='relative group'>
            {/* Text "Create" - initially hidden */}
            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <button className='text-black text-2xl font-bold mt-10'>Create</button>
            </div>
            
            {/* Image container */}
            <div className='flex'>
              <img src={LL} className='w-[100px] mt-10 border-r-2 border-white transition-transform duration-300 group-hover:translate-x-[-50%]' />
              <img src={RL} className='w-[100px] mt-10 transition-transform duration-300 group-hover:translate-x-[50%]' />
            </div>
          </div>
        </div>
        <div className='bg-gray-200 rounded-3xl h-[400px] w-[400px] flex flex-col items-center p-3'>
          <p className='text-3xl font-lobster'>Treasure</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;

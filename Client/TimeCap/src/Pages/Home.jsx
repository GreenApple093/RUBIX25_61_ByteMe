
import orange from '../assets/graphics/orange.png';
import { Button } from '@/components/ui/button';
import purple from '../assets/graphics/purple.png';
import red from '../assets/graphics/red.png';
import Navbar from '../components/Navbar';
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center font-poppins w-full absolute top-0 left-0 z-0">
      <div
        className="flex flex-col items-center text-center mt-[5%]  w-full pt-0 py-20" style={{ fontFamily: 'Lora' }}>

        <h1 className='text-7xl font-semibold text-black z-10 mb-5'>
          Capture Moments Now,
        </h1>
        <h1
          className="text-6xl font-bold bg-gradient-to-b from-[#fe414189] via-[#fc4d4dfe] to-[#900404] text-transparent bg-clip-text"
        >
          Treasure Them Later.
        </h1>
        <div>
        <div className='flex gap-16 mt-16  bottom-[150px] text-white' style={{fontFamily:"Poppins"}}>
          <img src={orange} className='h-44 w-44 z-0 relative bottom-[300px] left-[850px]' alt="" />
          <img src={purple} className='h-44 w-44 z-0 relative bottom-[200px] right-[650px]' alt="" />
          <img src={red} className='h-44 w-44 z-0 relative top-[100px] left-[400px]' alt="" />
        </div>
        </div>
        <p className="mt-0 text-3xl font-extralight relative bottom-[200px]">"A timeless way to treasure your memories."</p>
        <Button
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold p-2 mt-5 rounded-xl border-none shadow-2xl transition-transform duration-300 ease-in-out shadow-orange-400 hover:from-orange-500 hover:to-pink-500 hover:scale-105 focus:ring-4 focus:ring-pink-300 focus:ring-offset-2 h-[60px] w-[300px] text-xl relative bottom-[150px]" style={{ fontFamily: 'Poppins' }}
        >
          Create your capsule
        </Button>


        <div className='flex gap-16 mt-16 relative bottom-[175px] text-white' style={{fontFamily:"Poppins"}}>
          <div className='w-[400px] h-[250px] bg-[#fd262db7] rounded-3xl shadow-xl shadow-orange-400 border-2 border-yellow-300'>
            <div className='mt-4 text-2xl' >Add <span className=" ">Memories</span></div>
          </div>
          <div className='w-[400px] h-[250px] bg-[#292ff0] rounded-3xl flex flex-col gap-2 items-center shadow-lg shadow-purple-700 border-2 border-orange-300'>
            <div className='mt-4 text-2xl'>Add <span className=" ">Goals</span></div>
          </div>
          <div className='w-[400px] h-[250px] bg-[#2dfb6e] rounded-3xl relative shadow-xl shadow-green-400 border-2 border-pink-300'>
            <div className='mt-4 text-2xl'>Add <span className=" ">Treasure</span></div>
          </div>
        </div>
      </div>


    </div>
    </div>
    
  );
};

export default Home;

import { motion } from 'framer-motion';
import orange from '../assets/graphics/orange.png';
import { Button } from '@/components/ui/button';
import purple from '../assets/graphics/purple.png';
import red from '../assets/graphics/red.png';
import Navbar1 from '../components/Navbar1';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { useNavigate } from 'react-router-dom';

const slides = [
  { title: "Rock On!", image: "/images/p8.jpeg" },
  { title: "A Vintage Memory", image: "/images/p1.jpeg" },
  { title: "Generational Bond", image: "/images/p3.jpeg" },
  { title: "Convocation", image: "/images/p4.jpeg" },
  { title: "Road Trip", image: "/images/p5.jpeg" },
  { title: "Happy Birthday Cooper!",  image: "/images/p7.jpeg" },
  { title: "Movie Night!", image: "/images/p6.jpeg" },
  { title: "A Day Out With Friends", image: "/images/p2.jpeg" },
  { title: "After Work Party", image: "/images/p9.jpeg" },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar1 />
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col items-center font-poppins w-full relative bg-gradient-to-b from-[#f8f9fa] to-[#ffe6e6]"
      >
        <motion.div
          className="text-center mt-20 pt-10 pb-20 w-full"
          variants={fadeInVariants}
        >
          <h1 className="text-6xl font-extrabold text-black mb-4">Capture Moments Now,</h1>
          <h1 className="text-5xl font-bold bg-gradient-to-b from-[#fe4141] to-[#900404] text-transparent bg-clip-text mb-8">
            Treasure Them Later.
          </h1>
          <p className="text-lg font-light text-gray-600 mb-8">"A timeless way to treasure your memories."</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg w-[300px] text-lg h-[60px]"
            onClick={() => navigate('/capsule')}
          >
            Create Your Capsule
          </motion.button>
        </motion.div>

        <div className="relative w-full flex justify-center mb-16">
          <motion.img src={orange} className="h-36 w-36 absolute -top-[100px] left-10" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} alt="Orange Graphic" />
          <motion.img src={purple} className="h-36 w-36 absolute top-0 right-20" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} alt="Purple Graphic" />
          <motion.img src={red} className="h-36 w-36 absolute bottom-60 right-[200px] transform -translate-x-1/2" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} alt="Red Graphic" />
        </div>

        <motion.div className="w-full bg-white py-20 rounded-t-3xl shadow-inner flex flex-col items-center" variants={fadeInVariants}>
          <h2 className="text-4xl font-bold text-gray-800 mb-16">Explore Your Capsule</h2>
          <div className="grid grid-cols-1 gap-12 w-full">
            <div className='h-2 w-full border-t-4 border-orange-500'></div>
            <motion.div className="flex flex-row gap-16 items-center justify-between w-full h-[400px] mx-auto p-5">
              <h2 className="text-4xl font-semibold text-black mb-3 text-start ml-28">
                Create Your own Treasure Box<br /><span className="text-orange-500">Or collaborate with your friends</span><br /> with TimeCapsule
              </h2>
              <Swiper className="w-[250px] h-[350px]" effect="cards" grabCursor modules={[EffectCards, Mousewheel]}>
                {slides.map((slide, index) => (
                  <SwiperSlide key={index} className="relative shadow-lg rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
                    <h2 className="absolute left-5 bottom-8 font-bold text-xl text-white">{slide.title}</h2>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
            <div className='h-2 w-full border-t-4 border-orange-500'></div>
            <motion.div className="flex flex-row gap-28 items-center justify-center w-[100%] h-[300px]" variants={fadeInVariants}>
              <img src="/images/goals.avif" alt="Goals" className="w-[500px] h-[300px] rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105" />
              <h2 className="text-4xl font-semibold text-black mb-3">Chart out your personal goals and <br/><span className='text-orange-500'>make it happen</span> with TimeCapsule</h2>
            </motion.div>
            <div className='h-2 w-full border-t-4 border-orange-500'></div>
            <div className="flex flex-row gap-24 items-center justify-center w-[100%] h-[300px] mx-auto p-16 transition-transform duration-300">
              <h2 className="text-4xl font-semibold text-black mb-3 text-start flex justify-start items-start mr-[30%] ml-20" style={{ fontFamily: 'Poppins' }}>
                <span>Create Your daily<br /><span className='text-orange-500'>To-Do list </span> with TimeCapsule
                </span>
              </h2>
              <img
                src="/images/todo.jpg"
                alt="Todo"
                className="pr-6 w-[500px] h-[300px] rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className='h-2 w-full border-t-4 border-orange-500'></div>
          </div>
        </motion.div>
      </motion.div>
      <div className="flex flex-col items-center text-center py-20 w-full bg-gradient-to-t from-[#f8f9fa] to-[#ffe6e6]">
          <h2 className="text-4xl font-bold text-black mb-6">Ready to Explore More?</h2>
          <Button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 w-[300px] text-lg h-[60px]">
            Start Now
          </Button>
        </div>
    </div>
  );
};

export default Home;

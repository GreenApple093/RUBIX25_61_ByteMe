import Navbar from '../components/Navbar';
import CreateCapsuleForm from '../components/CreateCapsuleForm';
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    img: `/images/p${1}.jpeg`,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    img: `/images/p${2}.jpeg`,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    img: `/images/p${3}.jpeg`,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    img: `/images/p${4}.jpeg`,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    img: `/images/p${5}.jpeg`,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    img: `/images/p${6}.jpeg`,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    img: `/images/p${7}.jpeg`,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

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
      <div className="relative flex flex-col items-center justify-center h-screen z-10 mt-16">
        <div className="flex gap-10 w-[80%] bg-opacity-90 p-5 rounded-lg items-center">
          {/* Left block */}
          <div className="flex flex-col gap-5 p-5 rounded-lg shadow-md justify-center h-[620px] w-1/2">
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
          <div className="flex flex-col gap-5 p-5 py-10 rounded-lg shadow-md w-1/2">
            <CreateCapsuleForm />
          </div>
        </div>
      </div>
      {/* Add margin or padding to separate the two sections */}
      <div className="mt-10">
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              img={item.img}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default Capsule;

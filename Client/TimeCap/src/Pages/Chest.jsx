import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { useDropzone } from "react-dropzone"; // Import react-dropzone
import deleteIcon from '../assets/graphics/delete.png';

const Chest = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: "/images/p4.jpeg",
      title: "Germany",
      tag: "Best day of 2020"
    },
    {
      id: 2,
      image: "/images/p2.jpeg",
      title: "Mumbai",
      tag: "We went for drinks"
    },
    {
      id: 3,
      image: "/images/p3.jpeg",
      title: "Mumbai",
      tag: "We went for drinks"
    },
    {
      id: 4,
      image: "/images/p4.jpeg",
      title: "Germany",
      tag: "Best day of 2020"
    },
    {
      id: 5,
      image: "/images/p5.jpeg",
      title: "Germany",
      tag: "Best day of 2020"
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newSlide, setNewSlide] = useState({
    image: "",
    title: "",
    tag: "",
  });

  const swiperRef = useRef(null); // Reference to Swiper instance

  // Auto swipe logic using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext(); // Move to the next slide
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  const handleAddPicClick = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlide((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSlide = () => {
    setSlides((prevSlides) => [
      ...prevSlides,
      { id: prevSlides.length + 1, ...newSlide }
    ]);
    setShowForm(false);
    setNewSlide({
      image: "",
      title: "",
      tag: "",
    });
  };

  // Drag and drop logic
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setNewSlide((prevSlide) => ({
      ...prevSlide,
      image: fileUrl, // Set the image to the dropped file
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only image files
  });

  return (
    <div 
    className="bg-gradient-to-r from-red-950 to-black py-20 text-white flex items-center justify-center"
    style={{backgroundImage: "url('./images/wood.png')"}}     
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold text-center mb-8 animate__animated animate__fadeIn">
          Dig in Your Treasure
        </h1>

        <div className="flex justify-center items-center">
          <Swiper
            ref={swiperRef} // Assign the Swiper instance to the reference
            className="w-[900px] h-[450px]"
            slidesPerView={3} // Display one slide at a time
            spaceBetween={10} // Space between slides
            loop={true} // Enable infinite loop
          >
            {slides.map((slide, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center p-5 rounded-lg shadow-lg relative"
              >
                <div className="relative h-[400px] bg-white border-4 border-white shadow-lg  p-3">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-[250px] h-[250px] object-cover"
                  />
                  <h2 className="  w-full bg-white text-center font-bold text-xl p-2 rounded-b-lg text-black">
                    {slide.title}
                  </h2>
                  <h4 className=" w-full bg-white text-center font-bold text-sm pb-2 rounded-b-lg text-black">
                    {slide.tag}
                  </h4>
                  <button className="bg-gray-200 p-2 rounded-full absolute bottom-1 right-1">
                      <img src={deleteIcon} className="w-[17px]"/>
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Add Pic Button */}
        <button
          onClick={handleAddPicClick}
          className="bg-black text-white px-10 py-2 rounded-xl mb-4 hover:bg-gray-800"
        >
          {showForm ? "Cancel" : "Add Pic"}
        </button>

        {/* Form to add a new slide */}
        {showForm && (
          <div className="mb-4 flex flex-col items-center bg-white p-2">
            {/* Drag and Drop for Image */}
            <div
              {...getRootProps()}
              className="border-2 border-dashed p-4 mb-2 w-[300px] h-[200px] flex justify-center items-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <p>Drag & drop an image here, or click to select</p>
            </div>
            {/* Display the preview of the uploaded image */}
            {newSlide.image && (
              <div className="mb-4">
                <img
                  src={newSlide.image}
                  alt="Preview"
                  className="w-[250px] h-[250px] object-cover rounded-lg"
                />
              </div>
            )}
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newSlide.title}
              onChange={handleInputChange}
              className="p-2 mb-2 border rounded"
            />
            <input
              type="text"
              name="tag"
              placeholder="Tag"
              value={newSlide.tag}
              onChange={handleInputChange}
              className="p-2 mb-4 border rounded"
            />
            <button
              onClick={handleAddSlide}
              className="bg-green-500 text-white p-2 rounded"
            >
              Add Slide
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chest;

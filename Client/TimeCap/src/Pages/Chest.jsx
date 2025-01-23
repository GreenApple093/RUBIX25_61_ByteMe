import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { useDropzone } from "react-dropzone"; // Import react-dropzone
import deleteIcon from '../assets/graphics/delete.png';
import Navbar from "../components/Navbar";
import axios from "axios"; // Import axios to make API calls

const Chest = () => {
  const [slides, setSlides] = useState([]); // Store fetched images here
  const [showForm, setShowForm] = useState(false);
  const [newSlide, setNewSlide] = useState({
    image: "",
    title: "",
    tag: "",
  });

  const swiperRef = useRef(null); // Reference to Swiper instance

  // Auto swipe logic using setInterval
  useEffect(() => {
    // Fetch images when the component mounts
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3300/User/alltreasure',
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `bearer ${localStorage.getItem("token")}`, // Include the token if required
            },
          }
        ); // Make sure the endpoint is correct
        console.log(response.data);

        // Update the slides state with the extracted images
        setSlides(response.data.treasureimages);      
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();

    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.swiper.slideNext(); // Move to the next slide
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

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

  // Handle image file upload
  // Handle image file upload
  const handleImageUpload = (file) => {
    setNewSlide((prevSlide) => ({
      ...prevSlide,
      image: file, // Use the actual file object, not a blob URL
    }));
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      handleImageUpload(file); // Handle file upload
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only one file at a time
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled out
    if (!newSlide.image) {
      alert("Image is required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", newSlide.title || ""); // Default to empty string if title is missing
    formData.append("tag", newSlide.tag || ""); // Default to empty string if tag is missing
    formData.append("image", newSlide.image); // Append the file object directly

    try {
      const response = await axios.post(
        "http://localhost:3300/User/addImage", // Replace with your backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `bearer ${localStorage.getItem("token")}`, // Include the token if required
          },
        }
      );

      console.log("Response:", response.data);
      alert("Slide added successfully!");
      setSlides((prevSlides) => [...prevSlides, response.data.newSlide]);
      setNewSlide({ image: "", title: "", tag: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting slide:", error.response || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };


  return (
    <>
      <Navbar />
      <div
        className="bg-gradient-to-r from-red-950 to-black py-20 text-black flex items-center justify-center"
        style={{
          backgroundImage: "url('./images/bg2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
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
              {Array.isArray(slides) && slides.length === 0 ? (
                <div>No images...</div>
              ) : (
                slides.map((slide, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex justify-center items-center p-5 rounded-lg shadow-lg relative"
                  >
                    <div className="relative h-[400px] bg-white border-4 border-white shadow-lg p-3">
                      <img
                        src={slide.media[0]} // Use the first media URL
                        alt={slide.title}
                        className="w-[250px] h-[250px] object-cover"
                      />
                      <h2 className="w-full bg-white text-center font-bold text-xl p-2 rounded-b-lg text-black">
                        {slide.title}
                      </h2>
                      <h4 className="w-full bg-white text-center font-bold text-sm pb-2 rounded-b-lg text-black">
                        {slide.tag}
                      </h4>
                      <button className="bg-gray-200 p-2 rounded-full absolute bottom-1 right-1">
                        <img src={deleteIcon} className="w-[17px]" alt="Delete" />
                      </button>
                    </div>
                  </SwiperSlide>
                ))
              )}
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
                <input
                  type="file"
                  accept="image/*,audio/*"
                  onChange={handleImageUpload}
                  // className="hidden"
                  id="fileUpload"
                  {...getInputProps()}
                />
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
                onClick={handleSubmit}
                className="bg-green-500 text-white p-2 rounded"
              >
                Add Slide
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chest;

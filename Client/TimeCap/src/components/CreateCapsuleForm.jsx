import React, { useState } from 'react';

const CreateCapsuleForm = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [unveilDate, setUnveilDate] = useState('');

  const handleTextChange = (e) => setText(e.target.value);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDateChange = (e) => setUnveilDate(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Text:', text);
    console.log('File:', file);
    console.log('Unveil Date:', unveilDate);
    alert('Capsule created successfully!');
  };

  return (
    <div className="h-[85vh] mt-10 flex flex-col items-center justify-center bg-gray-50 rounded-2xl">
      <h1 className="text-4xl font-bold mb-5 text-center">Create Your Capsule</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-2xl flex flex-col gap-6"
      >
        {/* Text Input */}
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Write your thoughts..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          rows="4"
        ></textarea>

        {/* File Upload (Image or Audio) */}
        <div
          className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            type="file"
            accept="image/*,audio/*"
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            Drag and drop an image or audio file, or <span className="text-blue-500">browse</span>.
          </label>
          {file && <p className="mt-2 text-green-500">{file.name} selected!</p>}
        </div>

        {/* Unveil Date Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="unveilDate" className="text-lg font-medium">
            Unveil Date
          </label>
          <input
            type="date"
            id="unveilDate"
            value={unveilDate}
            onChange={handleDateChange}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 duration-500"
        >
          Create Capsule
        </button>
      </form>
    </div>
  );
};

export default CreateCapsuleForm;

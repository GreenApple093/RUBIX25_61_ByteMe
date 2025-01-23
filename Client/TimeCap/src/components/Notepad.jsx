import React, { useState } from 'react';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';

const Notepad = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({ title: '', info: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (currentTask.title.trim() && currentTask.info.trim()) {
      if (editingTask !== null) {
        const updatedTasks = tasks.map((task, index) => 
          index === editingTask ? currentTask : task
        );
        setTasks(updatedTasks);
        setEditingTask(null);
      } else {
        setTasks([...tasks, currentTask]);
      }
      setCurrentTask({ title: '', info: '' });
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setCurrentTask(tasks[index]);
    setEditingTask(index);
  };

  const viewFullTask = (task) => {
    setViewTask(task);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg mt-20">
      <h1 className="text-4xl font-bold text-center text-orange-500 mb-6 font-poppins">
        <span className='text-black'>Task</span> Notepad
      </h1>
      
      <div className="mb-6">
        <input
          type="text"
          name="title"
          value={currentTask.title}
          onChange={handleInputChange}
          placeholder="Task Title"
          className="w-full p-3 mb-3 border-2 border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <textarea
          name="info"
          value={currentTask.info}
          onChange={handleInputChange}
          placeholder="Task Details"
          className="w-full p-3 border-2 border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows="4"
        />
        <button 
          onClick={addTask}
          className="w-full mt-4 p-3 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 flex items-center justify-center"
        >
          <Plus className="mr-2" /> {editingTask !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center border-l-4 border-orange-500"
          >
            <span className="text-lg font-semibold flex-grow text-gray-800 truncate">{task.title}</span>
            <div className="flex space-x-4">
              <button 
                onClick={() => viewFullTask(task)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Eye size={24} />
              </button>
              <button 
                onClick={() => editTask(index)}
                className="text-green-500 hover:text-green-700"
              >
                <Pencil size={24} />
              </button>
              <button 
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-xl">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">{viewTask.title}</h2>
            <p className="text-gray-700">{viewTask.info}</p>
            <button 
              onClick={() => setViewTask(null)}
              className="mt-6 w-full p-3 bg-gray-500 text-white rounded-md font-semibold hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notepad;

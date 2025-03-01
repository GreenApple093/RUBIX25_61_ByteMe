import React from 'react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Navbar1() {
    const handleAlert = () => {
        Swal.fire({
            icon: 'info',
            title: 'Kindly login',
            text: 'You need to be logged in to access this section.',
            confirmButtonColor: '#ff5341',
        });
    };

    return (
        <div className='w-full text-white' style={{ fontFamily: "Poppins" }}>
            <nav className="fixed top-0 w-full backdrop-blur-md z-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="ml-2 text-3xl font-bold text-black cursor-pointer">PicLock</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-32">
                            <span 
                                onClick={handleAlert} 
                                className="text-gray-700 hover:text-gray-900 cursor-pointer"
                            >
                                CAPSULE
                            </span>
                            <span 
                                onClick={handleAlert} 
                                className="text-gray-700 hover:text-gray-900 cursor-pointer"
                            >
                                TO-DO
                            </span>
                            <span 
                                onClick={handleAlert} 
                                className="text-gray-700 hover:text-gray-900 cursor-pointer"
                            >
                                TREASURE
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/signup" className="bg-[#ff5341] hover:bg-[#ff5341]/90 p-2 rounded-xl">
                                GET STARTED
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar1;

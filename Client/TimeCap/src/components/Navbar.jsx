import React from 'react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className='w-full text-white' style={{ fontFamily: "Poppins" }}>
            <nav className="fixed top-0 w-full backdrop-blur-md z-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/" className="ml-2 text-3xl font-bold text-black">PicLock</Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-32">
                            <Link to="/capsule" className="text-gray-700 hover:text-gray-900">CAPSULE</Link>
                            <Link to="/to-do" className="text-gray-700 hover:text-gray-900">TO-DO</Link>
                            <Link to="/treasure" className="text-gray-700 hover:text-gray-900">TREASURE</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/signup" className="bg-[#ff5341] hover:bg-[#ff5341]/90 p-2 rounded-xl">Log out</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

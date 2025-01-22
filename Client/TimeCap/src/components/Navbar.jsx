import React from 'react'
import {Button} from '@/components/ui/Button'
function Navbar() {
    return (
        <div className='w-full text-white' style={{fontFamily:"Poppins"}}>
            <nav className="fixed top-0 w-full  backdrop-blur-md z-50 border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">

                            <span className="ml-2 text-3xl font-bold text-black">NFTX</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-32">
                            <a href="#" className="text-gray-700 hover:text-gray-900">CAPSULE</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">TO-DO</a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">TREASURE</a>
                        </div>
                        <div className="flex items-center space-x-4">
                            
                            <Button className="bg-[#ff5341] hover:bg-[#ff5341]/90">GET STARTED</Button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Navbar
import React from 'react'
import Navbar from '../components/Navbar'
import Notepad from '../components/Notepad'

const Todo2 = () => {
  return (
    <div
        className='h-[100vh]'
        style={{
          backgroundImage: "url('./images/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
    >
        <Navbar/>
        <div className='flex justify-center items-center pt-20'>
            <Notepad/>
        </div>
    </div>
  )
}

export default Todo2
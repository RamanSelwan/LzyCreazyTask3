import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navbar */}
      <div className="w-full flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-bold text-white">Logo</div>
       <div className='gap-x-8 w-[25%] flex justify-end'>
      <Link to ="/login">
      <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-gray-100">
          Login
        </button>
        </Link>

        <Link to="/register">
          <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-700">
            Register
          </button> 
        </Link>
       </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-semibold text-white mb-6">
          Practice English <br />
          <span>
            <span className="text-blue-400">with </span>
            <span className="text-pink-400">Real</span> People!
          </span>
        </h1>
<Link to="/video-chat">

<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg mb-6">
          Start Chat
        </button>
        </Link>

        <p className="text-gray-300 text-lg">"Learn English by Speaking"</p>
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center px-4 pb-16 pt-12"
      style={{ fontFamily: '"Press Start 2P", cursive' }}
    >
      
      {/* THE FOOLPROOF BACKGROUND LAYER */}
      <div 
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/village bg.png')" }}
      />

      {/* 1. TOP HUD (XP, Coins, Streak) */}
      <div className="mt-8 flex justify-center items-center gap-4 w-full max-w-6xl z-10">
        
        {/* XP Bar */}
        <div className="flex items-center gap-4">
          <span className="text-[#4a3018] text-2xl font-bold drop-shadow-[2px_2px_0_#fff]">XP</span>
          <div className="w-64 h-8 bg-[#2a303c] border-4 border-[#4a3018] shadow-[4px_4px_0_#2d1a0b] p-0.5 rounded-sm">
            <div className="h-full w-1/2 bg-cyan-300 border-r-4 border-[#4a3018]" />
          </div>
          <span className="text-[#4a3018] text-base drop-shadow-[2px_2px_0_#fff] mt-1">LEVEL 5</span>
        </div>

        {/* Coins Badge */}
        <div className="flex items-center gap-2 bg-[#f9e4c8] border-4 border-[#4a3018] pr-6 h-16 rounded-full shadow-[6px_6px_0_#2d1a0b] transition-transform hover:-translate-y-1">
          <img src="/coin-removebg-preview.png" className="h-24 -ml-8 -mt-1 drop-shadow-lg hover:scale-110 transition-transform cursor-pointer" alt="Coins" />
          <span className="text-lg text-[#4a3018] mt-1">1,250</span>
        </div>

        {/* Streak Badge */}
        <div className="flex items-center gap-3 bg-[#f9e4c8] border-4 border-[#4a3018] pr-6 h-16 rounded-full shadow-[6px_6px_0_#2d1a0b]">
          <img src="/fire-removebg-preview.png" className="h-20 -ml-6 -mt-3 drop-shadow-lg animate-pulse" alt="Streak" />
          <span className="text-lg text-[#4a3018] mt-1">14</span>
        </div>
      </div>

      {/* 2. CENTER BOARD (The Parchment) */}
      {/* FIX 1: Increased max-w-4xl to max-w-5xl so the scroll is much bigger */}
      <div className="relative inline-block mt-12 w-full max-w-5xl z-10">
        
        {/* Base Scroll Image */}
        <img
          src="/welcomescroll-removebg-preview.png"
          alt="Welcome scroll"
          className="w-full drop-shadow-[12px_12px_0_rgba(0,0,0,0.5)]"
        />

        {/* FIX 2: Shrunk the Start Quest Button so it doesn't overpower the layout */}
        <button
          className="group absolute bottom-[24%] left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3 bg-[#ffde59] hover:bg-[#fff0a8] border-4 border-[#4a3018] px-6 py-3 rounded-md shadow-[6px_6px_0_#2d1a0b] transition-all duration-150 cursor-pointer hover:-translate-y-1 hover:shadow-[6px_8px_0_#2d1a0b] active:translate-y-[6px] active:shadow-none"
          onClick={() => navigate("/dashboard")}
        >
          <img src="/smallw-removebg-preview.png" className="h-10 -ml-1 drop-shadow-md group-hover:animate-bounce" alt="Wizard" />
          <span className="text-[#4a3018] text-lg tracking-wider uppercase font-bold whitespace-nowrap">Start Quest</span>
        </button>

        {/* FIX 3: Placed the Banana Mascot securely on the right wing and bumped z-index so he's in front */}
        <img
          src="/bananaWIZARD-removebg-preview.png"
          alt="Banana wizard"
          className="absolute bottom-[10%] right-[5%] h-56 drop-shadow-[8px_8px_0_#2d1a0b] hover:-translate-y-3 hover:scale-105 transition-all duration-300 z-40 cursor-pointer"
        />
      </div>
      
    </div>
  );
};

export default Home;
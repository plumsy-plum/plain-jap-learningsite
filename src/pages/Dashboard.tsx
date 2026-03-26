import React from "react";
import { Link } from "react-router-dom";
import { APP_DATA } from "../data/levels";

const Dashboard: React.FC = () => {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center px-4 pt-24 pb-16"
      style={{ fontFamily: '"Press Start 2P", cursive' }}
    >
      <div
        className="fixed top-0 left-0 w-full h-screen -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/village bg.png')" }}
      />

      <div className="bg-[#fdf1d9] bg-opacity-95 border-4 border-[#4a3018] rounded-xl p-10 shadow-[6px_6px_0_#2d1a0b] w-full max-w-6xl flex flex-col items-center gap-6">
        <div className="bg-[#f9e4c8] border-4 border-[#4a3018] px-8 py-4 shadow-[6px_6px_0_#2d1a0b] text-center w-full max-w-xl">
          <h1 className="text-3xl text-[#4a3018] uppercase tracking-widest">Quest Board</h1>
          <p className="text-sm text-[#4a3018] mt-3">Choose a level to begin your quest.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {APP_DATA.map(level => (
            <Link
              key={level.levelId}
              to={`/level/${level.levelId}`}
              className="bg-[#f9e4c8] border-4 border-[#4a3018] rounded-md shadow-[6px_6px_0_#2d1a0b] p-6 flex flex-col gap-4 hover:-translate-y-2 hover:shadow-[2px_2px_0_#2d1a0b] transition-all"
            >
              <div className="flex items-center justify-between text-[#4a3018]">
                <span className="text-lg uppercase">Level {level.levelId}</span>
                <span className="text-[10px] font-bold bg-green-200 text-green-800 border-2 border-green-700 rounded px-2 py-1">Ready</span>
              </div>
              <div className="text-[#4a3018] text-xs leading-relaxed">
                Quests: {level.items.length}
              </div>
              <button className="inline-flex items-center gap-2 bg-[#ffe8a3] border-4 border-[#4a3018] px-4 py-2 rounded-md shadow-[6px_6px_0_#2d1a0b] hover:-translate-y-1 hover:shadow-[6px_8px_0_#2d1a0b] active:translate-y-[6px] active:shadow-none transition-all duration-150 text-[#4a3018] text-xs font-bold uppercase tracking-wider w-fit">
                <img src="/smallw-removebg-preview.png" className="h-8 -ml-1" alt="Wizard" />
                Start Quest
              </button>
            </Link>
          ))}
        </div>
      </div>

      <img
        src="/bananaWIZARD-removebg-preview.png"
        alt="Mascot"
        className="hidden md:block h-48 absolute bottom-6 right-6 drop-shadow-[8px_8px_0_#2d1a0b]"
      />
    </div>
  );
};

export default Dashboard;

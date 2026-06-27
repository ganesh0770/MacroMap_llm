// import { useState, useRef } from "react";
import Manager from "../component/Manager";
export default function Home() {
  
  

  
  return (
    // Fluid responsive margins: px-4 on mobile, broadening out to px-8 on desktop layout viewports
    <main className="mx-auto max-w-[1400px] w-full px-4 sm:px-8 py-4 sm:py-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-stretch flex-grow">

      {/* Stat Card 1 */}
      {/* Optimized height: Changed to a tight, medium vertical profile (min-h-[120px] on mobile to min-h-[140px] on desktop) */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.04)] min-h-[120px] sm:min-h-[140px] flex flex-row md:flex-col justify-between items-center md:items-start transition-all duration-200 hover:shadow-[0_10px_25px_-4px_rgba(146,19,239,0.08)] active:scale-[0.99]">
        <div className="max-w-[70%] md:max-w-none">
          {/* Aligned fonts: Tight text heights to prevent clipping on mobile views */}
          <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-tight mb-1">Active Workouts</h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-snug">Track your scheduled bites for the week.</p>
        </div>
        {/* Placed metrics side-by-side on mobile, stacks back underneath cleanly on desktop grids */}
        <div className="text-2xl sm:text-3xl font-extrabold text-[#9213ef] md:mt-3 shrink-0">12</div>
      </section>

      {/* Stat Card 2 */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.04)] min-h-[120px] sm:min-h-[140px] flex flex-row md:flex-col justify-between items-center md:items-start transition-all duration-200 hover:shadow-[0_10px_25px_-4px_rgba(146,19,239,0.08)] active:scale-[0.99]">
        <div className="max-w-[70%] md:max-w-none">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-tight mb-1">Energy Balance</h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-snug">Targeted intake vs calories burned.</p>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-[#9213ef] md:mt-3 shrink-0">84%</div>
      </section>

      {/* Stat Card 3 */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.04)] min-h-[120px] sm:min-h-[140px] flex flex-row md:flex-col justify-between items-center md:items-start transition-all duration-200 hover:shadow-[0_10px_25px_-4px_rgba(146,19,239,0.08)] active:scale-[0.99]">
        <div className="max-w-[70%] md:max-w-none">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-tight mb-1">Muscle Gain</h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-snug">Consecutive check-ins on platform.</p>
        </div>
        <div class="text-2xl sm:text-3xl font-extrabold text-[#9213ef] md:mt-3 shrink-0 whitespace-nowrap">18 Days</div>
      </section>

      {/* Main Feature Highlight Content Panel */}
      {/* Takes full width cleanly spanning 3 columns on desktop (md:col-span-3) */}
      <section className="bg-white rounded-2xl p-5 sm:p-8 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.04)] md:col-span-3 text-slate-800 flex flex-col justify-between items-start gap-4">
        <div className="w-full">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-800 tracking-tight text-center">Welcome to Gym MacroMap</h3>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed text-center">
            Get real-time feedback on your macro targets, food choices, and workout metrics. Navigate to the top panel to upload progress images or look through custom training schedules under our dedicated services tab.
          </p>
        </div>

        {/* Full-width thumb target button for mobile views, shrinks to standard profile on desktops
        <button className="w-full sm:w-auto text-center px-5 py-2 bg-[#9213ef] text-white rounded-xl sm:rounded-lg text-sm font-medium hover:opacity-95 active:scale-[0.98] transition-all shadow-sm shadow-purple-100">
          Get Started
        </button> */}



      </section>

      <section className="bg-white rounded-2xl p-5 sm:p-8 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.04)] md:col-span-3 text-slate-800 flex flex-col justify-between items-start gap-4 text-center">
        <div className="w-full">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-slate-800 tracking-tight">Upload Food Item here </h3>
         
        </div>

        {/* Full-width thumb target button for mobile views, shrinks to standard profile on desktops
        <button className="w-full sm:w-auto text-center px-5 py-2 bg-[#9213ef] text-white rounded-xl sm:rounded-lg text-sm font-medium hover:opacity-95 active:scale-[0.98] transition-all shadow-sm shadow-purple-100">
          Get Started
        </button> */}
        <Manager/>
        
       


      </section>





    </main >
  );
}
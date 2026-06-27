// import React from 'react';

export default function About() {
  return (
    <main className="mx-auto max-w-[1400px] w-full px-8 py-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start flex-grow">

      {/* Left Core Value Card */}
      <section className="bg-white rounded-xl p-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] min-h-[300px] flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Our Mission</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Bridging the gap between high-intensity training splits and exact dietary nutrition profiling.
        </p>
        <div className="border-t border-slate-100 pt-4 mt-auto">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Founded</span>
          <p className="text-lg font-bold text-slate-800">Est. 2025</p>
        </div>
      </section>

      {/* Right Long-form Card */}
      <section className="bg-white rounded-xl p-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] min-h-[550px] text-slate-800 flex flex-col gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">The Gym Freaks Philosophy</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We believe tracking metrics shouldn't disrupt your workout workflow. MacroMap builds smart, minimal tools designed for bodybuilders, athletes, and fitness enthusiasts who need clear analytics without clunky UI interfaces.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Why Image Processing?</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Physical changes can be difficult to notice day-to-day. By deploying specialized parsing models, our backend tools break down changes in vascularity, postural alignment, and skeletal muscle conditioning simply based on your tracking photos.
          </p>
        </div>
        <div className="w-full  flex-grow flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8 px-4 sm:px-8  max-w-6xl mx-auto bg-slate-50 border border-black">


          <div className="flex-1 bg-white p-6 rounded-xl border shadow-sm flex flex-col justify-between ring-2 ring-slate-900 ring-offset-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-slate-900">Glycogen Burnout Engine</h3>
                <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">High Impact</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Stop guessing your post-workout carbs. Our calculator estimates muscle glycogen depletion based on your real-time training volume and intensity. It tells you exactly how many grams of fast-acting carbs you need to instantly halt muscle breakdown and speed up recovery.
              </p>
            </div>
          </div>

        </div>

      </section>

    </main>
  );
}
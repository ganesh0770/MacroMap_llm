// import React from 'react';

export default function Services() {
  const provisions = [
    { title: 'Macro Tracking & Parsing', desc: 'Scan raw imagery of food or meal plans to generate instant macro summaries.' },
    { title: 'Body Composition Analysis', desc: 'Upload weekly updates to get contextual visual indexing over a clean board.' },
    { title: 'Custom Workout Generation', desc: 'Generate high-intensity hyper-targeted splits tuned to your recovery metrics.' }
  ];

  return (
    <main className="mx-auto max-w-[1400px] w-full px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start flex-grow">
      
      {provisions.map((item, idx) => (
        <section key={idx} className="bg-white rounded-xl p-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] min-h-[320px] flex flex-col gap-4">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-[#9213ef]">
            {/* Number token acting as badge */}
            <span className="font-bold text-base">0{idx + 1}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-800">{item.title}</h2>
          <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
          
          <a href="#" className="text-sm font-semibold text-[#9213ef] hover:underline mt-auto inline-block">
            Learn more &rarr;
          </a>
        </section>
      ))}

    </main>
  );
}
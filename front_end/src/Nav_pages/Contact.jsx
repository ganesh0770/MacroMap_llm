import  { useState } from 'react';

export default function Contact() {
  const [msg, setMsg] = useState({ name: '', body: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${msg.name || 'there'}! Our team will reach back out shortly.`);
    setMsg({ name: '', body: '' });
  };

  return (
    <main className="mx-auto max-w-[1400px] w-full px-8 py-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start flex-grow">
      
      {/* Left Information Card */}
      <section className="bg-white rounded-xl p-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] min-h-[300px] flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Get In Touch</h2>
          <p className="text-slate-500 text-sm mt-1">Have questions about image processing or your account metrics?</p>
        </div>

        <div className="text-sm text-slate-600 flex flex-col gap-3">
          <div>
            <strong className="text-slate-800 block">Support Desk:</strong>
            support@macromap.com
          </div>
          <div>
            <strong className="text-slate-800 block">HQ Location:</strong>
            Hyderabad, Telangana, India
          </div>
        </div>
      </section>

      {/* Right Form Input Card */}
      <section className="bg-white rounded-xl p-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] min-h-[550px]">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Drop Us A Message</h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
            <input 
              type="text" 
              required
              value={msg.name}
              onChange={(e) => setMsg({...msg, name: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-800 focus:outline-none focus:border-[#9213ef]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message Body</label>
            <textarea 
              rows="6"
              required
              value={msg.body}
              onChange={(e) => setMsg({...msg, body: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-800 focus:outline-none focus:border-[#9213ef] resize-none"
              placeholder="How can we help optimize your fitness profile metrics?"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="px-6 py-2.5 bg-[#9213ef] text-white font-medium rounded-md text-sm hover:opacity-90 transition-opacity self-end"
          >
            Send Inquiry
          </button>
        </form>
      </section>
      
    </main>
  );
}
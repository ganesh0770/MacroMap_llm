// import React from 'react';

export default function Footer() {
  return (
    <footer className="hidden md:block w-full bg-white/40 backdrop-blur-md border-t border-slate-100/80 px-8 py-5 mt-auto transition-all duration-300">
      <div className="mx-auto max-w-[1400px] flex flex-row justify-between items-center text-xs sm:text-sm text-slate-500 font-medium">
        
        {/* Brand Copyright Info */}
        <div className="tracking-tight">
          © 2026 <span className="text-[#9213ef] font-semibold hover:opacity-80 transition-opacity cursor-pointer">MacroMap</span>. All rights reserved.
        </div>
        
        {/* Modern navigation list with clean text color transitions */}
        <div className="flex gap-6 items-center">
          <a href="#" className="hover:text-[#9213ef] hover:scale-102 transition-all duration-200">Privacy Policy</a>
          <span className="text-slate-300 pointer-events-none text-xs">|</span>
          <a href="#" className="hover:text-[#9213ef] hover:scale-102 transition-all duration-200">Terms of Service</a>
          <span className="text-slate-300 pointer-events-none text-xs">|</span>
          <a href="#" className="hover:text-[#9213ef] hover:scale-102 transition-all duration-200">Support</a>
        </div>

      </div>
    </footer>
  );
}
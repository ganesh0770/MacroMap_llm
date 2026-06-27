import { useState } from 'react';
import Home from '../Nav_pages/Home';
import About from '../Nav_pages/About';
import Services from '../Nav_pages/Services';
import Contact from '../Nav_pages/Contact';
// import Manage from '../Manage'; // Re-imported to prevent blank screens on 'manage' state

export default function Navbar() {
  const [activePage, setActivePage] = useState('manage');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPageContent = () => {
    switch (activePage) {
      case 'home': return <Home />;
      case 'about': return <About />;
      case 'services': return <Services />;
      case 'contact': return <Contact />;
      case 'manage':
      default:
        return <Home />;
    }
  };

  // Modernized tab styles with subtle click scaling and active underline effects
  const linkStyle = (pageName) => 
    `text-sm font-medium transition-all duration-200 cursor-pointer list-none bg-transparent border-none outline-none p-0 relative vertical-middle active:scale-95 ${
      activePage === pageName 
        ? 'text-[#9213ef] font-semibold scale-105' 
        : 'text-slate-600 hover:text-[#9213ef]'
    }`;

  const mobileLinkStyle = (pageName) => 
    `w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all active:scale-98 ${
      activePage === pageName 
        ? 'bg-purple-50 text-[#9213ef] font-semibold' 
        : 'text-slate-700 hover:bg-slate-50'
    }`;

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* --- THE NAVBAR ROW LAYOUT --- */}
      <header className="w-full px-4 sm:px-8 py-4 sticky top-0 z-50 backdrop-blur-md bg-transparent">
        <nav className="mx-auto max-w-[1400px] bg-white/90 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full flex items-center justify-between shadow-[0_4px_20px_-4px_rgba(146,19,239,0.08)] border border-slate-100 transition-all duration-300">
          
          {/* Logo / Brand Name */}
          <button 
            onClick={() => window.location.reload()}
            className="font-bold text-xl text-[#9213ef] tracking-tight bg-transparent border-none outline-none cursor-pointer hover:opacity-80 active:scale-95 transition-all"
          >
            MacroMap
          </button>
          
          {/* Search Bar (Hidden on small mobile screens to prevent clutter) */}
          <div className="hidden sm:flex flex-1 max-w-xs mx-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-5 py-2 border border-slate-200 bg-slate-50/50 rounded-full text-sm text-slate-800 focus:outline-none focus:border-[#9213ef] focus:bg-white focus:shadow-sm transition-all duration-200" 
            />
          </div>

          {/* Desktop Links (Hidden on Mobile) */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            <li><button onClick={() => handleNavClick('home')} className={linkStyle('home')}>Home</button></li>
            <li><button onClick={() => handleNavClick('about')} className={linkStyle('about')}>About</button></li>
            <li><button onClick={() => handleNavClick('services')} className={linkStyle('services')}>Services</button></li>
            <li><button onClick={() => handleNavClick('contact')} className={linkStyle('contact')}>Contact</button></li>
            
            <li className="flex items-center justify-center border-l border-slate-200 pl-4">
              <button 
                onClick={() => handleNavClick('manage')} 
                className={`bg-transparent border-none outline-none cursor-pointer transition-all duration-200 p-1 rounded-full hover:bg-slate-50 active:scale-90 ${
                  activePage === 'manage' ? 'text-[#9213ef]' : 'text-slate-700 hover:text-[#9213ef]'
                }`}
                aria-label="Profile Dashboard"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </button>
            </li>
          </ul>

          {/* Mobile Right Edge Control (Hamburger & Profile Icon Combo) */}
          <div className="flex md:hidden items-center gap-3">
            <button 
              onClick={() => handleNavClick('manage')} 
              className={`p-1.5 rounded-full transition-colors ${activePage === 'manage' ? 'text-[#9213ef] bg-purple-50' : 'text-slate-700'}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </button>

            {/* Hamburger Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 p-1.5 hover:bg-slate-50 active:scale-90 rounded-lg transition-all focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* --- MOBILE ACCORDION DRAWER WITH ANIMATION SLIDE --- */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[350px] opacity-100 mt-3' : 'max-h-0 opacity-0 pointer-events-none mt-0'
          }`}
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100 flex flex-col gap-1.5">
            {/* Search option tucked inside mobile menu dropdown */}
            <div className="sm:hidden w-full mb-2">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-xl text-sm focus:outline-none focus:border-[#9213ef]" 
              />
            </div>
            
            <button onClick={() => handleNavClick('home')} className={mobileLinkStyle('home')}>Home</button>
            <button onClick={() => handleNavClick('about')} className={mobileLinkStyle('about')}>About</button>
            <button onClick={() => handleNavClick('services')} className={mobileLinkStyle('services')}>Services</button>
            <button onClick={() => handleNavClick('contact')} className={mobileLinkStyle('contact')}>Contact</button>
          </div>
        </div>
      </header>

      {/* --- THE HOUSING PORTAL BLOCK --- */}
      <div className="flex-grow flex flex-col w-full animate-fadeIn">
        {renderPageContent()}
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { 
  SunIcon, MoonIcon, PaintBrushIcon
} from './Icons';

interface NavLink {
  name: string;
  href: string;
}

interface NavbarProps {
  name:string;
  links: NavLink[];
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  onToggleThemeCustomizer: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ name, links, theme, toggleTheme, onToggleThemeCustomizer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-header backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <nav className="container mx-auto flex items-center justify-between p-4 px-6 md:px-12">
        <a href="#home" className="text-2xl font-bold text-title-color tracking-wider">
          {name}
        </a>
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-primary-color hover:text-accent transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full text-primary-color hover:text-accent hover:bg-card-hover transition-colors duration-300">
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
           <button onClick={onToggleThemeCustomizer} aria-label="Customize appearance" className="p-2 rounded-full text-primary-color hover:text-accent hover:bg-card-hover transition-colors duration-300">
            <PaintBrushIcon className="w-6 h-6" />
          </button>
          <a href="#contact" className="hidden md:inline-block ml-2 px-4 py-2 text-accent border border-accent rounded-md hover:bg-accent-hover transition-all duration-300">
            Get In Touch
          </a>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-primary-color hover:text-accent focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-primary-color hover:text-accent transition-colors duration-300 block text-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="w-full text-center mt-2 px-4 py-2 text-accent border border-accent rounded-md hover:bg-accent-hover transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
            Get In Touch
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
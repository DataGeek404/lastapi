import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import yourOrgLogo from '../../assets/image4.png'; // Make sure to import your logo image

const NavLinks = [
  { name: 'Our Pillars', path: '/our-pillars' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Approach', path: '/approach' },
  { name: 'Launch', path: '/launch' },
  { name: 'Join Us', path: '/join-us' },
  { name: 'Support Us', path: '/support-us' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-4 z-50 w-full max-w-[calc(100%-2rem)] mx-4 rounded-full bg-gradient-to-r from-[#1D204B] to-[#41B4E7] shadow-lg">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center space-x-2">
            <img 
              src={yourOrgLogo} 
              alt="YourOrg Logo" 
              className="h-10 w-auto" // Adjust size as needed
            />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {NavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200 ${
                  link.name === 'Support Us' 
                    ? 'bg-[#1D204B] hover:bg-[#1D204B]/90 font-medium' 
                    : isActive 
                      ? 'bg-white/10 font-medium' 
                      : 'font-normal'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-white/20 text-white"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 mt-2 mx-4 py-4 px-6 bg-gradient-to-b from-[#1D204B] to-[#41B4E7] rounded-2xl shadow-lg animate-fade-in z-50">
          <nav className="flex flex-col space-y-2 items-center">
            {NavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-full text-white hover:bg-white/20 transition-colors duration-200 ${
                    link.name === 'Support Us' 
                      ? 'bg-[#1D204B] hover:bg-[#1D204B]/90 font-medium' 
                      : isActive 
                        ? 'bg-white/10 font-medium' 
                        : 'font-normal'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
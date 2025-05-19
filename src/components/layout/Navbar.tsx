
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">YourOrg</span>
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {NavLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-accent"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t animate-fade-in">
          <nav className="flex flex-col space-y-2">
            {NavLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `nav-link block px-4 py-2 ${isActive ? 'nav-link-active' : ''}`
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

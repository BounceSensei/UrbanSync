import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { WebLogo } from '../../assets';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../Button';

const navigation = [
  { name: 'Routes', href: '/#routes' },
  { name: 'Schedule', href: '/#schedule' },
  { name: 'About', href: '/#about' }, 
  { name: 'Contact', href: '/#contact' }, 
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderNavLink = (item) => {
    const isScrollLink = item.href.startsWith('/#');
    const targetId = isScrollLink ? item.href.substring(2) : '';

    if (isScrollLink) {
      return (
        <ScrollLink
          key={item.name}
          to={targetId}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="text-blue-900 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-500 hover:font-bold transform hover:scale-105 transition-all duration-300 cursor-pointer"
          activeClass="border-yellow-400 font-bold"
        >
          {item.name}
        </ScrollLink>
      );
    }

    return (
      <RouterLink key={item.name} to={item.href} className="text-blue-900 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-500 hover:font-bold transform hover:scale-105 transition-all duration-300">
        {item.name}
      </RouterLink>
    );
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 animate-slide-down">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16">
          <div className="flex-1 flex items-center justify-start">
            <RouterLink to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <img className="h-8 w-auto" src={WebLogo} alt="UrbanSync Logo" />
              <span className="ml-2 text-xl font-bold text-gray-800">UrbanSync</span>
            </RouterLink>
          </div>

          <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-baseline space-x-4">
              <RouterLink to="/" className="text-blue-900 px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-yellow-400 hover:text-yellow-500 hover:font-bold transform hover:scale-105 transition-all duration-300">Home</RouterLink>
              {navigation.map(renderNavLink)}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div className="hidden md:block">
            <Button to="/login">Login</Button>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <RouterLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</RouterLink>
            {navigation.map((item) => {
              const isScrollLink = item.href.startsWith('/#');
              const targetId = isScrollLink ? item.href.substring(2) : '';
              return isScrollLink ? (
                <ScrollLink key={item.name} to={targetId} spy={true} smooth={true} offset={-70} duration={500} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  {item.name}
                </ScrollLink>
              ) : (
                <RouterLink key={item.name} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                  {item.name}
                </RouterLink>
              );
            })}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 px-5">
            <Button to="/login" className="w-full text-center">
              Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
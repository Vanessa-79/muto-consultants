import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Briefcase } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-[#0A1B3D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/muto-logo.png" 
                alt="Muto Consults" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold">Muto Consults</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/jobs" className="hover:bg-[#162C50] px-3 py-2 rounded-md">
                Find Jobs
              </Link>
              <Link to="/post-job" className="hover:bg-[#162C50] px-3 py-2 rounded-md">
                Post a Job
              </Link>
              <Link to="/profile" className="hover:bg-[#162C50] px-3 py-2 rounded-md">
                My Profile
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#162C50]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/jobs"
              className="block px-3 py-2 rounded-md hover:bg-[#162C50]"
            >
              Find Jobs
            </Link>
            <Link
              to="/post-job"
              className="block px-3 py-2 rounded-md hover:bg-[#162C50]"
            >
              Post a Job
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md hover:bg-[#162C50]"
            >
              My Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
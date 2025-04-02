import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A1B3D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
              Muto Consults is a leading recruitment agency helping employers and job seekers navigate the complexities of recruitment since 2018.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-gray-300 hover:text-white">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-gray-300">Haruna Towers, Ground Floor, RM 04-05</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span className="text-gray-300">+256 701 045118</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span className="text-gray-300">info@muto-consults.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <p className="text-gray-300">Monday - Saturday</p>
            <p className="text-gray-300">8:00 AM - 5:00 PM</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Muto Consults Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
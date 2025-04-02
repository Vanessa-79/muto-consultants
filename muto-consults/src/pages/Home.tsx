import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Building2, Users } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#0A1B3D] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Dream Job is Waiting
            </h1>
            <p className="text-xl mb-8">
              We regularly update our job listings with a variety of open positions across different industries
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="flex-grow px-4 py-3 rounded-lg text-black"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold">
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Job Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Briefcase className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Office Administration</h3>
              <p className="text-gray-600">Administrative roles and support positions</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Building2 className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
              <p className="text-gray-600">Customer care and support positions</p>
            </div>
            <div className="p-6 border rounded-lg hover:shadow-lg transition">
              <Users className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">IT & Technology</h3>
              <p className="text-gray-600">Technical and software development roles</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Submit Application</h3>
              <p className="text-gray-600">Submit your details and required documents directly to our office</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Profile Review</h3>
              <p className="text-gray-600">Our team reviews your application and matches you with suitable positions</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Hired</h3>
              <p className="text-gray-600">We coordinate interviews and help you land your dream job</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
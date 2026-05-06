import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brand">reneiw</Link>
        <div className="flex items-center gap-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="작품 또는 토론 검색..." 
              className="bg-gray-100 px-4 py-2 rounded-full pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand w-64"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          <User className="w-6 h-6 text-gray-600 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
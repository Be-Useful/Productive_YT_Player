import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-gray-800 border-b border-gray-700 shadow-xl relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                VideoMind
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            <Link
                                to="/"
                                className="text-gray-300 hover:bg-gray-700/40 px-4 py-2 rounded-xl transition-all duration-200 font-medium flex items-center gap-2 group"
                            >
                                <span className="bg-gradient-to-r from-blue-400 to-green-400 h-0.5 w-0 group-hover:w-4 transition-all duration-300"></span>
                                Home
                            </Link>
                            <Link
                                to="/about"
                                className="text-gray-300 hover:bg-gray-700/40 px-4 py-2 rounded-xl transition-all duration-200 font-medium flex items-center gap-2 group"
                            >
                                <span className="bg-gradient-to-r from-blue-400 to-green-400 h-0.5 w-0 group-hover:w-4 transition-all duration-300"></span>
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="text-gray-300 hover:bg-gray-700/40 px-4 py-2 rounded-xl transition-all duration-200 font-medium flex items-center gap-2 group"
                            >
                                <span className="bg-gradient-to-r from-blue-400 to-green-400 h-0.5 w-0 group-hover:w-4 transition-all duration-300"></span>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/40 focus:outline-none transition duration-200"
                        >
                            <svg
                                className={`h-6 w-6 transform transition duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 border-t border-gray-700`}>
                <div className="px-4 pt-2 pb-4 space-y-2">
                    <Link
                        to="/"
                        onClick={toggleMenu}
                        className="block text-gray-300 hover:bg-gray-700/40 px-4 py-3 rounded-xl transition duration-200 font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        onClick={toggleMenu}
                        className="block text-gray-300 hover:bg-gray-700/40 px-4 py-3 rounded-xl transition duration-200 font-medium"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        onClick={toggleMenu}
                        className="block text-gray-300 hover:bg-gray-700/40 px-4 py-3 rounded-xl transition duration-200 font-medium"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
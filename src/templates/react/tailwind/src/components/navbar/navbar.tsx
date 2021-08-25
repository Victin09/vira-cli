import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (): JSX.Element => {
    const [isOpen, setOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 text-white p-6">
            <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6 hover:text-gray-500">
                <svg
                    className="fill-current h-8 w-8 mr-2"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
                <span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>
            </Link>
            <div className="block lg:hidden">
                <button
                    onClick={() => {
                        setOpen(!isOpen), console.log('open', isOpen);
                    }}
                    className="flex items-center px-3 py-2 border rounded border-teal-400 hover:text-white hover:border-white"
                >
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
                <div className="text-sm lg:flex-grow">
                    <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 mr-4">
                        About
                    </Link>
                </div>
                <div>
                    <a href="#" className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 mr-4">
                        Log in
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

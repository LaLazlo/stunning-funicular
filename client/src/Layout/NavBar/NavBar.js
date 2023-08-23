import {NavLink} from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';



const Navbar = () => {

  const { userInfo } = useSelector((state) =>state.userLogin);



  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
        <NavLink to="/">
                 <img className="h-20 w-full" src="https://www.tamwilcom.ma/sites/all/themes/ccgtheme/logo.png" alt="" />
            </NavLink>
        </div>

        {userInfo ? (
          <div className="hidden md:flex items-center">
          <div className="bg-white text-gray-800 px-4 py-2 rounded">
            <a href="/dashboard" className="text-white font-medium rounded-full text-sm p-3 bg-sky-600 ">Tableau de bord</a>
          </div>
        </div>
        ) : <div className="hidden md:flex items-center">
        <div className="bg-white text-gray-800 px-4 py-2 rounded">
          <a href="/login" className="text-white font-medium rounded-full text-sm p-3 bg-sky-600 ">Se connecter</a>
        </div>
      </div>
      }


        <div className="md:hidden flex items-center">
          <button
            onClick={toggleNavbar}
            className="text-sky-600 hover:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
        <ul className="flex flex-col space-y-4 items-center">

          {userInfo ? (
            <div className="bg-white text-gray-800 px-4 py-2 rounded">
              <a href="/dashboard" className="text-white font-medium rounded-full text-sm p-3 bg-sky-600 ">Tableau de bord</a>
            </div>
          ) : <div className="bg-white text-gray-800 px-4 py-2 rounded">
                <a href="/login" className="text-white font-medium rounded-full text-sm p-3 bg-sky-600 ">Se connecter</a>
              </div>
        }

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


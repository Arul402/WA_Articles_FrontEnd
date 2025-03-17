import React, { useEffect, useState } from 'react'
import { motion,AnimatePresence  } from "framer-motion";
import { IoCloseSharp, IoMenu, IoSearch } from "react-icons/io5";
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

function NavBar_Admin() {
      const [activeLink, setActiveLink] = useState("");
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [isSearchOpen, setIsSearchOpen] = useState(false);
       const [searchQuery, setSearchQuery] = useState("");
       const isMobile = useMediaQuery({ maxWidth: "1150px" });
    
      const handleSetActive = (link) => setActiveLink(link);
      const toggleMenu = () => setIsMenuOpen((prev) => !prev);
      const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  return (
    <>
    {/* <div className="min-h-screen bg-gray-50 text-gray-900"> */}
      

      {/* Header */}
      <header className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {isMobile && (
        <button onClick={toggleMenu} className=" hover:bg-blue-700 cursor-pointer transition">
          <IoMenu size={28} />
        </button>
      )}
          <h1 className="text-2xl font-bold">Admin</h1>
         
          <div className="flex items-center space-x-4">
      {/* Animated Search Input */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isSearchOpen ? 200 : 0, opacity: isSearchOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {isSearchOpen && (
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
          />
        )}
      </motion.div>
    </div>
        </div>
      </header>

      {/* Navigation */}
      {!isMobile && (
      <nav className="container mx-auto px-4 py-3 flex justify-center space-x-6 bg-white shadow-sm">
        {["Addkatturai","AddAuthor","AddKatturaiDetail","AddCategory"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className={`px-3 py-2 rounded-md text-lg font-medium transition duration-200 ${
              activeLink === item.toLowerCase()
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
            onClick={() => handleSetActive(item.toLowerCase())}
          >
            {item}
          </Link>
        ))}
      </nav>
      )}

<div>
      {/* Menu Button for Smaller Screens */}
      

      {/* AnimatePresence ensures smooth mounting/unmounting */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-50 flex flex-col items-center p-6 space-y-6 shadow-lg w-full sm:w-1/2 md:hidden right-0 h-full"
          >
            {/* Close Button */}
            <button onClick={toggleMenu} className="self-end text-gray-700 hover:text-blue-600 cursor-pointer">
              <IoCloseSharp size={28} />
            </button>

            {/* Navigation Links */}
            {["Addkatturai","AddAuthor","AddKatturaiDetail","AddCategory"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className={`px-3 py-2 rounded-md text-lg font-medium transition duration-200 ${
                  activeLink === item.toLowerCase()
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => {
                  handleSetActive(item.toLowerCase());
                  toggleMenu();
                }}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}

export default NavBar_Admin
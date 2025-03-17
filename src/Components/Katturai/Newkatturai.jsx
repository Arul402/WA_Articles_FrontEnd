
import React, { useEffect, useState, useRef } from "react";
import { IoCloseSharp, IoMenu, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion,AnimatePresence  } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Loader from "../Loader/Loader";

const Newkatturai = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const containerRef = useRef(null);
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("http://localhost:5000/api/katturai/getnewkatturai/");
        setData(response.data.latestKatturai);
        setFilteredData(response.data.latestKatturai);
        console.log(response.data.latestKatturai)
        // setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }finally{
        setIsLoading(false)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.short_desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  const handleSetActive = (link) => setActiveLink(link);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  // Scroll Animation
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const container = containerRef.current;
  //     if (!container) return;

  //     const articles = container.querySelectorAll(".article-card");
  //     articles.forEach((article) => {
  //       const rect = article.getBoundingClientRect();
  //       const viewportHeight = window.innerHeight;
  //       const middle = viewportHeight / 2;

  //       // Calculate distance from the middle of the viewport
  //       const distanceFromMiddle = Math.abs(rect.top + rect.height / 2 - middle);

  //       // Scale based on distance
  //       const scale = 1 - distanceFromMiddle / viewportHeight;
  //       article.style.transform = `scale(${Math.max(0.7, scale)})`;
  //       article.style.opacity = `${Math.max(0.2, scale)}`;
  //     });
  //   };

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
  
      const handleScroll = () => {
        const articles = container.querySelectorAll(".article-card");
        const viewportHeight = window.innerHeight;
        const middle = viewportHeight / 2;
  
        articles.forEach((article) => {
          const rect = article.getBoundingClientRect();
          const distanceFromMiddle = Math.abs(rect.top + rect.height / 2 - middle);
          const scale = 1 - distanceFromMiddle / viewportHeight;
          article.style.transform = `scale(${Math.max(0.7, scale)})`;
          article.style.opacity = `${Math.max(0.2, scale)}`;
        });
      };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      

      {/* Header */}
      <header className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {isMobile && (
        <button onClick={toggleMenu} className=" hover:bg-blue-700 cursor-pointer transition">
          <IoMenu size={28} />
        </button>
      )}
          <h1 className="text-2xl font-bold">Articles</h1>
          
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

      {/* Search Button */}
      <button
        onClick={toggleSearch}
        className="p-2 rounded-full hover:bg-blue-700 transition cursor-pointer"
      >
        <IoSearch size={24} className="text-white" />
      </button>
    </div>
        </div>
      </header>

      {/* Navigation */}
      {!isMobile && (
      <nav className="container mx-auto px-4 py-3 flex justify-center space-x-6 bg-white shadow-sm">
        {["Home", "Trending", "New", "Favourites", "Categories", "Authors", "Tags"].map((item) => (
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
            {["Home", "Trending", "New", "Favourites", "Categories", "Authors", "Tags"].map((item) => (
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8" ref={containerRef}>
      {isLoading ? <Loader /> : ""}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((article) => (
            <div
              key={article.id}
              className="article-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <Link to={`/katturai-details/${article.id}`} className="block">
                {/* <img
                  src={`http://localhost:5000${article.image_url}`}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                /> */}
                <div className="relative group w-full h-48 overflow-hidden rounded-lg">
  {/* Image with smooth darkening effect */}
  <img
    src={`http://localhost:5000${article.image_url}`}
    alt={article.title}
    className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:brightness-50"
  />

  {/* Title overlay with smooth fade-in effect */}
  <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
    <h3 className="text-white font-bold text-lg  px-4 py-2  bg-opacity-60 rounded-lg transform scale-90 group-hover:scale-100 text-left">
      {article.title}
    </h3>
  </div>
</div>

                <div className="p-4">
                  <h2 className="text-xl font-bold text-blue-600 mb-2">{article.title}</h2>
                  <p className="text-gray-700">{article.short_desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Newkatturai;
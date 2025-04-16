import React, { useEffect, useState, useRef, useContext } from "react";
import { IoCloseSharp, IoMenu, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion,AnimatePresence  } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Loader from "../Loader/Loader";
import { FaBookOpen, FaTrophy } from "react-icons/fa";
import Navbar_Katturai from "../Navbars/Navbar_Katturai";
import { SearchContext } from "./SearchContext";
import { toast, ToastContainer, Zoom } from "react-toastify";

const Trending = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: "1150px" });
  const containerRef = useRef(null);
  const [isLoading,setIsLoading]=useState(false);
  const [score,setScore]=useState([])
  const [searchfilteredData, setSearchFilteredData] = useState([]);

  const { searchQuery, setSearchQuery } = useContext(SearchContext);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true)
//       try {
//         const response = await axios.get("http://localhost:5000/api/katturai/gettrendingKatturai/");
//         setData(response.data.sortedKatturaiList);
//         setFilteredData(response.data.sortedKatturaiList);
//         setScore(response.data.kattScore);
//         console.log(response.data.sortedKatturaiList)
//         // setIsLoading(false)
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }finally{
//         setIsLoading(false)
//       }
//     };
//     fetchData();
//   }, []);

useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/katturai/gettrendingKatturai/");
        
        if (response.data?.katturaiListWithScore && response.data.katturaiListWithScore.length > 0) {
          setData(response.data.katturaiListWithScore);
          setFilteredData(response.data.katturaiListWithScore);
        }

        if (response.data?.kattScore && response.data.kattScore.length > 0) {
          setScore(response.data.kattScore);
        }

        console.log(response.data?.sortedKatturaiList);
        
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
}, []);


  // useEffect(() => {
  //   if (searchQuery) {
  //     const filtered = data.filter(
  //       (article) =>
  //         article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         article.short_desc.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setFilteredData(filtered);
  //   } else {
  //     setFilteredData(data);
  //   }
  // }, [searchQuery, data]);

  // const handleSetActive = (link) => setActiveLink(link);
  // const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  // const toggleSearch = () => setIsSearchOpen((prev) => !prev);


  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      // setError(null);

      // Local Filtering (if data is already available)
      // if (data.length > 0) {
      //     const filtered = data.filter(
      //         (article) =>
      //             article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      //             article.short_desc.toLowerCase().includes(searchQuery.toLowerCase())
      //     );
      //     setFilteredData(filtered);
      //     setIsLoading(false);
      // } else {
      // Fetch from API if no local data is available
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/search?q=${searchQuery}`
          );
          setSearchFilteredData(response.data.results || []);

          console.log(response.data.results);
          
        } catch (err) {
          // setError("No articles found!");
          if(err.status === 400){
            toast.info("No Such Articals Found !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Zoom,
            });
          }
          setSearchFilteredData([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
      // }
    } else {
      setFilteredData(data); // Reset to all data if searchQuery is empty
    }
  }, [searchQuery, data]);

  

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
    
        let ticking = false;
    
        const handleScroll = () => {
          if (!ticking) {
            requestAnimationFrame(() => {
              const viewportHeight = window.innerHeight;
              const middle = viewportHeight / 1.5; // Adjusted for a more dynamic effect
    
              const articleCards = container.querySelectorAll(".article-card");
    
              articleCards.forEach((article) => {
                const rect = article.getBoundingClientRect();
                const distanceFromMiddle = Math.abs(
                  rect.top + rect.height / 2 - middle
                );
    
                // Scale effect (bigger when near center)
                const scale = Math.min(1.1, Math.max(0.9, 1 - distanceFromMiddle / viewportHeight));
    
                // Opacity effect (more visible when near center)
                const opacity = Math.min(1, Math.max(0.5, 1 - distanceFromMiddle / viewportHeight));
    
                // Parallax effect (subtle vertical movement)
                const translateY = Math.max(-10, Math.min(10, distanceFromMiddle * 0.05));
    
                article.style.transform = `scale(${scale}) translateY(${translateY}px)`;
                article.style.opacity = opacity;
              });
    
              ticking = false;
            });
    
            ticking = true;
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar_Katturai/>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8" ref={containerRef}>
        {isLoading ? <Loader /> : ""}
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchfilteredData && searchfilteredData.length > 0 ? (
  searchfilteredData.map((article) => (
    <div
      key={article.id}
      className="article-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
    >
      <Link to={`/katturai-details/${article.id}`} className="block">
        <div className="relative group w-full h-48 overflow-hidden rounded-lg">
          {/* Image with smooth darkening effect */}
          <img
            src={`http://localhost:5000${article.image_url}`}
            alt={article.title}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:brightness-50"
          />
          {/* Title overlay with smooth fade-in effect */}
          <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <h3 className="text-white font-bold text-lg px-4 py-2 bg-opacity-60 rounded-lg transform scale-90 group-hover:scale-100 text-left">
              {article.title}
            </h3>
            <h3 className="text-white font-bold text-lg px-4 py-2 bg-opacity-60 rounded-lg transform scale-90 group-hover:scale-100 absolute top-2 right-2 text-right">
              {article.Updated_Score}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-2">
            {article.title}
          </h2>
          <p className="text-gray-700">{article.short_desc}</p>
        </div>
      </Link>
    </div>
  ))
) : (
  filteredData.map((article) => (
    <div
      key={article.id}
      className="article-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
    >
      <Link to={`/katturai-details/${article.id}`} className="block">
        <div className="relative group w-full h-48 overflow-hidden rounded-lg">
          {/* Image with smooth darkening effect */}
          <img
            src={`http://localhost:5000${article.image_url}`}
            alt={article.title}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:brightness-50"
          />
          {/* Title overlay with smooth fade-in effect */}
          <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <h3 className="text-white font-bold text-lg px-4 py-2 bg-opacity-60 rounded-lg transform scale-90 group-hover:scale-100 text-left">
              {article.title}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-2">
            {article.title}
          </h2>
          <p className="text-gray-700">{article.short_desc}</p>
          <span className=" mt-2 font-bold flex items-center space-x-2">
  <FaBookOpen className="text-blue-600" size={24} />
  <h3>{article.kattScore}</h3>
</span>

        </div>
      </Link>
    </div>
  ))
)}

        </div>
      </main>
    </div>
  );
};

export default Trending;
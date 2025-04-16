// import React, { useEffect, useRef, useState } from "react";
// import { FaHeart, FaBookOpen, FaArrowLeft, FaRegThumbsUp, FaThumbsUp, FaThumbsDown, FaRegThumbsDown, FaTrophy } from "react-icons/fa";
// import { SlLike, SlDislike } from "react-icons/sl";
// import { IoShareSocial } from "react-icons/io5";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import Loader from "../Loader/Loader";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation } from "swiper/modules";
// import { Navigation, Autoplay } from 'swiper/modules';
// import { ToastContainer, Zoom, toast } from "react-toastify";


// const ArticleDetails = ({ article }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   // const [isClickedLike, setIsClickedLike] = useState(false);
//   const [isClickedDislike, setIsClickedDislike] = useState(article.disliked);
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [likedArticles, setLikedArticles] = useState(false);
//   const [katturai, setKatturai] = useState(null);
//   const [likes, setLikes] = useState(article.likes);
//   const [dislikes,setDislikes]=useState(article.dislikes);
//   // const [score, setScore] = useState(article.score);
//   // const [viewed, setViewed] = useState(article.viewed);
//   const [hasCalledAPI, setHasCalledAPI] = useState(false);
//   const [hasCalledAPIdislike, setHasCalledAPIDislike] = useState(false);
//   const [articleData, setArticleData] = useState([]);
//   const [isClickedLike, setIsClickedLike] = useState(article.liked);

//   // useEffect(() => {
//   //   // Get liked articles from localStorage (or set an empty array if none exist)
//   //   const storedLikes = JSON.parse(localStorage.getItem("likedArticles")) || [];
//   //   setLikedArticles(storedLikes);
//   // }, []);

//   useEffect(() => {
//     setIsClickedLike(article.liked); // Ensure UI matches backend
//     setLikes(article.likes); // Set initial like count
//     setDislikes(article.dislikes)
//     setIsClickedDislike(article.disliked)
// }, [article]); // Runs when article data changes

//   useEffect(() => {
    
//     fetchData();
//   }, [article.id]);

//   const fetchData = async () => {
//     // setIsLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/api/katturai/getsinglekatturai/${article.id}`);
//       setArticleData(response.data);
//       // await axios.put(`http://localhost:5000/api/katturai/${id}/view`);
      
//       console.log(response.data)
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//     } finally {
//       // setIsLoading(false);
//     }
//   };

//   if (!article) {
//     return <p>Loading...</p>; // Prevent errors while data is loading
//   }

//   const changeLike = () => {
//     setIsClickedLike(!isClickedLike);
//   };

//   useEffect(() => {
//     setLikes(article.likes);
//     setDislikes(article.dislikes)
//     // setViewed((prev) => prev); // Simulating an update
//     // setScore((prev) => prev); // Simulating an update
//     // setScore(article.score);
//     // setViewed(article.viewed);
//     // If backend provides a user-liked status, update `isClickedLike` accordingly
//     setIsClickedLike(article.isLiked || false); 
//   }, [article.id,article.score,article.viewed]);
//   // const handleLike = async () => {
//   //   try {
//   //     const { data } = await axios.put(
//   //       `http://localhost:5000/api/katturai/${article.id}/like`
//   //     );

//   //     if (isClickedLike) {
//   //       setLikes((prevLikes) => prevLikes - 1); // Unlike
//   //     } else {
//   //       setLikes((prevLikes) => prevLikes + 1); // Like
//   //     }

//   //     setIsClickedLike(!isClickedLike); // Toggle state
//   //   } catch (error) {
//   //     console.error("Error updating like status:", error);
//   //   }
//   // };

//   // const handleLike = async () => {
//   //   if(isClickedDislike || article.disliked){
//   //     alert("Dislike Is Already Clicked !!!")
//   //     return;
//   //   }
//   //   // if(articleData.liked){
//   //   //   alert("Like Is Already Clicked !!!")
//   //   //   return;
//   //   // }
    
//   //   if (!hasCalledAPI  ) {
//   //     try {
//   //       const { data } = await axios.put(
//   //         `http://localhost:5000/api/katturai/${article.id}/likeincrease`
//   //       );
//   //       setHasCalledAPI(true); // Mark API as called after first click
//   //       // console.log(data)
//   //       if(data.message === "yes"){
//   //         setIsClicked(true)
//   //         fetchData()
//   //       }
//   //     } catch (error) {
//   //       console.error("Error updating like status:", error);
//   //       return;
//   //     }
//   //   }else if(hasCalledAPI){
//   //     try {
//   //       const { data } = await axios.put(
//   //         `http://localhost:5000/api/katturai/${article.id}/likedecrease`
//   //       );
//   //       setHasCalledAPI(true); // Mark API as called after first click
//   //       // console.log("likedecrease")
//   //       if(data.message === "no"){
//   //         setIsClicked(false)
//   //         fetchData()
//   //       }
//   //     } catch (error) {
//   //       console.error("Error updating like status:", error);
//   //       return;
//   //     }
//   //   }

//   //   // Toggle UI state without API calls after the first one
//   //   setIsClickedLike((prev) => !prev);
//   //   if (isClickedLike) {
//   //     setLikes((prevLikes) => prevLikes - 1); // Unlike
//   //     setHasCalledAPI(false);
//   //   } else {
//   //     setLikes((prevLikes) => prevLikes + 1); // Like
//   //   }
//   //   setIsClickedLike(!isClickedLike);
//   //   // setLikes((prevLikes) => (isClickedLike ? prevLikes - 1 : prevLikes + 1));
//   // };


// //   const handleLikeIncrease = async () => {
// //     if (isClickedLike) return;
// //     // if(!isClickedLike && articleData.liked) return;
// //     if (isClickedDislike || article.disliked) {
// //         alert("Dislike Is Already Clicked !!!");
// //         return;
// //     }

// //     // if (isClickedLike) return; // Prevent multiple clicks

// //     try {
// //         const { data } = await axios.put(
// //             `http://localhost:5000/api/katturai/${article.id}/likeincrease`
// //         );

// //         if (data.message === "yes") {
// //             setIsClickedLike(true); // Update UI immediately
// //             setLikes((prevLikes) => prevLikes + 1); // Increase like count
// //             fetchData(); // Fetch latest data
// //         }
// //     } catch (error) {
// //         console.error("Error increasing like:", error);
// //     }
// // };

// // const handleLikeDecrease = async () => {
// //     if (!isClickedLike) return; // Prevent unnecessary API calls

// //     try {
// //         const { data } = await axios.put(
// //             `http://localhost:5000/api/katturai/${article.id}/likedecrease`
// //         );

// //         if (data.message === "no") {
// //             setIsClickedLike(false); // Update UI immediately
// //             setLikes((prevLikes) => prevLikes - 1); // Decrease like count
// //             fetchData(); // Fetch latest data
// //         }
// //     } catch (error) {
// //         console.error("Error decreasing like:", error);
// //     }
// // };

// // const handleLike = () => {
// //     if (isClickedLike) {
// //         handleLikeDecrease(); // If already liked, decrease like
// //     } else {
// //         handleLikeIncrease(); // Otherwise, increase like
// //     }
// // };



// const handleLike = async () => {
//   if (isClickedDislike || article.disliked) {
//     alert("Dislike Is Already Clicked !!!");
//     return;
// }
//   const newLikeState = !isClickedLike; // Toggle the like state
//   setIsClickedLike(newLikeState); // Immediately update UI
//   setLikes((prevLikes) => (newLikeState ? prevLikes + 1 : prevLikes - 1)); // Update count

//   try {
//       const endpoint = newLikeState
//           ? `http://localhost:5000/api/katturai/${article.id}/likeincrease`
//           : `http://localhost:5000/api/katturai/${article.id}/likedecrease`;

//       const { data } = await axios.put(endpoint);

//       if (
//           (newLikeState && data.message !== "yes") ||
//           (!newLikeState && data.message !== "no")
//       ) {
//           // If the backend response is unexpected, revert the UI state
//           setIsClickedLike(!newLikeState);
//           setLikes((prevLikes) => (newLikeState ? prevLikes - 1 : prevLikes + 1));
//       }
//       fetchData()
//   } catch (error) {
//       console.error("Error updating like:", error);
//       setIsClickedLike(!newLikeState); // Revert on error
//       setLikes((prevLikes) => (newLikeState ? prevLikes - 1 : prevLikes + 1)); // Revert count
//   }
// };






//   // const handleDislike = async () => {
//   //   // if(article.liked){
//   //   //   setIsClickedLike(true)
//   //   // }
//   //   if(isClickedLike || article.liked){
//   //     alert("Like Is Already Clicked !!!")
//   //     return;
//   //   }
//   //   if(article.disliked){
//   //     alert("Dislike Is Already Clicked !!!")
//   //     return;
//   //   }
//   //   if (!hasCalledAPIdislike) {
//   //     try {
//   //       const { data } = await axios.put(
//   //         `http://localhost:5000/api/katturai/${article.id}/dislikeincrease`
//   //       );
//   //       setHasCalledAPIDislike(true); // Mark API as called after first click
//   //       if(data.message === "yes"){
//   //         setIsClickedDislike(data.message === "yes")
//   //         fetchData()
//   //       }
//   //     } catch (error) {
//   //       console.error("Error updating like status:", error);
//   //       return;
//   //     }
//   //   }else if(hasCalledAPIdislike){
//   //     try {
//   //       const { data } = await axios.put(
//   //         `http://localhost:5000/api/katturai/${article.id}/dislikedecrease`
//   //       );
//   //       setHasCalledAPIDislike(true); // Mark API as called after first click
//   //       if(data.message === "no"){
//   //         setIsClickedDislike(data.message === "no")
//   //         fetchData()
//   //       }
//   //     } catch (error) {
//   //       console.error("Error updating like status:", error);
//   //       return;
//   //     }
//   //   }

//   //   // Toggle UI state without API calls after the first one
//   //   setIsClickedDislike((prev) => !prev);
//   //   if (isClickedDislike) {
//   //     setDisikes((prevLikes) => prevLikes - 1); 
//   //     setHasCalledAPIDislike(false);
//   //   } else {
//   //     setDisikes((prevLikes) => prevLikes + 1); 
//   //   }
//   //   setIsClickedDislike(!isClickedDislike);
//   // };


//   const handleDislike = async () => {
//     if (isClickedLike || article.liked) {
//         alert("Like Is Already Clicked !!!");
//         return;
//     }

//     const newDislikeState = !isClickedDislike; // Toggle dislike state
//     setIsClickedDislike(newDislikeState); // Immediately update UI
//     setDislikes((prevDislikes) => (newDislikeState ? prevDislikes + 1 : prevDislikes - 1)); // Update count

//     try {
//         const endpoint = newDislikeState
//             ? `http://localhost:5000/api/katturai/${article.id}/dislikeincrease`
//             : `http://localhost:5000/api/katturai/${article.id}/dislikedecrease`;

//         const { data } = await axios.put(endpoint);

//         if (
//             (newDislikeState && data.message !== "yes") ||
//             (!newDislikeState && data.message !== "no")
//         ) {
//             // If API response is unexpected, revert UI state
//             setIsClickedDislike(!newDislikeState);
//             setDislikes((prevDislikes) => (newDislikeState ? prevDislikes - 1 : prevDislikes + 1));
//         }
        
//         fetchData(); // Refresh article data
//     } catch (error) {
//         console.error("Error updating dislike:", error);
//         setIsClickedDislike(!newDislikeState); // Revert state on error
//         setDislikes((prevDislikes) => (newDislikeState ? prevDislikes - 1 : prevDislikes + 1)); // Revert count
//     }
// };



//   const changeDislike = () => {
//     setIsClickedDislike(!isClickedDislike);
//   };

//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/katturai/${article.id}/gettoggle`)
//       .then((res) => {
//         setLikedArticles(res.data.isFavorite);
//         console.log(res.data.isFavorite)
//       })
//       .catch((error) => {
//         console.error("Error fetching favorite status:", error);
//       });
//   }, [article.id]); // Ensure it runs when article.id changes

//   const handleClick = async () => {
//     try {
//       const res = await axios.post(`http://localhost:5000/api/katturai/${article.id}/toggle`);
//       setLikedArticles(res.data.isFavorite);
//       console.log(res.data.isFavorite);
//       if(!likedArticles){
//         toast.success("Added to Favorites successfully!", {
//           position: "bottom-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//           transition: Zoom,
//         });
//       }else{
//         toast.info("Removed from Favorites successfully!", {
//           position: "bottom-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//           transition: Zoom,
//         });
//       }
      
//     } catch (error) {
//       console.error("Error toggling favorite:", error);
//     }
//   };

//   const handleZoom = () => {
//     setIsZoomed(!isZoomed);
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     // alert('URL copied to clipboard!');
//     toast.success("URL copied to clipboard!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "dark",
//       transition: Zoom,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//        <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//         transition={Zoom}
//       />
//       {/* Header */}
//       <header className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg z-50">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link to="#" className="text-white hover:text-blue-200 transition"onClick={(e) => {
//         e.preventDefault(); // Prevent default link behavior
//         window.history.back(); // Go to the previous page
//       }}>
//             <FaArrowLeft size={24} />
//           </Link>
//           <div className="flex items-center space-x-4">
//             {/* <img
//               src={article.zoom_icon_url || ""}
//               alt="Zoom"
//               width={20}
//               className={`cursor-pointer ${isZoomed ? "transform scale-125" : ""}`}
//               onClick={handleZoom}
//             /> */}
//             <FaHeart
//       onClick={handleClick}
//       className={`cursor-pointer ${likedArticles ? "text-red-500" : "text-gray-300"}`}
//       size={24}
//     />
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         {/* Title */}
//         <h1 className="text-3xl font-bold text-blue-600 mb-6">{article.title}</h1>

//         {/* Banner Image and Author Details */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           <div className="banner-section">
//             {article.base_url && (
//               <img
//                 src={`http://localhost:5000/${article.base_url}`}
//                 alt={article.title}
//                 className="w-full sm:w-3/4 md:w-1/2 lg:w-3/4 h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-md  mx-auto"
//               />
//             )}
//             <div className="mt-4 text-gray-700 flex items-center justify-evenly gap-4">
//   {article.author_image && (
//     <img
//       src={`http://localhost:5000${article.author_image}`}
//       className="w-12 h-12 object-cover rounded-lg shadow-md"
//       alt="Author"
//     />
//   )}
//   <p className="font-semibold">{article.author_name}</p>
//   <p>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : "N/A"}</p>
// </div>

//           </div>

//           {/* Short Description */}
//           <div className="short-desc">
//             <p className="text-lg text-gray-700">{article.short_desc}</p>
//           </div>
//         </div>

//         {/* Article Content */}
//         <div className="content space-y-6">
//           {Array.isArray(article.content) &&
//             article.content.map((section, index) => (
//               <div key={index} className="section">
//                 {section.title && <h2 className="text-2xl font-bold text-blue-600 mb-4">{section.title}</h2>}
//                 {section.quote && (
//                   <blockquote className="text-gray-700 italic border-l-4 border-blue-600 pl-4 my-4">
//                     {section.quote}
//                   </blockquote>
//                 )}
//                 {/* {section.para && <p className="text-gray-700 mb-4">{section.para}</p>} */}
//                 {section.para && (
//   <ul className="list-disc list-inside text-gray-700 mb-4 text-left">
//     {section.para.map((item, index) => (
//       <li key={index}>{item}</li>
//     ))}
//   </ul>
// )}

//                 {section.cont_img_url && (
//                  <img
//                  src={`http://localhost:5000/${section.cont_img_url}`}
//                  alt={section.img_desc || "Article Image"}
//                  className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-md mb-4 mx-auto"
//                />
               
                
//                 )}
//               </div>
//             ))}
//         </div>

//         {/* Tags */}
//         {article.tags && article.tags.length > 0 && (
//           <div className="tags flex flex-wrap gap-2 mt-8">
//             {article.tags.map((tag, index) => (
//               <span
//                 key={index}
//                 className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
//               >
//                 {tag[index]}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Icons */}
//         <div className="icons flex justify-between items-center mt-8 border-t border-gray-200 pt-6">
//           <div className="flex space-x-6">
//             <span className="flex items-center text-gray-700">
//               {/* <FaRegThumbsUp
//                 onClick={changeLike}
//                 className={`cursor-pointer ${isClickedLike ? 
//                   "text-blue-600" : "text-gray-400"}`
//                 }
//               /> */}
//               {isClickedLike  ? (
//     <FaThumbsUp
//       onClick={handleLike}
//       className="cursor-pointer text-red-600" // Red when liked
//       size={24}
//     />
//   ) : (
//     <FaRegThumbsUp
//       onClick={handleLike}
//       className="cursor-pointer text-gray-400" // Gray when unliked
//       size={24}
//     />
//   )}
//   <h1>&nbsp; {likes}</h1>
// </span>
//             <span className="flex items-center text-gray-700">
//               {/* <SlDislike
//                 onClick={changeDislike}
//                 className={`cursor-pointer ${isClickedDislike ? "text-blue-600" : "text-gray-400"}`}
//               /> */}
            
//               {isClickedDislike ? (
//   <FaThumbsDown 
//     onClick={handleDislike} 
//     className="cursor-pointer text-red-600"
//     size={24}
//   />
// ) : (
//   <FaRegThumbsDown 
//     onClick={handleDislike} 
//     className="cursor-pointer text-gray-400"
//     size={24}
//   />
// )}
//               <h1>&nbsp; {dislikes}</h1>
//             </span>
//             <span className="flex items-center text-gray-700">
//               <FaBookOpen className="text-blue-600" size={24} />
//               <h1>&nbsp; {articleData.viewed}</h1>
//             </span>
//             <span className="flex items-center text-gray-700">
//               <FaTrophy className="text-blue-600" size={24}/>
//               <h1>&nbsp; {articleData.score}</h1>
//             </span>
//           </div>
//           <div>
//             <IoShareSocial className="text-blue-600 cursor-pointer" size={24} onClick={handleShare}/>
//           </div>
//         </div>

       

//         {article.relevance && article.relevance.length > 0 && (
//   <div className="related-articles mt-12">
//     <h3 className="text-2xl font-bold text-blue-600 mb-6">Related Articles</h3>
//     <Swiper
//       navigation={true}
//       autoplay={{ delay: 3000, disableOnInteraction: false }}
//       modules={[Navigation, Autoplay]}
//       spaceBetween={20}
//       slidesPerView={1}
//       breakpoints={{
//         640: { slidesPerView: 2 },
//         1024: { slidesPerView: 3 },
//       }}
//       className="w-full"
//     >
//       {article.relevance.map((related) => (
//         <SwiperSlide key={related.id}>
//           <Link to={`/katturai-details/${related.id}`} className="bg-white rounded-lg shadow-md overflow-hidden">
//             {related.img_url && (
//               <img
//                 src={`http://localhost:5000/${related.img_url}`}
//                 alt={related.title}
//                 className="w-full h-48 object-cover"
//               />
//             )}
//             <div className="p-4">
//               <h4 className="text-lg font-bold text-blue-600 mb-2">{related.title}</h4>
//               <p className="text-gray-700">
//                 {related.date_of_publish
//                   ? new Date(related.date_of_publish).toLocaleDateString()
//                   : "N/A"}
//               </p>
//             </div>
//           </Link>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   </div>
// )}

//       </div>
//     </div>
//   );
// };

// const Katturai_Details = () => {
//   const [articleData, setArticleData] = useState([]);
//   const { id } = useParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const hasViewedUpdated = useRef(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`http://localhost:5000/api/katturai/getsinglekatturai/${id}`);
//         setArticleData(response.data);
//         // await axios.put(`http://localhost:5000/api/katturai/${id}/view`);
//         if (!hasViewedUpdated.current) {
//           await axios.put(`http://localhost:5000/api/katturai/${id}/view`);
//           hasViewedUpdated.current = true; // Set flag to prevent duplicate calls
//         }
//         console.log(response.data)
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       {isLoading ? <Loader /> : ""}
//       <ArticleDetails article={articleData} />
//     </>
//   );
// };

// export default Katturai_Details;



import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaBookOpen, FaArrowLeft, FaRegThumbsUp, FaThumbsUp, FaThumbsDown, FaRegThumbsDown, FaTrophy } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const ArticleDetails = ({ article }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedDislike, setIsClickedDislike] = useState(article.disliked);
  const [isZoomed, setIsZoomed] = useState(false);
  const [likedArticles, setLikedArticles] = useState(false);
  const [likes, setLikes] = useState(article.likes);
  const [dislikes, setDislikes] = useState(article.dislikes);
  const [isClickedLike, setIsClickedLike] = useState(article.liked);
  const [articleData, setArticleData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const [viewed, setViewed] = useState(null);
  const [score, setScore] = useState(null);
  const [tagNames, setTagNames] = useState([]);
  const navigate = useNavigate();


   // Intersection Observer
   useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setViewed(articleData.viewed);
      setScore(articleData.score);
    }
  }, [isVisible, articleData]);


  // Sync isClickedLike with backend data when article changes
  useEffect(() => {
    setIsClickedLike(article.liked);
    setLikes(article.likes);
    setDislikes(article.dislikes);
    setIsClickedDislike(article.disliked);
  }, [article]);

    useEffect(() => {
    
    fetchData();
  }, [article.id]);

  const fetchData = async () => {
    // setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/katturai/getsinglekatturai/${article.id}`);
      setArticleData(response.data);

      let tags = response.data.tag_names;
      console.log(tags)

        // Handle if backend returns a single string with commas
        if (Array.isArray(tags)) {
          tags = tags
            .map(tagString => tagString.split(",").map(tag => tag.trim())) // Split each index and trim
            .flat(); // Flatten into a single array
        }
      // await axios.put(`http://localhost:5000/api/katturai/${id}/view`);
      setTagNames(Array.isArray(tags) ? tags.flat() : []);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      // setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (isClickedDislike || article.disliked) {
      // alert("Dislike Is Already Clicked !!!");
      setIsClickedDislike(false)
      // return;
    }

    const newLikeState = !isClickedLike; // Toggle the like state
    setIsClickedLike(newLikeState); // Immediately update UI
    setLikes((prevLikes) => (newLikeState ? prevLikes + 1 : prevLikes - 1)); // Update count

    try {
      const endpoint = newLikeState
        ? `http://localhost:5000/api/katturai/${article.id}/likeincrease`
        : `http://localhost:5000/api/katturai/${article.id}/likedecrease`;

      const { data } = await axios.put(endpoint);

      if (
        (newLikeState && data.message !== "yes") ||
        (!newLikeState && data.message !== "no")
      ) {
        // If the backend response is unexpected, revert the UI state
        setIsClickedLike(!newLikeState);
        setLikes((prevLikes) => (newLikeState ? prevLikes - 1 : prevLikes + 1));
      }
      fetchData()
    } catch (error) {
      console.error("Error updating like:", error);
      setIsClickedLike(!newLikeState); // Revert on error
      setLikes((prevLikes) => (newLikeState ? prevLikes - 1 : prevLikes + 1)); // Revert count
    }
  };

  const handleDislike = async () => {
    if (isClickedLike || article.liked) {
      // alert("Like Is Already Clicked !!!");
      // return;
      setIsClickedLike(false)
    }

    const newDislikeState = !isClickedDislike; // Toggle dislike state
    setIsClickedDislike(newDislikeState); // Immediately update UI
    setDislikes((prevDislikes) => (newDislikeState ? prevDislikes + 1 : prevDislikes - 1)); // Update count

    try {
      const endpoint = newDislikeState
        ? `http://localhost:5000/api/katturai/${article.id}/dislikeincrease`
        : `http://localhost:5000/api/katturai/${article.id}/dislikedecrease`;

      const { data } = await axios.put(endpoint);

      if (
        (newDislikeState && data.message !== "yes") ||
        (!newDislikeState && data.message !== "no")
      ) {
        // If API response is unexpected, revert UI state
        setIsClickedDislike(!newDislikeState);
        setDislikes((prevDislikes) => (newDislikeState ? prevDislikes - 1 : prevDislikes + 1));
      }
      fetchData()
    } catch (error) {
      console.error("Error updating dislike:", error);
      setIsClickedDislike(!newDislikeState); // Revert state on error
      setDislikes((prevDislikes) => (newDislikeState ? prevDislikes - 1 : prevDislikes + 1)); // Revert count
    }
  };

    useEffect(() => {
    axios.get(`http://localhost:5000/api/katturai/${article.id}/gettoggle`)
      .then((res) => {
        setLikedArticles(res.data.isFavorite);
        console.log(res.data.isFavorite)
      })
      .catch((error) => {
        console.error("Error fetching favorite status:", error);
      });
  }, [article.id]); // Ensure it runs when article.id changes

  const handleClick = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/katturai/${article.id}/toggle`);
      setLikedArticles(res.data.isFavorite);
      if (res.data.isFavorite) {
        toast.success("Added to Favorites successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      } else {
        toast.info("Removed from Favorites successfully!", {
          position: "bottom-right",
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
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("URL copied to clipboard!", {
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
  };
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const handleTagClick = (tag) => {
      navigate(`/tags/${tag}`);
    };
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
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
      {/* Header */}
      <header className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="#"
            className="text-white hover:text-blue-200 transition"
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              window.history.back(); // Go to the previous page
            }}
          >
            <FaArrowLeft size={24} />
          </Link>
          <div className="flex items-center space-x-4">
            <FaHeart
              onClick={handleClick}
              className={`cursor-pointer ${likedArticles ? "text-red-500" : "text-gray-300"}`}
              size={24}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-6">{article.title}</h1>

        {/* Banner Image and Author Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="banner-section">
            {article.base_url && (
              <img
                src={`http://localhost:5000/${article.base_url}`}
                alt={article.title}
                className="w-full sm:w-3/4 md:w-1/2 lg:w-3/4 h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-md mx-auto"
              />
            )}
            <div className="mt-4 text-gray-700 flex items-center justify-evenly gap-4">
              {article.author_image && (
                <img
                  src={`http://localhost:5000${article.author_image}`}
                  className="w-12 h-12 object-cover rounded-lg shadow-md"
                  alt="Author"
                />
              )}
              <p className="font-semibold">{article.author_name}</p>
              <p>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : "N/A"}</p>
            </div>
          </div>

          {/* Short Description */}
          <div className="short-desc">
            <p className="text-lg text-gray-700">{article.short_desc}</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="content space-y-6">
          {Array.isArray(article.content) &&
            article.content.map((section, index) => (
              <div key={index} className="section">
                {section.title && <h2 className="text-2xl font-bold text-blue-600 mb-4">{section.title}</h2>}
                {section.quote && (
                  <blockquote className="text-gray-700 italic border-l-4 border-blue-600 pl-4 my-4">
                    {section.quote}
                  </blockquote>
                )}
                {section.para && (
                  <ul className="list-disc list-inside text-gray-700 mb-4 text-left">
                    {section.para.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.cont_img_url && (
                  <img
                    src={`http://localhost:5000/${section.cont_img_url}`}
                    alt={section.img_desc || "Article Image"}
                    className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-md mb-4 mx-auto"
                  />
                )}
              </div>
            ))}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="tags flex flex-wrap gap-2 mt-8">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {tag[index]}
              </span>
            ))}
          </div>
        )}

        {/* Icons */}
        <div className="icons flex justify-between items-center mt-8 border-t border-gray-200 pt-6">
          <div className="flex space-x-6">
            <span className="flex items-center text-gray-700">
              {isClickedLike ? (
                <FaThumbsUp
                  onClick={handleLike}
                  className="cursor-pointer text-red-600"
                  size={24}
                />
              ) : (
                <FaRegThumbsUp
                  onClick={handleLike}
                  className="cursor-pointer text-gray-400"
                  size={24}
                />
              )}
              <h1>&nbsp; {articleData.likes}</h1>
            </span>
            <span className="flex items-center text-gray-700">
              {isClickedDislike ? (
                <FaThumbsDown
                  onClick={handleDislike}
                  className="cursor-pointer text-red-600"
                  size={24}
                />
              ) : (
                <FaRegThumbsDown
                  onClick={handleDislike}
                  className="cursor-pointer text-gray-400"
                  size={24}
                />
              )}
              <h1>&nbsp; {articleData.dislikes}</h1>
            </span>
            <div ref={ref}>
            <span className="flex items-center text-gray-700">
              <FaBookOpen className="text-blue-600" size={24} />
              
              <AnimatePresence>
          {isVisible && (
           <motion.h1
           key="viewed"
          //  initial={{ opacity: 0, y: -10, backgroundColor: "#FFEB3B" }}
           animate={{
             opacity: 1,
             y: 0,
             backgroundColor: ["#FFEB3B", "#FFF"], // Animate from yellow to white
           }}
           exit={{ opacity: 0, y: 10 }}
           transition={{ duration: 1, ease: "easeInOut" }}
           className="px-2 rounded-lg"
         >
           &nbsp; {viewed}
         </motion.h1>
          )}
        </AnimatePresence>
        
              {/* <h1>&nbsp; {articleData.viewed}</h1> */}
            </span>
            </div>
            <div ref={ref}>
            <span className="flex items-center text-gray-700">
              <FaTrophy className="text-blue-600" size={24} />
              <AnimatePresence>
          {isVisible && (
            <motion.h1
            key={articleData.score}
            // initial={{ opacity: 0, y: -10, backgroundColor: "#FFEB3B" }}
            animate={{
              opacity: 2,
              y: 0,
              backgroundColor: ["#FFEB3B", "#FFF"], // Animate from yellow to white
            }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="px-2 rounded-lg"
          >
            &nbsp; {articleData.score}
          </motion.h1>
          )}
        </AnimatePresence>
              {/* <h1>&nbsp; {articleData.score}</h1> */}
            </span>
            </div>
          </div>
          <div>
            <IoShareSocial className="text-blue-600 cursor-pointer" size={24} onClick={handleShare} />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
            {tagNames.length > 0 ? (
              tagNames.map((tag, index) => (
                <button
                  key={index}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300 cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))
            ) : (
              <p className="text-gray-600">No tags available</p>
            )}
          </div>

        {/* Related Articles */}
        {article.relevance && article.relevance.length > 0 && (
          <div className="related-articles mt-12">
            <h3 className="text-2xl font-bold text-blue-600 mb-6">Related Articles</h3>
            <Swiper
              navigation={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
            >
              {article.relevance.map((related) => (
                <SwiperSlide key={related.id}>
                  <Link to={`/katturai-details/${related.id}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {related.img_url && (
                      <img
                        src={`http://localhost:5000/${related.img_url}`}
                        alt={related.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h4 className="text-lg font-bold text-blue-600 mb-2">{related.title}</h4>
                      <p className="text-gray-700">
                        {related.date_of_publish
                          ? new Date(related.date_of_publish).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

const Katturai_Details = () => {
  const [articleData, setArticleData] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const hasViewedUpdated = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/katturai/getsinglekatturai/${id}`);
        setArticleData(response.data);
        // const viewedKey = `viewed_${id}`;
        // if (!localStorage.getItem(viewedKey)) {
        //   await axios.put(`http://localhost:5000/api/katturai/${id}/view`);
        //   hasViewedUpdated.current = true; // Set flag to prevent duplicate calls
        //   localStorage.setItem(viewedKey, "true");
        // }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    const viewedKey = `viewed_${id}`; // Unique key per article

    if (!sessionStorage.getItem(viewedKey)) {
      axios.put(`http://localhost:5000/api/katturai/${id}/view`)
        .then(() => {
          sessionStorage.setItem(viewedKey, "true"); // Store viewed status
          hasViewedUpdated.current = true;
        })
        .catch((error) => console.error("Error updating view:", error));
    }
  }, [id]);


  return (
    <>
      {isLoading ? <Loader /> : ""}
      <ArticleDetails article={articleData} />
    </>
  );
};

export default Katturai_Details;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar_Katturai from "../Navbars/Navbar_Katturai";
import Loader from "../Loader/Loader";

function Tags() {
  const [tagNames, setTagNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/katturai/getalltagnames/");
        
        let tags = response.data;

        // Handle if backend returns a single string with commas
        if (Array.isArray(tags)) {
          tags = tags
            .map(tagString => tagString.split(",").map(tag => tag.trim())) // Split each index and trim
            .flat(); // Flatten into a single array
        }
        

        // Flatten in case backend returns nested arrays
        setTagNames(Array.isArray(tags) ? tags.flat() : []);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTagClick = (tag) => {
    navigate(`/tags/${tag}`);
  };

  return (
    <>
      <Navbar_Katturai />

      <div className="flex flex-col items-center p-6">
        {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Tags</h2> */}

        {isLoading ? (
          <Loader/>
        ) : (
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
        )}
      </div>
    </>
  );
}

export default Tags;

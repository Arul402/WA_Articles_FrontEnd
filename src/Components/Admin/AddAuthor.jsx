import axios from "axios";
import { useState } from "react";
import Loader from "../Loader/Loader";
import NavBar_Admin from "../Navbars/NavBar_Admin";
import { url } from "../../Functions/config";

export default function AddAuthor() {
  const [author, setAuthor] = useState({
    author_id: "",
    author_name: "",
    author_designation: "",
    author_image: null,
  });
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setAuthor({ ...author, author_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("author_id", author.author_id);
    formData.append("author_name", author.author_name);
    formData.append("author_designation", author.author_designation);
    formData.append("author_image", author.author_image);
  
    try {
      const response = await axios.post(`${url.config2}/api/admin/createauthor/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 200) {
        alert("Author added successfully!");
        setAuthor({
          author_id: "",
          author_name: "",
          author_designation: "",
          author_image: null,
        });
      } else {
        alert("Failed to add author.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }finally{
        setLoading(false);
    }
  
    
  };

  return (
    <>
    <NavBar_Admin/>
     {loading ? <Loader /> : ""}
    <div className="antialiased bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center p-4">
        
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg shadow-indigo-300">
        <h1 className="text-4xl font-bold text-indigo-700 text-center">
          Add Author ✍️
        </h1>

        <form className="my-10" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5">
            <label htmlFor="author_id">
              <p className="font-medium text-indigo-600 pb-2">Author ID</p>
              <input
                id="author_id"
                name="author_id"
                type="text"
                value={author.author_id}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter author ID"
                required
              />
            </label>

            <label htmlFor="author_name">
              <p className="font-medium text-indigo-600 pb-2">Author Name</p>
              <input
                id="author_name"
                name="author_name"
                type="text"
                value={author.author_name}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter author name"
                required
              />
            </label>

            <label htmlFor="author_image">
              <p className="font-medium text-indigo-600 pb-2">Author Image</p>
              <input
                id="author_image"
                name="author_image"
                type="file"
                onChange={handleImageChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                required
              />
            </label>

            <label htmlFor="author_designation">
              <p className="font-medium text-indigo-600 pb-2">Author Designation</p>
              <input
                id="author_designation"
                name="author_designation"
                type="text"
                value={author.author_designation}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter author designation"
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none transition duration-200"
            >
              {loading ? "Adding..." : "Add Author"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

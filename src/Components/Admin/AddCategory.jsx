import axios from "axios";
import { useState } from "react";
import Loader from "../Loader/Loader";
import NavBar_Admin from "../Navbars/NavBar_Admin";

export default function AddCategory() {
  const [category, setCategory] = useState({
    cat_id: "",
    cat_name: "",
    cat_img: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCategory({ ...category, cat_img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("cat_id", category.cat_id);
    formData.append("cat_name", category.cat_name);
    formData.append("cat_img", category.cat_img);

    try {
      const response = await axios.post("http://localhost:5000/api/admin/createcategory/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Category added successfully!");
        setCategory({
          cat_id: "",
          cat_name: "",
          cat_img: null,
        });
      } else {
        alert("Failed to add category.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar_Admin />
      {loading ? <Loader /> : ""}
      <div className="antialiased bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg shadow-indigo-300">
          <h1 className="text-4xl font-bold text-indigo-700 text-center">
            Add Category 🏷️
          </h1>
          <form className="my-10" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
              <label htmlFor="cat_id">
                <p className="font-medium text-indigo-600 pb-2">Category ID</p>
                <input
                  id="cat_id"
                  name="cat_id"
                  type="text"
                  value={category.cat_id}
                  onChange={handleChange}
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  placeholder="Enter category ID"
                  required
                />
              </label>
              <label htmlFor="cat_name">
                <p className="font-medium text-indigo-600 pb-2">Category Name</p>
                <input
                  id="cat_name"
                  name="cat_name"
                  type="text"
                  value={category.cat_name}
                  onChange={handleChange}
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  placeholder="Enter category name"
                  required
                />
              </label>
              <label htmlFor="cat_img">
                <p className="font-medium text-indigo-600 pb-2">Category Image</p>
                <input
                  id="cat_img"
                  name="cat_img"
                  type="file"
                  onChange={handleImageChange}
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none transition duration-200"
              >
                {loading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import React, { Fragment, useState } from "react";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import Loader from "../Loader/Loader";
import NavBar_Admin from "../Navbars/NavBar_Admin";

function AddKatturai() {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    short_desc: "",
    image: "",
    id: "",
    category_ids:[],
  });
  const [isLoading,setIsLoading]=useState(false)

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "category_ids") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => Number(item.trim())),
      }));
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically updates the key based on input name
    }));
  }
  function handleImageChange(e) {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  }

  async function create(e) {
    e.preventDefault();
    

    setFormData((prevState) => ({
      ...prevState,
      category_ids: Array.isArray(prevState.category_ids)
          ? prevState.category_ids  // Keep it as is if it's already an array
          : prevState.category_ids.split(",").map((item) => Number(item.trim())).filter(Number.isFinite),
        }));

    const formDataToSend = new FormData();
    formDataToSend.append("type", formData.type);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("short_desc", formData.short_desc);
    formDataToSend.append("id", formData.id);
    // formDataToSend.append("id_1", formData.id_1);
    // formDataToSend.append("id_2", formData.id_2);
    // formDataToSend.append("id_3", formData.id_3);
    // formDataToSend.append("id_4", formData.id_4);
    formData.category_ids.forEach((id) => {
      formDataToSend.append("category_ids[]", id); // Send as an array
    });
    // Append image only if selected
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      setIsLoading(true)
      const response = await axios.post(
        "http://localhost:5000/api/admin/create/",
        formDataToSend,
        {
          // headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        console.log("Success:", response.data);
        // alert("Data submitted successfully!");
        toast.success("Data submitted successfully!", {
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
        // console.log(response.data)
      }

      // Optionally reset form after submission
      setFormData({
        type: "",
        title: "",
        short_desc: "",
        image: "",
        id: "",
        category_ids:[]
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      // alert("Failed to submit data!");
      toast.error(`Failed to submit data! ${error.message}`, {
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
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Fragment>
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
      <NavBar_Admin/>

      <div className="antialiased bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg shadow-indigo-300">
          <h1 className="text-4xl font-bold text-indigo-700 text-center">
            Add Katturai 📝
          </h1>

          <form className="my-10">
            <div className="flex flex-col space-y-5">
              <label htmlFor="type">
                <p className="font-medium text-indigo-600 pb-2">Type Number</p>
                <input
                  id="type"
                  name="type"
                  type="number"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  placeholder="Enter type number"
                />
              </label>
              <label htmlFor="title">
                <p className="font-medium text-indigo-600 pb-2">Title</p>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  placeholder="Enter title"
                />
              </label>
              <label htmlFor="short_desc">
                <p className="font-medium text-indigo-600 pb-2">
                  Short Description
                </p>
                <textarea
                  id="short_desc"
                  name="short_desc"
                  value={formData.short_desc}
                  onChange={handleChange}
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  placeholder="Enter the Short Description"
                />
              </label>
              <label htmlFor="image">
                <p className="font-medium text-indigo-600 pb-2">Image</p>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                />
              </label>
              {formData.image && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-md border border-indigo-300"
                  />
                </div>
              )}
              <label htmlFor="id">
                <p className="font-medium text-indigo-600 pb-2">ID</p>
                <input
                  id="id"
                  name="id"
                  type="number"
                  value={formData.id}
                  onChange={handleChange}
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  placeholder="Enter title"
                />
              </label>
              <label htmlFor="category_ids">
              <p className="font-medium text-indigo-600 pb-2">Category Id's</p>
              <input
                id="category_ids"
                name="category_ids"
                type="text"
                value={formData.category_ids}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter Category Id's separated by commas"
              />
            </label>
              <button
                className="w-full py-3 font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                onClick={create}
              >
                <span>Create</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    transform="scale(-1,1) translate(-24,0)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default AddKatturai;

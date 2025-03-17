import axios from "axios";
import { useState } from "react";
import Loader from "../Loader/Loader";
import NavBar_Admin from "../Navbars/NavBar_Admin";

const AddKatturaiDetail = () => {
  const [formData, setFormData] = useState({
    id: "",
    category_ids: [],
    tag_ids: [],
    author_id: "",
    title: "",
    short_desc: "",
    keywords: "",
    base_url: "",
    score: "",
    likes: "",
    dislikes: "",
    viewed: "",
    content: [],
    relevance: [],
    author_name: "",
    tag_names: [],
  });
  const [content, setContent] = useState([
    {
      title: "",
      quote: "",
      para: [],
      cont_img_url: "",
      imagePreviewUrl:""
    },
  ]);
  const [relevance, setRelevance] = useState([
    {
      rid: "",
      rtitle: "",
      date_of_publish: "",
      images: "",
      imagePreviewUrl:""
    },
  ]);
  const [isLoading,setIsLoading]=useState(false)
  // const img_arr=[]

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    if (name === "category_ids" || name === "tag_ids") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => Number(item.trim())),
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.value,
      }));
    }
  };

  // const handleImageUpload = (index, file) => {
  //   if (file) {
  //     setContent((prevState) =>
  //       prevState.map((item, i) =>
  //         i === index ? { ...item, cont_img_url: file } : item
  //       )
  //     );
  //   }
  // };
  const handleImageUpload = (index, file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Convert File object to URL
      setContent((prevState) =>
        prevState.map((item, i) =>
          i === index ? { ...item, cont_img_url: file, imagePreviewUrl: imageUrl } : item
        )
      );
      
    }
  }; 
  const handleImageUploadRelevanve = (index, file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Convert File object to URL
      setRelevance((prevState) =>
        prevState.map((item, i) =>
          i === index ? { ...item, images: file, imagePreviewUrl: imageUrl } : item
        )
      );
    }
  };
  // console.log(img_arr)

  const addContent = (e) => {
    e.preventDefault();
    setContent((prevContent) => [
      ...prevContent,
      { title: "", quote: "", para: [], cont_img_url: "" },
    ]);
  };

  const removeContent = (index) => {
    setContent((prevContent) => prevContent.filter((_, i) => i !== index));
  };

  const handleContentChange = (index, field, value) => {
    setContent((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addPara = (index) => {
    setContent((prevContent) =>
      prevContent.map((item, i) =>
        i === index ? { ...item, para: [...item.para, ""] } : item
      )
    );
  };

  const handleParaChange = (cIndex, pIndex, value) => {
    setContent((prevContent) =>
      prevContent.map((item, i) =>
        i === cIndex
          ? {
              ...item,
              para: item.para.map((p, j) => (j === pIndex ? value : p)),
            }
          : item
      )
    );
  };

  const removePara = (cIndex, pIndex) => {
    setContent((prevContent) =>
      prevContent.map((item, i) =>
        i === cIndex
          ? { ...item, para: item.para.filter((_, j) => j !== pIndex) }
          : item
      )
    );
  };

  const addRelevance = (e) => {
    e.preventDefault();
    setRelevance((prevState) => [
      ...prevState,
      {
        rid: "",
        rtitle: "",
        date_of_publish: "",
        images: "",
      },
    ]);
  };

  const removeRelevance = (index) => {
    setRelevance((prevState) => prevState.filter((_, i) => i !== index));
  };

  const handleRelevanceChange = (index, field, value) => {
    setRelevance((prevState) =>
      prevState.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

          setFormData((prevState) => ({
          ...prevState,
          category_ids: Array.isArray(prevState.category_ids)
              ? prevState.category_ids  // Keep it as is if it's already an array
              : prevState.category_ids.split(",").map((item) => Number(item.trim())).filter(Number.isFinite),

          tag_ids: Array.isArray(prevState.tag_ids)
              ? prevState.tag_ids
              : prevState.tag_ids.split(",").map((item) => Number(item.trim())).filter(Number.isFinite),

          tag_names: Array.isArray(prevState.tag_names)
              ? prevState.tag_names
              : prevState.tag_names.split(",").map((item) => item.trim()).filter((item) => item !== ""),

           }));

    const formDataToSend = new FormData();
  
    // Append text fields
    formDataToSend.append("id", formData.id);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("short_desc", formData.short_desc);
    formDataToSend.append("keywords", formData.keywords);
    formDataToSend.append("author_name", formData.author_name);
    formDataToSend.append("author_id", formData.author_id);
    formDataToSend.append("viewed", formData.viewed);
    formDataToSend.append("likes", formData.likes);
    formDataToSend.append("dislikes", formData.dislikes);
    formDataToSend.append("score", formData.score);
    formDataToSend.append("base_url", formData.base_url);
    formDataToSend.append("tag_names", formData.tag_names);
    formData.category_ids.forEach((id) => {
      formDataToSend.append("category_ids[]", id); // Send as an array
    });
    
    formData.tag_ids.forEach((id) => {
      formDataToSend.append("tag_ids[]", id); // Send as an array
    });
    
  
    // Append content data
    content.forEach((item, index) => {
      formDataToSend.append(`content[${index}][title]`, item.title);
      formDataToSend.append(`content[${index}][quote]`, item.quote);
      item.para.forEach((para, pIndex) => {
        formDataToSend.append(`content[${index}][para][${pIndex}]`, para);
      });
      if (item.cont_img_url instanceof File) {
        formDataToSend.append(`cont_img_url`, item.cont_img_url);
      }
    });

  
    // Append relevance data
    relevance.forEach((item, index) => {
      formDataToSend.append(`relevance[${index}][id]`, item.rid);
      formDataToSend.append(`relevance[${index}][title]`, item.rtitle);
      formDataToSend.append(`relevance[${index}][date_of_publish]`, item.date_of_publish);
      if (item.images instanceof File) {
        formDataToSend.append(`relevance[${index}][image]`, item.images);
      }
    });
    // formDataToSend.append("relevance", JSON.stringify(relevance));
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/kattdetailcreate/${formData.id}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Response:", response.data);
      // console.log(response.data.images)
      alert("Katturai created successfully!");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response?.data || error.message
      );
      alert("Failed to create Katturai. Please try again.");
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
    <NavBar_Admin/>
    <div className="antialiased bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center p-4">
      {isLoading ? <Loader /> : ""}
      
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg shadow-indigo-300">
        <h1 className="text-4xl font-bold text-indigo-700 text-center">
          Add Katturai Detail 📝
        </h1>
        <form className="my-10" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5">
          <label htmlFor="author_name">
              <p className="font-medium text-indigo-600 pb-2">Author Name</p>
              <input
                id="author_name"
                name="author_name"
                type="text"
                value={formData.author_name}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter Author Name"
              />
            </label>
            <label htmlFor="author_id">
              <p className="font-medium text-indigo-600 pb-2">Author Id</p>
              <input
                id="author_id"
                name="author_id"
                type="number"
                value={formData.author_id}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter Author Id"
              />
            </label>
            <label htmlFor="tag_names">
              <p className="font-medium text-indigo-600 pb-2">Tag Names</p>
              <input
                id="tag_names"
                name="tag_names"
                type="text"
                value={formData.tag_names}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter Tag Names separated by commas"
              />
            </label>

            <label htmlFor="tag_ids">
              <p className="font-medium text-indigo-600 pb-2">Tag Id's</p>
              <input
                id="tag_ids"
                name="tag_ids"
                type="text"
                value={formData.tag_ids}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter Tag Id's separated by commas"
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

            <label htmlFor="keywords">
              <p className="font-medium text-indigo-600 pb-2">Keywords</p>
              <input
                id="keywords"
                name="keywords"
                type="text"
                value={formData.keywords}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter Keywords"
              />
            </label>

            <label htmlFor="base_url">
              <p className="font-medium text-indigo-600 pb-2">Base Image</p>
              <input
                id="base_url"
                name="base_url"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
              />
            </label>

            <label htmlFor="id">
              <p className="font-medium text-indigo-600 pb-2">ID</p>
              <input
                id="id"
                name="id"
                type="number"
                value={formData.id}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter ID"
              />
            </label>

            <label htmlFor="score">
              <p className="font-medium text-indigo-600 pb-2">SCORE</p>
              <input
                id="score"
                name="score"
                type="number"
                value={formData.score}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter score"
              />
            </label>

            <label htmlFor="likes">
              <p className="font-medium text-indigo-600 pb-2">LIKES</p>
              <input
                id="likes"
                name="likes"
                type="number"
                value={formData.likes}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter likes"
              />
            </label>

            <label htmlFor="dislikes">
              <p className="font-medium text-indigo-600 pb-2">DISLIKES</p>
              <input
                id="dislikes"
                name="dislikes"
                type="number"
                value={formData.dislikes}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter dislikes"
              />
            </label>

            <label htmlFor="viewed">
              <p className="font-medium text-indigo-600 pb-2">VIEWED</p>
              <input
                id="viewed"
                name="viewed"
                type="number"
                value={formData.viewed}
                onChange={handleChange}
                className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                placeholder="Enter viewed count"
              />
            </label>

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
              onClick={addContent}
            >
              Add Content
            </button>

            {content.map((item, cIndex) => (
  <div key={cIndex} className="p-4 bg-white shadow-md rounded mb-4">
    <input
      // className="w-full p-2 border mb-2"
      type="text"
      placeholder="Title"
      className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
      value={item.title}
      onChange={(e) =>
        handleContentChange(cIndex, "title", e.target.value)
      }
    />
    <textarea
      // className="w-full p-2 border mb-2"
      className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
      placeholder="Quote"
      value={item.quote}
      onChange={(e) =>
        handleContentChange(cIndex, "quote", e.target.value)
      }
    />
    <button
      className="px-3 py-1 bg-green-500 text-white rounded mb-2"
      onClick={(e) => {
        e.preventDefault();
        addPara(cIndex);
      }}
    >
      Add Para
    </button>

    {item.para.map((para, pIndex) => (
      <div key={`para-${cIndex}-${pIndex}`} className="mb-2">
        <textarea
          // className="w-full p-2 border mb-2"
          className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
          placeholder="Para"
          value={para}
          onChange={(e) =>
            handleParaChange(cIndex, pIndex, e.target.value)
          }
        />
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={(e) => {
            e.preventDefault();
            removePara(cIndex, pIndex);
          }}
        >
          Remove Para
        </button>
      </div>
    ))}

    <div className="mb-2">
      <label className="block mb-1 font-semibold">Upload Image</label>
      <input
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUpload(cIndex, e.target.files[0])}
  // className="w-full p-2 border"
  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
/>
      {item.cont_img_url && (
        <div className="mt-2">
          <img
            src={item.imagePreviewUrl}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}
    </div>

    <button
      className="px-3 py-1 bg-red-500 text-white rounded"
      onClick={() => removeContent(cIndex)}
    >
      Remove Content
    </button>
  </div>
))}

            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
              onClick={addRelevance}
            >
              Add Relevance
            </button>

            {relevance.map((item, rIndex) => (
              <div key={rIndex} className="p-4 bg-white shadow-md rounded mb-4">
                <input
                  // className="w-full p-2 border mb-2"
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  type="text"
                  placeholder="ID"
                  value={item.rid}
                  onChange={(e) =>
                    handleRelevanceChange(rIndex, "rid", e.target.value)
                  }
                />
                <input
                  // className="w-full p-2 border mb-2"
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  type="text"
                  placeholder="Title"
                  value={item.rtitle}
                  onChange={(e) =>
                    handleRelevanceChange(rIndex, "rtitle", e.target.value)
                  }
                />
                <input
                  // className="w-full p-2 border mb-2"
                  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
                  type="text"
                  placeholder="Date of Publish"
                  value={item.date_of_publish}
                  onChange={(e) =>
                    handleRelevanceChange(
                      rIndex,
                      "date_of_publish",
                      e.target.value
                    )
                  }
                />
                <div className="mb-2">
      <label className="block mb-1 font-semibold">Upload Image</label>
      <input
  type="file"
  accept="image/*"
  onChange={(e) => handleImageUploadRelevanve(rIndex, e.target.files[0])}
  // className="w-full p-2 border"
  className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
/>
      {item.images && (
        <div className="mt-2">
          <img
            src={item.imagePreviewUrl}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}
    </div>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => removeRelevance(rIndex)}
                >
                  Remove Relevance
                </button>
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 
  hover:from-indigo-600 hover:to-purple-600 rounded-lg shadow-lg transition-all duration-300 
  flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Create</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddKatturaiDetail;










// import axios from "axios";
// import { useState } from "react";

// const AddKatturaiDetail = () => {
//   const [formData, setFormData] = useState({
//     id: "",
//     category_ids: [],
//     tag_ids: [],
//     author_id: "",
//     title: "",
//     short_desc: "",
//     keywords: "",
//     base_url: "",
//     score: "",
//     likes: "",
//     dislikes: "",
//     viewed: "",
//     content: [],
//     relevance: [],
//     author_name: "",
//     tag_names: [],
//   });
//   const [content, setContent] = useState([
//       {
//         title: "",
//         quote: "",
//         para: [],
//         cont_img_url: "",
//       },
//     ]
//   );
//   const [relevance, setRelevance] = useState([
//     {
//       rid: "",
//       rtitle: "",
//       date_of_publish: "",
//       images: "", // Single image URL (or array if multiple images)
//     },
//   ]);

//   //   const handleChange = (e) => {
//   //     const { name, value, type } = e.target;

//   //     if (type === "file") {
//   //       setFormData({ ...formData, [name]: e.target.files[0] }); // Handle file upload
//   //     } else if (
//   //       ["category_ids", "tag_ids", "tag_names"].includes(name)
//   //     ) {
//   //       // Convert comma-separated values into an array, removing extra spaces
//   //       const valuesArray = value
//   //         .split(",")
//   //         .map((item) => item.trim())
//   //         .filter((item) => item !== "");
//   //       setFormData({ ...formData, [name]: valuesArray });
//   //     } else {
//   //       setFormData({ ...formData, [name]: value });
//   //     }
//   //   };

//   const handleChange = (e) => {
//     const { name, type, value } = e.target;

//     if (name === "category_ids" || name === "tag_ids") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value.split(",").map((item) => Number(item.trim())), // Convert string to array of numbers
//       }));
//     } else if (type === "file") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: e.target.files[0], // Store the file object
//       }));
//     } else {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: e.target.value,
//       }));
//     }
//   };

//   // const handleImageUpload = (cIndex, file) => {
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       handleContentChange(cIndex, "img_url", reader.result);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };
//   const handleImageUpload = (index, file) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setContent((prevState) => ({
//         content: prevState.content.map((item, i) =>
//           i === index ? { ...item, cont_img_url: reader.result } : item
//         ),
//       }));
//     };
//   };
  

//   //   const addContent = (e) => {
//   //     e.preventDefault();
//   //     setContent({
//   //       ...content,
//   //       content: [
//   //         ...content.content,
//   //         { ctitle: "", quote: "", para: [], img_url: "" },
//   //       ],
//   //     });
//   //   };

//   //   const removeContent = (index) => {
//   //     setContent({
//   //       ...content,
//   //       content: content.content.filter((_, i) => i !== index),
//   //     });
//   //   };

//   //   const handleContentChange = (index, field, value) => {
//   //     const updatedContent = [...content.content];
//   //     updatedContent[index][field] = value;
//   //     setContent({ ...content, content: updatedContent });
//   //   };

//   //   const addPara = (index) => {
//   //     // e.preventDefault();
//   //     const updatedContent = [...content.content];
//   //     updatedContent[index].para.push("");
//   //     setContent({ ...content, content: updatedContent });
//   //   };

//   //   const handleParaChange = (cIndex, pIndex, value) => {
//   //     const updatedContent = [...content.content];
//   //     updatedContent[cIndex].para[pIndex] = value;
//   //     setContent({ ...content, content: updatedContent });
//   //   };

//   // ➕ Add New Content Section
//   const addContent = (e) => {
//     e.preventDefault();
//     setContent((prevContent) => ({
//       ...prevContent,
//       content: [
//         ...prevContent.content,
//         { title: "", quote: "", para: [], cont_img_url: "" },
//       ],
//     }));
//   };

//   // ❌ Remove Content Section
//   const removeContent = (index) => {
//     setContent((prevContent) => ({
//       ...prevContent,
//       content: prevContent.content.filter((_, i) => i !== index),
//     }));
//   };

//   // 🔄 Update Content Field
//   //   const handleContentChange = (index, field, value) => {
//   //     setContent((prevContent) => ({
//   //       ...prevContent,
//   //       content: prevContent.content.map((item, i) =>
//   //         i === index ? { ...item, [field]: value } : item
//   //       ),
//   //     }));
//   //   };
//   // const handleContentChange = (index, field, value) => {
//   //   setContent((prevData) => {
//   //     const updatedContent = [...prevData.content];
//   //     updatedContent[index][field] = value; // Directly update the field
//   //     return { ...prevData, content: updatedContent };
//   //   });
//   // };
//   const handleContentChange = (index, field, value) => {
//     setContent((prevState) => ({
//       content: prevState.content.map((item, i) =>
//         i === index ? { ...item, [field]: value } : item
//       ),
//     }));
//   };
  

//   // ➕ Add Paragraph Field
//   // const addPara = (index) => {
//   //   setContent((prevContent) => ({
//   //     ...prevContent,
//   //     content: prevContent.content.map((item, i) =>
//   //       i === index ? { ...item, para: [...item.para, ""] } : item
//   //     ),
//   //   }));
//   // };
//   const addPara = (index) => {
//     setContent((prevState) => ({
//       content: prevState.content.map((item, i) =>
//         i === index ? { ...item, para: [...item.para, ""] } : item
//       ),
//     }));
//   };
  

//   // 🔄 Update Paragraph Field
//   // const handleParaChange = (cIndex, pIndex, value) => {
//   //   setContent((prevContent) => ({
//   //     ...prevContent,
//   //     content: prevContent.content.map((item, i) =>
//   //       i === cIndex
//   //         ? {
//   //             ...item,
//   //             para: item.para.map((p, pi) => (pi === pIndex ? value : p)),
//   //           }
//   //         : item
//   //     ),
//   //   }));
//   // };
//   const handleParaChange = (cIndex, pIndex, value) => {
//     setContent((prevState) => ({
//       content: prevState.content.map((item, i) =>
//         i === cIndex
//           ? {
//               ...item,
//               para: item.para.map((p, j) => (j === pIndex ? value : p)),
//             }
//           : item
//       ),
//     }));
//   };
  

//   // ❌ Remove Paragraph
//   // const removePara = (cIndex, pIndex) => {
//   //   setContent((prevContent) => ({
//   //     ...prevContent,
//   //     content: prevContent.content.map((item, i) =>
//   //       i === cIndex
//   //         ? { ...item, para: item.para.filter((_, pi) => pi !== pIndex) }
//   //         : item
//   //     ),
//   //   }));
//   // };
//   const removePara = (cIndex, pIndex) => {
//     setContent((prevState) => ({
//       content: prevState.content.map((item, i) =>
//         i === cIndex
//           ? { ...item, para: item.para.filter((_, j) => j !== pIndex) }
//           : item
//       ),
//     }));
//   };
  

//   //   const addRelevance = (e) => {
//   //     e.preventDefault();
//   //     setFormData({
//   //       ...formData,
//   //       relevance: [
//   //         ...formData.relevance,
//   //         { id: "", title: "", thumbnail_url: [], date_of_publish: "" },
//   //       ],
//   //     });
//   //   };

//   //   const removeRelevance = (index) => {
//   //     setFormData({
//   //       ...formData,
//   //       relevance: formData.relevance.filter((_, i) => i !== index),
//   //     });
//   //   };

//   // Add a new relevance item
//   const addRelevance = (e) => {
//     e.preventDefault();
//     setRelevance((prevState) => [
//       ...prevState,
//       {
//         rid: "",
//         rtitle: "",
//         date_of_publish: "",
//         images: "",
//       },
//     ]);
//   };

//   // Remove a relevance item by index
//   const removeRelevance = (index) => {
//     setRelevance((prevState) => prevState.filter((_, i) => i !== index));
//   };

//   // Handle changes in the relevance fields
//   const handleRelevanceChange = (index, field, value) => {
//     setRelevance((prevState) => {
//       const updatedRelevance = [...prevState];
//       updatedRelevance[index][field] = value;
//       return updatedRelevance;
//     });
//   };

//   //   const removePara = (cIndex, pIndex) => {
//   //     setContent((prevData) => {
//   //       const updatedContent = [...prevData.content];
//   //       updatedContent[cIndex].para = updatedContent[cIndex].para.filter(
//   //         (_, i) => i !== pIndex
//   //       ); // ✅ Remove specific paragraph
//   //       return { ...prevData, content: updatedContent };
//   //     });
//   //   };

//   //   const handleRelevanceChange = (index, field, value) => {
//   //     const updatedRelevance = [...formData.relevance];
//   //     updatedRelevance[index][field] = value;
//   //     setFormData({ ...formData, relevance: updatedRelevance });
//   //   };

//   //   const handleSubmit = async (e) => {
//   //     e.preventDefault();

//   //     setFormData((prevState) => ({
//   //         ...prevState,
//   //         category_ids: Array.isArray(prevState.category_ids)
//   //             ? prevState.category_ids  // Keep it as is if it's already an array
//   //             : prevState.category_ids.split(",").map((item) => Number(item.trim())).filter(Number.isFinite),

//   //         tag_ids: Array.isArray(prevState.tag_ids)
//   //             ? prevState.tag_ids
//   //             : prevState.tag_ids.split(",").map((item) => Number(item.trim())).filter(Number.isFinite),

//   //         tag_names: Array.isArray(prevState.tag_names)
//   //             ? prevState.tag_names
//   //             : prevState.tag_names.split(",").map((item) => item.trim()).filter((item) => item !== ""),

//   //          }));

//   //     const formDataToSend = new FormData();
//   //     // formDataToSend.append("id", formData.id);
//   //     formDataToSend.append(
//   //       "category_ids",
//   //       formData.category_ids.split(",").map((item) => Number(item.trim())).filter(Number.isFinite)
//   //     );

//   //     formDataToSend.append("tag_ids", formData.tag_ids);
//   //     formDataToSend.append("author_id", formData.author_id);
//   //     formDataToSend.append("author_name", formData.author_name);
//   //     formDataToSend.append("keywords", formData.keywords);
//   //     formDataToSend.append("score", formData.score);
//   //     formDataToSend.append("likes", formData.likes);
//   //     formDataToSend.append("dislikes", formData.dislikes);
//   //     formDataToSend.append("viewed", formData.viewed);
//   //     // formDataToSend.append("content", JSON.stringify(formData.content));
//   //     // formDataToSend.append("relevance", JSON.stringify(formData.relevance));
//   //     formDataToSend.append("tag_names", formData.tag_names);

//   //     // Append files
//   //     // if (formData.thumbnail_url) {
//   //     // formDataToSend.append("thumbnail_url", formData.thumbnail_url);
//   //     // }
//   //     if (formData.thumbnail_url) {
//   //         formDataToSend.append("thumbnail_url", formData.thumbnail_url);
//   //       }

//   //     // if (formData.images && formData.images.length > 0) {
//   //     //     formData.images.forEach((file) => {
//   //     //         formDataToSend.append("images", file);
//   //     //     });
//   //     // }

//   //     try {
//   //       const response = await axios.post(
//   //         `http://localhost:5000/api/katturai/kattdetailcreate/${formData.id}/`,
//   //         formDataToSend,
//   //         {
//   //           headers: {
//   //             // "Content-Type": "multipart/form-data",
//   //           },
//   //         }
//   //       );

//   //       console.log("Response:", response.data);
//   //       alert("Katturai created successfully!");

//   //       // Reset form after submission
//   //       setFormData({
//   //         id: "",
//   //         category_ids: [],
//   //         tag_ids: [],
//   //         author_id: "",
//   //         author_name: "",
//   //         keywords: [],
//   //         score: 0,
//   //         likes: 0,
//   //         dislikes: 0,
//   //         viewed: 0,
//   //         content: [],
//   //         relevance: [],
//   //         tag_names: [],
//   //         thumbnail_url: null,
//   //         images: [],
//   //       });
//   //     } catch (error) {
//   //       console.error("Error submitting form:", error);
//   //       console.log(error.message);
//   //       alert("Failed to create Katturai. Please try again.");
//   //     }
//   //   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Convert category_ids and tag_ids to arrays (if not already)
//     const updatedFormData = {
//       ...formData,
//       category_ids: Array.isArray(formData.category_ids)
//         ? formData.category_ids
//         : formData.category_ids.split(",").map(Number).filter(Number.isFinite),

//       tag_ids: Array.isArray(formData.tag_ids)
//         ? formData.tag_ids
//         : formData.tag_ids.split(",").map(Number).filter(Number.isFinite),

//       tag_names: Array.isArray(formData.tag_names)
//         ? formData.tag_names
//         : formData.tag_names
//             .split(",")
//             .map((item) => item.trim())
//             .filter((item) => item !== ""),
//     };
//     const contentData = {
//       // content: [
//       //   {
//       //     title: content.title,
//       //     quote: content.quote,
//       //     para: content.para,
//       //     cont_img_url: content.cont_img_url
//       //   }
//       // ]
//       content: content.content.map((item) => ({
//         title: item.title, // Correct field name
//         quote: item.quote, // Correct field name
//         para: item.para, // Ensure this is an array
//         cont_img_url: item.cont_img_url,
//       })),
//     };
    
    
    

//     const formattedRelevance = relevance.map((item) => ({
//       id: item.rid,
//       title: item.rtitle,
//       date_of_publish: item.date_of_publish,
//       images: item.images, // If multiple images, use an array here
//     }));

//     const formDataToSend = new FormData();

//     // Append individual category and tag IDs
//     updatedFormData.category_ids.forEach((id) =>
//       formDataToSend.append("category_ids", id)
//     );
//     updatedFormData.tag_ids.forEach((id) =>
//       formDataToSend.append("tag_ids[]", id)
//     );
//     updatedFormData.tag_names.forEach((tag) =>
//       formDataToSend.append("tag_names[]", tag)
//     );

//     // Append other fields
//     formDataToSend.append("author_id", updatedFormData.author_id);
//     formDataToSend.append("author_name", updatedFormData.author_name);
//     formDataToSend.append("keywords", updatedFormData.keywords);
//     formDataToSend.append("score", updatedFormData.score);
//     formDataToSend.append("likes", updatedFormData.likes);
//     formDataToSend.append("dislikes", updatedFormData.dislikes);
//     formDataToSend.append("viewed", updatedFormData.viewed);
//     formDataToSend.append(
//       "content",
//       // updatedFormData.content
//       JSON.stringify(contentData)
//     ); // Send as JSON
//     formDataToSend.append("relevance", JSON.stringify(formattedRelevance)); // Send as JSON
//     contentData.content.forEach((item, index) => {
//       formDataToSend.append(`content[${index}][title]`, item.title);
//       formDataToSend.append(`content[${index}][quote]`, item.quote);
//       formDataToSend.append(
//         `content[${index}][para]`,
//         JSON.stringify(item.para)
//       ); // Array as JSON
//       // formDataToSend.append(`content[${index}][img_url]`, item.img_url);
//     });

//     // Append file (thumbnail)
//     if (updatedFormData.base_url) {
//         const baseUrlString = Array.isArray(updatedFormData.base_url)
//             ? updatedFormData.base_url[0] // Take the first item if it's an array
//             : updatedFormData.base_url; // Use it directly if it's already a string
    
//         formDataToSend.append("base_url", baseUrlString);
//     }
    

//     // Append multiple images
//     if (updatedFormData.images && updatedFormData.images.length > 0) {
//       updatedFormData.images.forEach((file) =>
//         formDataToSend.append("images[]", file)
//       );
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/katturai/kattdetailcreate/${updatedFormData.id}/`,
//         formDataToSend,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Response:", response.data);
//       alert("Katturai created successfully!");

//       // Reset form after submission
//       setFormData({
//         id: "",
//         category_ids: [],
//         tag_ids: [],
//         author_id: "",
//         author_name: "",
//         keywords: [],
//         score: 0,
//         likes: 0,
//         dislikes: 0,
//         viewed: 0,
//         content: [],
//         relevance: [],
//         tag_names: [],
//         thumbnail_url: null,
//         images: [],
//       });
//     } catch (error) {
//       console.error(
//         "Error submitting form:",
//         error.response?.data || error.message
//       );
//       alert("Failed to create Katturai. Please try again.");
//     }
//   };

//   return (
//     <div className="antialiased bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center p-4">
//       <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg shadow-indigo-300">
//         <h1 className="text-4xl font-bold text-indigo-700 text-center">
//           Add Katturai Detail 📝
//         </h1>
//         <form className="my-10" onSubmit={handleSubmit}>
//           <div className="flex flex-col space-y-5">
//             {/* <form onSubmit={handleSubmit}> */}
//             <label htmlFor="tag_names">
//               <p className="font-medium text-indigo-600 pb-2">Tag Names</p>
//               <input
//                 id="tag_names"
//                 name="tag_names"
//                 type="text"
//                 value={formData.tag_names}
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//                 placeholder="Enter Tag Names separated by commas"
//               />
//             </label>

//             <label htmlFor="tag_ids">
//               <p className="font-medium text-indigo-600 pb-2">Tag Id's</p>
//               <input
//                 id="tag_ids"
//                 name="tag_ids"
//                 type="text"
//                 value={formData.tag_ids}
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//                 placeholder="Enter Tag Id's separated by commas"
//               />
//             </label>

//             <label htmlFor="category_ids">
//               <p className="font-medium text-indigo-600 pb-2">Category Id's</p>
//               <input
//                 id="category_ids"
//                 name="category_ids"
//                 type="text"
//                 value={formData.category_ids}
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//                 placeholder="Enter Category Id's separated by commas"
//               />
//             </label>

//             <label htmlFor="keywords">
//               <p className="font-medium text-indigo-600 pb-2">Keywords</p>
//               <input
//                 id="keywords"
//                 name="keywords"
//                 type="text"
//                 value={formData.keywords}
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//                 placeholder="Enter Keywords separated by commas"
//               />
//             </label>

//             <label htmlFor="base_url">
//         <p className="font-medium text-indigo-600 pb-2">Base Image</p>
//         <input
//             id="base_url"
//             name="base_url"
//             type="file"
//             accept="image/*"
//         onChange={handleChange}
//             className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//         />
//     </label>

//             <label htmlFor="id">
//               <p className="font-medium text-indigo-600 pb-2">ID</p>
//               <input
//                 id="id"
//                 name="id"
//                 type="number"
//                 value={formData.id}
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//                 placeholder="Enter ID"
//               />
//             </label>

//             <label htmlFor="score">
//               <p className="font-medium text-indigo-600 pb-2">SCORE</p>
//               <input
//                 id="score"
//                 name="score"
//                 type="number"
//                 value={formData.score}
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//                 placeholder="Enter score"
//               />
//             </label>

//             <label htmlFor="likes">
//               <p className="font-medium text-indigo-600 pb-2">LIKES</p>
//               <input
//                 id="likes"
//                 name="likes"
//                 type="number"
//                 value={formData.likes}
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//                 placeholder="Enter likes"
//               />
//             </label>

//             <label htmlFor="dislikes">
//               <p className="font-medium text-indigo-600 pb-2">DISLIKES</p>
//               <input
//                 id="dislikes"
//                 name="dislikes"
//                 type="number"
//                 value={formData.dislikes}
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//                 placeholder="Enter dislikes"
//               />
//             </label>

//             <label htmlFor="viewed">
//               <p className="font-medium text-indigo-600 pb-2">VIEWED</p>
//               <input
//                 id="viewed"
//                 name="viewed"
//                 type="number"
//                 value={formData.viewed}
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//                 placeholder="Enter viewed count"
//               />
//             </label>
//             {/* <label htmlFor="thumbnail_url">
//               <p className="font-medium text-indigo-600 pb-2">
//                 Thumbnail Image
//               </p>
//               <input
//                 id="thumbnail_url"
//                 name="thumbnail_url"
//                 type="file"
//                 onChange={handleChange}
//                 className="w-full py-3 border border-indigo-300 rounded-lg px-3 focus:outline-none focus:border-indigo-500 hover:shadow-md bg-white text-indigo-700"
//               />
//             </label> */}

//             {/* <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
//         Submit
//     </button>
// </form> */}

//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
//               onClick={addContent}
//             >
//               Add Content
//             </button>
//             {/* {formData.content.map((content, cIndex) => (
//               <div key={cIndex} className="p-4 bg-white shadow-md rounded mb-4">
//                 <input
//                   className="w-full p-2 border mb-2"
//                   type="text"
//                   placeholder="Title"
//                   value={content.title}
//                   onChange={(e) =>
//                     handleContentChange(cIndex, "title", e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border mb-2"
//                   placeholder="Quote"
//                   value={content.quote}
//                   onChange={(e) =>
//                     handleContentChange(cIndex, "quote", e.target.value)
//                   }
//                 />
//                 <button
//                   className="px-3 py-1 bg-green-500 text-white rounded mb-2"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     addPara(cIndex);
//                   }}
//                 >
//                   Add Para
//                 </button>
//                 {content.para.map((para, pIndex) => (
//                   <div key={`para-${cIndex}-${pIndex}`}>
//                     <textarea
//                       className="w-full p-2 border mb-2"
//                       placeholder="Para"
//                       value={para}
//                       onChange={(e) =>
//                         handleParaChange(cIndex, pIndex, e.target.value)
//                       }
//                     />
//                     <button
//                       className="px-3 py-1 bg-red-500 text-white rounded"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         removePara(cIndex, pIndex);
//                       }}
//                     >
//                       Remove Para
//                     </button>
//                   </div>
//                 ))}

//                 <input
//                   className="w-full p-2 border mb-2"
//                   type="text"
//                   placeholder="Image URL"
//                   value={content.img_url}
//                   onChange={(e) =>
//                     handleContentChange(cIndex, "img_url", e.target.value)
//                   }
//                 />
//                 <button
//                   className="px-3 py-1 bg-red-500 text-white rounded"
//                   onClick={() => removeContent(cIndex)}
//                 >
//                   Remove Content
//                 </button>
//               </div>
//             ))} */}

//             {content.map((content, cIndex) => (
//               <div
//                 key={`content-${cIndex}`}
//                 className="mb-4 p-4 border rounded"
//               >
//                 <input
//                   className="w-full p-2 border mb-2"
//                   type="text"
//                   placeholder="Title"
//                   value={content.title}
//                   onChange={(e) =>
//                     handleContentChange(cIndex, "ctitle", e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border mb-2"
//                   placeholder="Quote"
//                   value={content.quote}
//                   onChange={(e) =>
//                     handleContentChange(cIndex, "quote", e.target.value)
//                   }
//                 />
//                 <button
//                   className="px-3 py-1 bg-green-500 text-white rounded mb-2"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     addPara(cIndex);
//                   }}
//                 >
//                   Add Para
//                 </button>

//                 {Array.isArray(content.para) &&
//                   content.para.map((para, pIndex) => (
//                     <div key={`para-${cIndex}-${pIndex}`} className="mb-2">
//                       <textarea
//                         className="w-full p-2 border mb-2"
//                         placeholder="Para"
//                         value={para}
//                         onChange={(e) =>
//                           handleParaChange(cIndex, pIndex, e.target.value)
//                         }
//                       />
//                       <button
//                         className="px-3 py-1 bg-red-500 text-white rounded"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           removePara(cIndex, pIndex);
//                         }}
//                       >
//                         Remove Para
//                       </button>
//                     </div>
//                   ))}

//                 {/* Image Upload Section */}
//                 <div className="mb-2">
//       <label className="block mb-1 font-semibold">Upload Image</label>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => handleImageUpload(cIndex, e.target.files[0])}
//         className="w-full p-2 border"
//       />
//       {content.cont_img_url && (
//         <div className="mt-2">
//           <img
//             src={content.cont_img_url}
//             alt="Uploaded"
//             className="w-32 h-32 object-cover rounded"
//           />
//         </div>
//       )}
//     </div>

//                 <button
//                   className="px-3 py-1 bg-red-500 text-white rounded"
//                   onClick={() => removeContent(cIndex)}
//                 >
//                   Remove Content
//                 </button>
//               </div>
//             ))}

//             {/* <button
//               className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
//               onClick={addRelevance}
//             >
//               Add Relevance
//             </button>
//             {formData.relevance.map((relevance, rIndex) => (
//               <div key={rIndex} className="p-4 bg-white shadow-md rounded mb-4">
//                 <input
//                   className="w-full p-2 border mb-2"
//                   type="text"
//                   placeholder="ID"
//                   value={relevance.id}
//                   onChange={(e) =>
//                     handleRelevanceChange(rIndex, "id", e.target.value)
//                   }
//                 />
//                 <input
//                   className="w-full p-2 border mb-2"
//                   type="text"
//                   placeholder="Title"
//                   value={relevance.title}
//                   onChange={(e) =>
//                     handleRelevanceChange(rIndex, "title", e.target.value)
//                   }
//                 />
//                 <input
//                   className="w-full p-2 border mb-2"
//                   type="text"
//                   placeholder="Date of Publish"
//                   value={relevance.date_of_publish}
//                   onChange={(e) =>
//                     handleRelevanceChange(
//                       rIndex,
//                       "date_of_publish",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <button
//                   className="px-3 py-1 bg-red-500 text-white rounded"
//                   onClick={() => removeRelevance(rIndex)}
//                 >
//                   Remove Relevance
//                 </button>
//               </div>
//             ))}
//             <button
//               type="submit"
//               className="w-full py-3 font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
//             >
//               <span>Create</span>
//             </button> */}
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
//               onClick={addRelevance}
//             >
//               Add Relevance
//             </button>

//             {relevance.map((item, rIndex) => (
//               <div key={rIndex} className="p-4 bg-white shadow-md rounded mb-4">
//                 <input
//                   className="w-full p-2 border mb-2"
//                   type="text"
//                   placeholder="ID"
//                   value={item.rid}
//                   onChange={(e) =>
//                     handleRelevanceChange(rIndex, "rid", e.target.value)
//                   }
//                 />
//                 <input
//                   className="w-full p-2 border mb-2"
//                   type="text"
//                   placeholder="Title"
//                   value={item.rtitle}
//                   onChange={(e) =>
//                     handleRelevanceChange(rIndex, "rtitle", e.target.value)
//                   }
//                 />
//                 <input
//                   className="w-full p-2 border mb-2"
//                   type="text"
//                   placeholder="Date of Publish"
//                   value={item.date_of_publish}
//                   onChange={(e) =>
//                     handleRelevanceChange(
//                       rIndex,
//                       "date_of_publish",
//                       e.target.value
//                     )
//                   }
//                 />
//                 <button
//                   className="px-3 py-1 bg-red-500 text-white rounded"
//                   onClick={() => removeRelevance(rIndex)}
//                 >
//                   Remove Relevance
//                 </button>
//               </div>
//             ))}

//             <button
//               type="submit"
//               className="w-full py-3 font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 
//   hover:from-indigo-600 hover:to-purple-600 rounded-lg shadow-lg transition-all duration-300 
//   flex items-center justify-center space-x-2 cursor-pointer"
//             >
//               <span>Create</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddKatturaiDetail;

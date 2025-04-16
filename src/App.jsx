import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddKatturai from "./Components/Admin/AddKatturai"
import Katturai from "./Components/Katturai/Katturai"
import KatturaiDetail from "./Components/Katturai/KatturaiDetail"
import AddKatturaiDetail from "./Components/Admin/AddKatturaiDetail"
import AddAuthor from "./Components/Admin/AddAuthor"
import Author from "./Components/Katturai/Author"
import Newkatturai from "./Components/Katturai/Newkatturai"
import Trending from "./Components/Katturai/Trending"
import Favourites from "./Components/Katturai/Favourites"
import Onboarding from "./Components/Onboarding"
import Admin from "./Components/Admin/Admin"
import AddCategory from "./Components/Admin/AddCategory"
import Category from "./Components/Katturai/Category"
import Tags from "./Components/Katturai/Tags"
import { SearchProvider } from "./Components/Katturai/SearchContext"
import TagNamesDetail from "./Components/Katturai/TagNamesDetail"
import CategoryDetail from "./Components/Katturai/CategoryDetail"
import AuthorDetail from "./Components/Katturai/AuthorDetail"

function App() {

  return (
    <>
    <SearchProvider>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Katturai />} />
        <Route path="/katturai-details/:id" element={<KatturaiDetail />} />
        <Route path="/authors" element={<Author />} />
        <Route path="/authors/:id" element={<AuthorDetail />} />
        <Route path="/new" element={<Newkatturai />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/:id" element={<CategoryDetail />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/tags/:tagNames" element={<TagNamesDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addkatturai" element={<AddKatturai />} />
        <Route path="/addkatturaidetail" element={<AddKatturaiDetail />} />
        <Route path="/addauthor" element={<AddAuthor />} />
        <Route path="/addcategory" element={<AddCategory />} />
      </Routes>
</BrowserRouter>
</SearchProvider>
      {/* <footer className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg z-50 text-center font-bold p-2 fixed bottom-0 w-full">
        Designed and Developed by arul
      </footer> */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg text-center font-bold p-2 w-full">
  Designed and Developed by Arul
</footer>

      
    </>
  )
}

export default App

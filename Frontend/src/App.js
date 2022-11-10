import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import EditUserProfilePage from "./pages/EditUserProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FollowingPage from "./pages/FollowingPage";
import { CustomTokenContextProvider } from "./Contexts/TokenContext";
import NotFoundPage from "./pages/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage";

function App() {
  return (
    <BrowserRouter>
      <CustomTokenContextProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/post/new" element={<NewPostPage />} />
          <Route path="/profile/:idUser" element={<ProfilePage />} />
          <Route path="/editUserProfile" element={<EditUserProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/following" element={<FollowingPage />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer position="bottom-center" newestOnTop={true} />
      </CustomTokenContextProvider>
    </BrowserRouter>
  );
}

export default App;

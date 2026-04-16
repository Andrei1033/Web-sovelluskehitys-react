import "./App.css";
import Home from "../src/components/home.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Lajout.jsx";
import Profile from "./views/Profile.jsx";
import Upload from "./views/Upload.jsx";
import Single from "./views/Single.jsx";
import Login from "./views/Login";
import Logout from "./views/Logout";
import { UserProvider } from "./contexts/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <UserProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
              <Route path="single" element={<Single />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};
export default App;

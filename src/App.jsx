import './App.css';
import Home from '../src/components/home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Lajout.jsx';
import Profile from './views/Profile.jsx';
import Upload from './views/Upload.jsx';
import Single from './views/Single.jsx';
import Login from "./views/Login";
import Logout from "./views/Logout";

const App = () => {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home />}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/upload' element={<Upload/>}/>
            <Route path='single' element={<Single/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;

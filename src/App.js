import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute";
import Category from "./Pages/Category";
import Contact from "./Pages/Contact";
import CreateListing from "./Pages/CreateListing";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import Listing from "./Pages/Listing";
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import EditListing from "./Pages/EditListing";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Offers" element={<Offers/>}/>
        <Route path="/Category/:categoryName" element={<Category/>}/>
        <Route path="/editListing/:listingId" element={<EditListing/>}/>
        <Route path="/Signin" element={<Signin/>}/>
        <Route path="/Profile" element={<PrivateRoute/>}>
           <Route path="/Profile" element={<Profile/>}/>
        </Route>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/contact/:landlordId" element={<Contact/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/create-listings" element={<CreateListing/>}/>
        <Route path="/Category/:categoryName/:listingId" element={<Listing/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

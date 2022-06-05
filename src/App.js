import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import TAC from './pages/Tac';
import ContactUs from './pages/ContactUs';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {ToastContainer} from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import Contact from './pages/Contact';
function App() {
  return (
   <>
   <Router>
     <Routes>
       <Route path='/' element={<Explore/>}/>
       <Route path='/offers' element={<Offers/>}/>
       <Route path='/Tac'  element={<TAC/>}/>
      <Route path='/ContactUs'  element={<ContactUs/>}/>
       <Route path='/category/:categoryName' element={<Category/>}/>
       <Route path='/profile' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
       </Route>
       <Route path='/Sign-in' element={<SignIn/>}/>
       <Route path='/Sign-up' element={<SignUp/>}/>
       <Route path='/forgot-password' element={<ForgotPassword/>}/>
       <Route path='/create-listing' element={<CreateListing/>}/>
       <Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
       <Route path='/contact/:landLordId' element={<Contact/>}/>
     </Routes>
     <Navbar/>
   </Router>
   <ToastContainer/>
   </>
  );
}

export default App;

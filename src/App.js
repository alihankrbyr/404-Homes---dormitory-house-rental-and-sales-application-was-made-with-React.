import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import ForgotPassword from './pages/ForgotPassword';


import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {ToastContainer} from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
   <>
   <Router>
     <Routes>
       <Route path='/' element={<SignIn/>}/>
       <Route path='/Sign-in' element={<SignIn/>}/>
       <Route path='/Sign-up' element={<SignUp/>}/>
       <Route path='/forgot-password' element={<ForgotPassword/>}/>
     </Routes>
    
   </Router>
   <ToastContainer/>
   </>
  );
}

export default App;

import React,{useState} from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db} from '../firebase.config'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {toast} from 'react-toastify'
import OAuth from '../components/OAuth';
function SignUp() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })
  const {name, email, password} = formData

  const navigate = useNavigate()

  const onChange =(e)=>{setFormData((prevState)=>({
    ...prevState,
    [e.target.id] : e.target.value
  }))}

  const onSubmit = async(e)=>{
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name
      })
      navigate('/')

      const fromDataCopy = {...formData}
      delete(fromDataCopy.password)
      fromDataCopy.timeStamp = serverTimestamp()
      setDoc(doc(db, 'users', user.uid), fromDataCopy)

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong with the registration")
    }
  }

  return (
    <>
    <div className="pageContainer">
      <header>
      <p className="pageHeader">
        Register
      </p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="text" className='nameInput' placeholder='Name' id='name' value={name} onChange={onChange} />
          <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange} />
          <div className="passwordInputDiv">
            <input type={showPassword? 'text':'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />
            <img src={visibilityIcon} alt="Show Password" className="showPassword" onClick={()=>setShowPassword((prevState)=>!prevState)} />

          </div>
          {/* <Link to='/forgot-password' className='forgotPasswordLink' >Forgot Password</Link> */}
          <div className="signUpBar">
            <p className="signUpText">
              <button className='signUpButton'><ArrowRightIcon fill='white' width='34px' height='34px'/> </button>
            </p>
          </div>
        </form>
        <OAuth/>
        <Link to='/Sign-in' className='registerLink'>Sign In Instead</Link>
      </main>
    </div>
    </>
  )
}

export default SignUp
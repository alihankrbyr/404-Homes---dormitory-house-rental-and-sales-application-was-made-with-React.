import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {toast} from 'react-toastify'
import OAuth from '../components/OAuth'
function SignIn() {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const {email, password} = formData

  const navigate = useNavigate()

  const onChange =(e)=>{setFormData((prevState)=>({
    ...prevState,
    [e.target.id] : e.target.value
  }))}

  const onSubmit= async(e)=>{
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      if(userCredentials.user){
        navigate('/')
      }
    } catch (error) {
      toast.error('Bad user credentials')
    }
  }
  return (
    <>
    <div className="pageContainer">
      <header>
      <p className="pageHeader">
        Welcome Back!
      </p>
      </header>
        <form onSubmit={onSubmit}>
          <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange} />
          <div className="passwordInputDiv">
            <input type={showPassword? 'text':'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />
            <img src={visibilityIcon} alt="Show Password" className="showPassword" onClick={()=>setShowPassword((prevState)=>!prevState)} />

          </div>
          <Link to='/forgot-password' className='forgotPasswordLink' >Forgot Password</Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
              <button className='signInButton'><ArrowRightIcon fill='white' width='34px' height='34px'/> </button>
          </div>
        </form>
        <OAuth/>
        <Link to='/Sign-up' className='registerLink'>Sign Up Instead</Link>
    </div>
    </>
  )
}

export default SignIn
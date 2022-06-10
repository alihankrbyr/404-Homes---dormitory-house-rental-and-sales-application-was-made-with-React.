import React,{useState} from 'react'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg"

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const onSubmit=async(e)=>{
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }
  const onChange=(e)=>{
    setEmail(e.target.value)
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="Pageheader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="email"
           className='emailInput'
           placeholder='Email'
           id='email'
           value={email}
           onChange={onChange}
           
           />
           <Link className='forgotPasswordLink' to='/Sign-in'>Sign In</Link>
            <div className="signInBar">
              <div className="signInText">Send Reset Link</div>
              <button className="signInButton">
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
                {console.log(email)}
              </button>
            </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
import React,{useState} from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import {db} from '../firebase.config'
import {updateDoc, doc} from 'firebase/firestore'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import '../index.css'
function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
  const  {name, email} = formData
  const navigate = useNavigate()

  
  

  const onLogout=()=>{
    auth.signOut()
    navigate('/')
  }

  const onSubmit=async()=>{
    try {
      if(auth.currentUser.displayName!== name){
        //update name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef,{name})
      }
    } catch (error) {
      toast.error('Couldnot Update Profile Details')
    }
  }

  const onchange=(e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className='pageHeader'>My Profile</p>
        <button type='button' onClick={onLogout} className="logOut">Logout</button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
            <p className="changePersonalDetails" onClick={()=>{
              changeDetails && onSubmit()
              setChangeDetails((prevState)=> !prevState)
            }}>
              {changeDetails?'done':'change'}
            </p>
        </div>
        <div className="profileCard">
            <form>
              <input value={name} onChange={onchange} type="text" className={!changeDetails?'profileName': 'profileNameActive'} disabled={!changeDetails} id="name" />
              <input value={email} onChange={onchange} type="email" className={!changeDetails?'profileEmail': 'profileEmailActive'} disabled={!changeDetails} id="email" />
            </form>
          </div>

          <Link to='/create-listing' className='createListing'>
            <img src={homeIcon} alt="home" />
            <p>Sell  Rent House/Dorm</p>
            <img src={arrowRight} alt="arrow right" />
          </Link>
          {/* {!loading && listings?.length>0 &&(
            <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {listings.map((listing)=>{

                return (
                  <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={()=>onDelete(listing.id)}/>
                )})}
              </ul>
            </>
          )} */}
      </main>
    </div>
  )
}

export default Profile
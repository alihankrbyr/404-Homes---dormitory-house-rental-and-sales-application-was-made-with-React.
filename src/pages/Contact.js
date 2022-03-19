import React,{useState, useEffect} from 'react'
import {useParams, useSearchParams } from 'react-router-dom'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
function Contact() {
    const [message, setMessage] = useState('')
    const [landLord, setLandLord] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useParams()

    useEffect(() => {
      const getlandLord = async()=>{
            const docRef = doc(db, 'users', params.landLordId)
            const snap = await getDoc(docRef)
            if(snap.exists()){
                setLandLord(snap.data())
            } else{
                toast.error('Could not get landlord data')
            }
      }
      getlandLord()
    }, [params.landLordId])
    
    const onChange=(e)=>{
        setMessage(e.target.value)
    }
  return (
    <div className='pageContainer'>
        <header>
            <p className="pageHeader">Contact {landLord?.name}</p>
        </header>
        {landLord!==null &&(
            <main>
                {/* <div className="contactLandLord">
                    <p className="landLordName">
                        Contact {landLord?.name}
                    </p>
                </div> */}
            <form className="messageForm">
                <div className="messageDiv">
                    <label htmlFor="message" className='messageLabel'>
                        Message
                    </label>
                    <textarea name="message" id="message" className='textarea' value={message} onChange={onChange}></textarea>
                </div>
                <a href={`mailto:${landLord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                    <button type='button' className='primaryButton'>Send Message</button>
                </a>
            </form>

            </main>
        )}

    </div>
  )
}

export default Contact
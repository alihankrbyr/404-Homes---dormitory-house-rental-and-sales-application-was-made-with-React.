import React,{useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {db} from '../firebase.config'

import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/swiper-bundle.css'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [sharedLinkCopied, setSharedLinkCopied] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
      const fetchListing = async()=>{
        const docRef = doc(db, 'listings', params.listingId)
        
        const snap = await getDoc(docRef)
        if(snap.exists()){
            setListing(snap.data())
            setLoading(false)
        }
      }
      fetchListing()
    }, [navigate, params.listingId])

        // const discount = (listing.offer && )
    // const pos = listing.GeoLocation
    
 
if(loading){
    return <Spinner/>
}
  return (
    <main>
        <Swiper slidesPerView={1} pagination={{clickable:true}}>
            {listing.imageUrls.map((url,index)=>{
                return (<SwiperSlide key={index}>
                    <div style={{background:`url(${listing.imageUrls[index]}) center no-repeat`, backgroundSize: 'cover'}} className="swiperSlideDiv"></div>
                </SwiperSlide>
            )})}
            </Swiper>
        <div className="shareIconDiv" onClick={()=>{navigator.clipboard.writeText(window.location.href)
        setSharedLinkCopied(true)
        setTimeout(() => {
            setSharedLinkCopied(false)
        }, 2000);
        }}>
            <img src={shareIcon} alt="share" />
        </div>
        {sharedLinkCopied && <p className='linkCopied'>Link Copied!</p>}
        <div className="listingDetails">
            <p className="listingName">
                {listing.name}- &#8377;{listing.offer? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                    :listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}
            </p>
            <p className="listingLocation">
                {listing.address}
            </p>
            <p className="listingType">For {listing.type==='rent'?'Rent':'Sale'}</p>
            {listing.offer &&(
                <p className='discountedPrice'>&#8377;{listing.regularPrice - listing.discountedPrice} discount</p>
            )}
            <ul className="listingDetailList">
                <li>
                    {listing.bedrooms>1?`${listing.bedrooms} Bedrooms`:'1 Bedroom'}
                </li>
                <li>
                    {listing.bathrooms>1?`${listing.bathrooms} Bathrooms`:'1 Bathroom'}
                </li>
                {listing.parking&&(
                    <li>Parking available</li>
                )}
                {listing.parking&&(
                    <li>Furnished</li>
                )}
            </ul>
            {/* <p className="listingLocationTitle">Location on map</p>
            <div className="leafletContainer">
                <MapContainer style={{height: '100%',width:'100%'}} center={[lat,lng]} zoom={10} scrollWheelZoom={false}>
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'/>
                <Marker position={[listing.GeoLocation.lat, listing.GeoLocation.lng]}/>
                <Popup>{listing.location}</Popup>
                </MapContainer>
            </div> */}
            {auth.currentUser?.uid !== listing.userRef && (
                <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>Contact Landlord</Link>
            )}
        </div>
    </main>
  )
}

export default Listing
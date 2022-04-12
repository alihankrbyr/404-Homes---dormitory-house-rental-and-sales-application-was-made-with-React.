
import {React,useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, getDocs, query, orderBy, limit} from 'firebase/firestore'
import {db} from '../firebase.config'
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper'
import Spinner from './Spinner'
import { SwiperSlide,Swiper} from 'swiper/react'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
function Slider() {
    const [loading, setLoading] = useState(true)
    const [listing, setListing] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings =async()=>{
            const listingRef = collection(db, 'listings' )
            const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5))
            const snap = await getDocs(q)
            let listings = []
            snap.forEach((doc)=>{
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListing(listings)
            setLoading(false)
        }
        fetchListings()
    }, [])
    if(loading){
        return(
            <Spinner/>
        )
    }
  return (
    <>
    {/* <p className="exploreHeading">Recommended</p> */}
    <Swiper slidesPerView={1} pagination={{clickable:true}}>
        {listing.map(({data, id})=>{
            return(

            <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)}>
                <div className="swiperSlideDiv" style={{background:`url(${data.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}}>
                    <p className="swiperSlideText">{data.name}</p>
                    <p className="swiperSlidePrice">&#8377;{data.discountedPrice??data.regularPrice}{' '} {data.type==='rent' && '/month'}</p>
                    </div>
                </SwiperSlide>
            )
        })}
        </Swiper>
    </>
  )
}

export default Slider
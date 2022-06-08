import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
import {ReactComponent as Search1} from '../assets/svg/search.svg'
function Category() {
    const [searchTerm,setSearchTerm]=useState(' ')
    const [loading, setLoading] = useState(true)
    const [lastListing, setLastListing] = useState(null)
    const [listings, setListings] = useState(null)
    const params = useParams()
    useEffect(() => {
      const fetchListings = async()=>{
          try {
              const listingsRef = collection(db, 'listings')
              
              const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10))
            
              const querySnap = await getDocs(q)
              const lastListingVisible = querySnap.docs[querySnap.docs.length-1]
              setLastListing(lastListingVisible)
              
              const listings = []
              querySnap.forEach((doc)=>{
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
              })
              setListings(listings)
              
              setLoading(false)

          } catch (error) {
              console.log(error)
              toast.error('Could not fetch Listings')
          }
      }
    fetchListings()
      
    }, [params.categoryName])
    
    const onFetchMoreListings = async()=>{
        try {
            const listingsRef = collection(db, 'listings')
            
            const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'),startAfter(lastListing), limit(10))
          
            const querySnap = await getDocs(q)
            const lastListingVisible = querySnap.docs[querySnap.docs.length-1]
            setLastListing(lastListingVisible)
            
            const listings = []
            querySnap.forEach((doc)=>{
              return listings.push({
                  id: doc.id,
                  data: doc.data()
              })
            })
            setListings((prevState)=>[...prevState,...listings])
            
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error('Could not fetch Listings')
        }
    }

    
  return (
    <div className='category'>
        <header>
            <p className="pageHeader">
            {params.categoryName==='rent'?'Places for Rent':
params.categoryName==='sale'?'Places for Sale':
params.categoryName==='dorm'?'Places for Dorm':'Something Wrong'}
            </p>
            <div class="wrap">
    <div class="search">
            <input class="searchTerm" type="text" placeholder="Search..." onChange={event =>setSearchTerm(event.target.value)}>
            </input> <button type="submit" class="searchButton">
        <i ><Search1></Search1></i>
     </button>
     </div></div>
        </header>
        {loading?<Spinner/> : listings && listings.length>0?
        <>
        <main>
        <ul className="categoryListings">
 <ul class="searchUl" >
                {listings.filter((listing=>{
{var reduced=(listing.data.regularPrice)}
                    if(searchTerm==' '){
                        return <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>

                    }
                    else if (listing.data.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    
                     {
                         return <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                     
                    } 
                    else if (listing.data.location.toLowerCase().includes(searchTerm.toLowerCase()))
                    
                    {
                        return <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                    
                   } 
                   else if ((reduced).toLowerCase().includes(searchTerm.toLowerCase()))
                    
                   {
                       return <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                   
                  } 
                 
                })).map((listing)=>{
                
                     return  <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                     
                  
                })}
            </ul>
            </ul>
        </main>
        {lastListing&&(
            <p className='loadMore' onClick={onFetchMoreListings}>Load More</p>
        )}
        </>:<p>No listings for {params.categoryName}</p>    
    }
    </div>
  )
}

export default Category
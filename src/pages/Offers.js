import React,{useState, useEffect} from 'react'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'
function Offers() {
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)
    const [lastListingFetched, setastListingFetched] = useState(null)
    useEffect(() => {
      const fetchListings = async()=>{
          try {
              const listingsRef = collection(db, 'listings')
              
              const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(3))
            
              const querySnap = await getDocs(q)
                const lastListing = querySnap.docs[querySnap.docs.length-1]
                setastListingFetched(lastListing)
              
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
      
    }, [])
    
    const onFetchMoreListings = async()=>{
        try {
            const listingsRef = collection(db, 'listings')
            
            const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'),startAfter(lastListingFetched), limit(3))
          
            const querySnap = await getDocs(q)
              const lastListing = querySnap.docs[querySnap.docs.length-1]
              setastListingFetched(lastListing)
            
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
                Offers
            </p>
        </header>
        {loading?<Spinner/> : listings && listings.length>0?
        <>
        <main>
            <ul className="categoryListings">
                {listings.map((listing)=>{
                     return <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                })}
            </ul>
        </main>
        {lastListingFetched&&(
            <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
        )}
        </>:<p>There are no offers</p>    
    }
    </div>
  )
}

export default Offers
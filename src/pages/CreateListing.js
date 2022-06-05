import React, { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase.config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function CreateListing() {
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(true)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude } = formData
    const [loading, setLoading] = useState(false)
    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid })
                } else {
                    navigate('/Sign-in')
                }
            })
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            isMounted.current = false
        }
    }, [isMounted, auth])

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (discountedPrice >= regularPrice) {
            setLoading(false)
            toast.error('Discounted price needs to be less than regular price')
            return
        }
        if (images.length > 6) {
            setLoading(false)
            toast.error('Max 6 images')
            return
        }


        let GeoLocation = {}
        let location
        if (geoLocationEnabled) {

            const headers = {
                'Authorization': "prj_test_pk_7ca77fca54d1c58fb89215e0bbe6d6345f93605f"
            }
            const response = await fetch(`https://api.radar.io/v1/geocode/forward?query=${address}`, { headers })
            const data = await response.json()
            console.log(data)
            if (data.addresses.length === 0) {
                setLoading(false)
                toast.error('Please enter correct address!')
                return
            } else {
                GeoLocation.lat = data.addresses[0].latitude ?? 0
                GeoLocation.lng = data.addresses[0].longitude ?? 0
                location = data.addresses.length === 0 ? undefined : address
            }
        } else {
            GeoLocation.lat = latitude
            GeoLocation.lng = longitude
            location = address
        }

        const imgStore = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
                const storageRef = ref(storage, 'images/' + fileName)
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        reject(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            resolve(downloadURL)
                        });
                    }
                );
            })
        }
        const imageUrls = await Promise.all(
            [...images].map((image)=>imgStore(image))
        ).catch(()=>{
            setLoading(false)
            toast.error("Size of the images needs to be less than 2MB")
            return
        })
        const formDataCopy = {
            ...formData,
            imageUrls,
            GeoLocation,
            timestamp: serverTimestamp()
        }
        delete formDataCopy.images
        delete formDataCopy.address
        location && (formDataCopy.location = location)
        !formDataCopy.offer && delete formDataCopy.discountedPrice

        const docRef = await addDoc(collection(db, 'listings'),formDataCopy)
        setLoading(false)
        toast.success('Listing created')
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }
    const onMutate = (e) => {
        let boolean = null
        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }

        //files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }

        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value //Nullish coalescing operator 
            }))
        }
    }

    if (loading) {
        return <Spinner />
    }
    return (
        <div className='profile'>
            <header>
                <p className="pageHeader">Create Listing</p>
                <main>
                    <form onSubmit={onSubmit}>
                        <label className='formLabel'>Sell / Rent / Dorm</label>
                        <div className="formButtons">
                            <button type='button' className={type === 'sale' ? 'formButtonActive' : 'formButton'} id='type' value='sale' onClick={onMutate}>Sell</button>
                            <button type='button' className={type === 'rent' ? 'formButtonActive' : 'formButton'} id='type' value='rent' onClick={onMutate}>Rent</button>
                            <button type='button' className={type === 'dorm' ? 'formButtonActive' : 'formButton'} id='type' value='dorm' onClick={onMutate}>Dorm</button>
                        </div>
                        <label className='formLabel'>Name</label>
                        <input
                            className='formInputName'
                            type='text'
                            id='name'
                            value={name}
                            onChange={onMutate}
                            maxLength='32'
                            minLength='10'
                            required
                        />

                        <div className='formRooms flex'>
                            <div>
                                <label className='formLabel'>Bedrooms</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='bedrooms'
                                    value={bedrooms}
                                    onChange={onMutate}
                                    min='1'
                                    max='50'
                                    required
                                />
                            </div>
                            <div>
                                <label className='formLabel'>Bathrooms</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='bathrooms'
                                    value={bathrooms}
                                    onChange={onMutate}
                                    min='1'
                                    max='50'
                                    required
                                />
                            </div>
                        </div>

                        <label className='formLabel'>Parking spot</label>
                        <div className='formButtons'>
                            <button
                                className={parking ? 'formButtonActive' : 'formButton'}
                                type='button'
                                id='parking'
                                value={true}
                                onClick={onMutate}
                                min='1'
                                max='50'
                            >
                                Yes
                            </button>
                            <button
                                className={
                                    !parking && parking !== null ? 'formButtonActive' : 'formButton'
                                }
                                type='button'
                                id='parking'
                                value={false}
                                onClick={onMutate}
                            >
                                No
                            </button>
                        </div>

                        <label className='formLabel'>Furnished</label>
                        <div className='formButtons'>
                            <button
                                className={furnished ? 'formButtonActive' : 'formButton'}
                                type='button'
                                id='furnished'
                                value={true}
                                onClick={onMutate}
                            >
                                Yes
                            </button>
                            <button
                                className={
                                    !furnished && furnished !== null
                                        ? 'formButtonActive'
                                        : 'formButton'
                                }
                                type='button'
                                id='furnished'
                                value={false}
                                onClick={onMutate}
                            >
                                No
                            </button>
                        </div>

                        <label className='formLabel'>Address</label>
                        <textarea
                            className='formInputAddress'
                            type='text'
                            id='address'
                            value={address}
                            onChange={onMutate}
                            required
                        />
                        {!geoLocationEnabled && (
                            <div className='formLatLng flex'>
                                <div>
                                    <label className='formLabel'>Latitude</label>
                                    <input
                                        className='formInputSmall'
                                        type='number'
                                        id='latitude'
                                        value={latitude}
                                        onChange={onMutate}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='formLabel'>Longitude</label>
                                    <input
                                        className='formInputSmall'
                                        type='number'
                                        id='longitude'
                                        value={longitude}
                                        onChange={onMutate}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                        <label className='formLabel'>Offer</label>
                        <div className='formButtons'>
                            <button
                                className={offer ? 'formButtonActive' : 'formButton'}
                                type='button'
                                id='offer'
                                value={true}
                                onClick={onMutate}
                            >
                                Yes
                            </button>
                            <button
                                className={
                                    !offer && offer !== null ? 'formButtonActive' : 'formButton'
                                }
                                type='button'
                                id='offer'
                                value={false}
                                onClick={onMutate}
                            >
                                No
                            </button>
                        </div>

                        <label className='formLabel'>Regular Price</label>
                        <div className='formPriceDiv'>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='regularPrice'
                                value={regularPrice}
                                onChange={onMutate}
                                min='50'
                                max='750000000'
                                required
                            />
                            {type === 'rent' && <p className='formPriceText'>Rs / Month</p>}
                        </div>

                        {offer && (
                            <>
                                <label className='formLabel'>Discounted Price</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='discountedPrice'
                                    value={discountedPrice}
                                    onChange={onMutate}
                                    min='50'
                                    max='750000000'
                                    required={offer}
                                />
                            </>
                        )}
                        <label className='formLabel'>Images</label>
                        <p className='imagesInfo'>
                            The first image will be the cover (max 6).
                        </p>
                        <input
                            className='formInputFile'
                            type='file'
                            id='images'
                            onChange={onMutate}
                            max='6'
                            accept='.jpg,.png,.jpeg'
                            multiple
                            required
                        />
                        <button type='submit' className='primaryButton createListingButton'>
                            Create Listing
                        </button>
                    </form>
                </main>
            </header>
        </div>
    )
}

export default CreateListing
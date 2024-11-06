import React, {useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {useParams} from 'react-router-dom'
import {db} from "../firebase.config"
import {toast} from "react-toastify"
import {collection,getDocs,query,where,orderBy,limit,startAfter} from 'firebase/firestore'
import Spinner from '../components/Spinner'
import ListingItems from '../components/ListingItems'



const Category=()=>{
    const [listing,setListing] =useState("")
    const [lastFetchListing, setLastFetchListing]= useState(null);
    const [loading,setLoading] =useState(true)
    const params = useParams()

    useEffect(()=>{
       const fetchListing= async()=>{
        try {
            //reference
           const listingRef = collection(db,'listings') 
           //query
           const q = query(listingRef,
             where('type', '==',params.categoryName),
             orderBy('timestamp','desc'),
             limit(1)
             )
           //execute query
           const querySnap = await getDocs(q)
           const lastVisible = querySnap.docs[querySnap.docs.length - 1];
           setLastFetchListing(lastVisible);
           const listings =[]
           querySnap.forEach(doc=>{
               return listings.push({
                   id: doc.id,
                   data: doc.data()
               })
           });
           setListing(listings);
           setLoading(false);


        } catch (error) {
            toast.error('Unable to fetch data');
        }
       }
      //func call
      fetchListing();

    },[params.categoryName])

    //loadmore pagination function
    const fetchLoadMoreListing= async()=>{
        try {
            //reference
           const listingRef = collection(db,'listings') 
           //query
           const q = query(listingRef,
             where('type', '==',params.categoryName),
             orderBy('timestamp','desc'),
             startAfter(lastFetchListing),
             limit(10)
             )
           //execute query
           const querySnap = await getDocs(q)
           const lastVisible = querySnap.docs[querySnap.docs.length - 1];
           setLastFetchListing(lastVisible);
           const listings =[]
           querySnap.forEach(doc=>{
               return listings.push({
                   id: doc.id,
                   data: doc.data()
               })
           });
           setListing(prevState => [...prevState, ...listings]);
           setLoading(false);


        } catch (error) {
            toast.error('Unable to fetch data');
        }
       }

    return(
        <Layout>
            <div className='mt-3 container-fluid'>
            <h1>{params.categoryName === 'rent'
            ?'Places for Rent'
            : 'Places for Sale'}
            </h1>
            {
                loading ?(
                     <Spinner/>
                 ) : listing && listing.length >0 ?(
                    <>
                       <div>
                          {listing.map((list) =>(
                               <ListingItems listing={list.data} id={list.id} key={list.id}/>
                         ))}
                       </div>
                    
                    </>
                 ): (
                    <p>No listing for {params.categoryName}
                    </p>
                 )
            }
            </div>
            <div className="d-flex align-items-center justify-content-center mb-4 mt-4">
                {
                    lastFetchListing && (
                        <button className='btn btn-primary' onClick={fetchLoadMoreListing}>Load More</button>
                    )
                }
            </div>
            
        </Layout>
    )
}

export default Category
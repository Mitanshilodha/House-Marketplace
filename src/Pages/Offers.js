import React, {useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {useParams} from 'react-router-dom'
import "../styles/offers.css";
import {db} from "../firebase.config"
import {toast} from "react-toastify"
import {collection,getDocs,query,where,orderBy,limit,startAfter} from 'firebase/firestore'
import Spinner from '../components/Spinner'
import ListingItems from '../components/ListingItems'

const Offers = () => {
    const [listing,setListing] =useState("")
    const [loading,setLoading] =useState(true)
    const [lastFetchListing, setLastFetchListing]= useState(null);

    useEffect(()=>{
       const fetchListing= async()=>{
        try {
            //reference
           const listingRef = collection(db,'listings') 
           //query
           const q = query(listingRef,
             where('offer', '==',true),
             orderBy('timestamp','desc'),
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
           setListing(listings);
           setLoading(false);

           
        } catch (error) {
            toast.error('Unable to fetch data');
        }
       }
      //func call
      fetchListing();

    },[]);

     //lodamore pagination function
     const fetchLoadMoreListing= async()=>{
      try {
          //reference
         const listingRef = collection(db,'listings') 
         //query
         const q = query(listingRef,
           where('offer', '==',true),
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

      }catch(error) {
           toast.error('Unable to fetch data');
      }
    }

  return (
    <Layout>
            <div className='offers pt-3 container-fluid'>
            <h1>
          {" "}
          <img
            src="/assets/offer.png"
            alt="offers"
            className="offer-img"
          />{" "}
          Best Offers
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
                    <p>There are no curent offers</p>
                 )
            }
            </div>
            <div className="d-flex align-items-center justify-content-center mb-4 mt-4">
                {
                    lastFetchListing && (
                        <button className='load-btn' onClick={fetchLoadMoreListing}>Load More</button>
                    )
                }
            </div>
        </Layout>
  )
}

export default Offers
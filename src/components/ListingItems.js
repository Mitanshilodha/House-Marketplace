import React from 'react'
import { Link } from 'react-router-dom'
import {FaBed, FaBath} from 'react-icons/fa'
import { GiTakeMyMoney } from "react-icons/gi";
import "../styles/listingItems.css";
const ListingItems = ({listing,id,onDelete,onEdit}) => {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center'>
       <div className='card category-link mb-2' style={{width: "800px"}}>
       <Link to={`/Category/${listing.type}/${id}`}>
           <div className='row container p-2'>
              
              
               <div className='col-md-5'>
                  <img src={listing.ImageUrls[0]} className="img-thumbnail" alt={listing.name} height={200} width={300} />
               </div>
               <div className='col-md-5'>
                   <h2>{listing.name}</h2>
                   <p>{listing.Location}</p>
                   <p>
                      <GiTakeMyMoney/> RS : {" "}
                   {listing.offer?listing.discountedPrice: listing.regularPrice}{" "}
                   {listing.type === 'rent' &&  " / Month"}
                </p>
                <p>
                    <FaBed/> &nbsp;
                    {listing.Bedrooms>1 ? `${listing.Bedrooms} Bedrooms`: `1 Bedroom`}
                </p>
                <p>
                    <FaBath/> &nbsp;
                    {listing.Bathrooms>1 ? `${listing.Bathrooms} Bathrooms`: `1 Bathroom`}
                </p>
              </div>
             </div>
        </Link>
        <div>
        {onDelete && (
                  <button className='btn btn-danger' onClick={()=>{onDelete(listing.id)}}>Delete Listings</button>
                )}
        {onEdit && (
                  <button className='btn btn-info ms-3' onClick={()=>{onEdit(listing.id)}}>Edit Listings</button>
                )}
        </div>
       </div>


    </div>
    </>
  );
};
export default ListingItems
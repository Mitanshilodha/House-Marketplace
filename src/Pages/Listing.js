import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "../styles/listing.css";
import {
  FaBed,
  FaBath,
  FaParking,
  FaHouseDamage,
  FaArrowCircleRight,
} from "react-icons/fa";

//config
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const Listing = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout title={listing.name}>
      <div className="row listing-container">
        <div className="col-md-8 listing-container-col1">
          {/* adding image with information on listing page after the list is created with the help of swiper react component */}
          <div className="card-header">
            {listing.ImageUrls === undefined ? (
              <Spinner />
            ) : (
              <Swiper
                centeredSlides={true}
                slidesPerView={1}
                pagination={{clickable: true}}
                navigation={true}
              >
                {listing.ImageUrls.map((url,index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={listing.ImageUrls[index]}
                      height={400}
                      width={800}
                      alt={listing.name}/>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
        <div className="col-md-4 listing-container-col2">
          <h3>{listing.name}</h3>
          <h6>
            Price :{" "}
            {listing.offer ? listing.discountedPrice : listing.regularPrice} /
            RS
          </h6>
          <p>Property For : {listing.type === "rent" ? "Rent" : "Sale"}</p>
          <p>
            {listing.offer && (
              <span>
                {listing.regularPrice - listing.discountedPrice} Discount
              </span>
            )}
          </p>
          <p>
            <FaBed size={20} /> &nbsp;
            {listing.Bedrooms > 1
              ? `${listing.Bedrooms} Bedrooms`
              : "1 Bedroom"}
          </p>
          <p>
            <FaBath size={20} /> &nbsp;
            {listing.Bathrooms > 1
              ? `${listing.Bathrooms} bathrooms`
              : "1 Bathroom"}
          </p>
          <p>
            {" "}
            <FaParking size={20} /> &nbsp;
            {listing.parking ? `Parking spot` : "no spot for parking"}
          </p>
          <p>
            <FaHouseDamage size={20} /> &nbsp;
            {listing.furnished ? `furnished house` : "not furnished"}
          </p>
          <Link
            className="btn btn-success"
            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
          >
            Contact Landlord <FaArrowCircleRight size={20} />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Listing;

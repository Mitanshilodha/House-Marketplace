import React, { useState, useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
import { db } from "../firebase.config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import Spinner from "./Spinner";
import "../styles/slider.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  // const userPic =
  //   "https://openclipart.org/download/247319/abstract-user-flat-3.svg";

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="container-fluid">
        {listings === null ? (
          <Spinner />
        ) : (
          <Swiper slidesPerView={1} navigation={true} loop pagination={{ clickable: true }}>
            {listings.map(({ data, id }) => {
              return (
                <SwiperSlide
                  key={id}
                  onClick={() => {
                    navigate(`/Category/${data.type}/${id}`);
                  }}
                >
                  <img
                  src={data.ImageUrls[0]}
                  alt={data.name}
                  className="slider-img"
                />
                  <h4 className=" text-light p-4 m-0 ">
                    {/* <img alt="user pic" src={userPic} height={35} width={35} /> */}
                    <ImLocation2 size={20} className="ms-2" /> Recently Added :{" "}
                    <br />
                    <span className="ms-4 mt-2"> {data.name}</span>
                    <span className="ms-2">
                      | Price ( $ {data.regularPrice} )
                    </span>
                  </h4>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default Slider;

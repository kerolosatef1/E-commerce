import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import Slider from "react-slick";
import { CartContext } from "../UserContext/CartContext";
export default function CategorySlider(){


    const [categories, setCategories] = useState([]); 
    var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            
          }
        }
      ]
  };
      function getCategoriesDetails(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then(({data})=>{
            setCategories(data.data)
         
        })
        .catch(()=>{

        })
    }
    useEffect(() => {
        getCategoriesDetails()
    },[]);
    return <>
  
    <div className="slider-container py-6">
    <Slider {...settings}>
   {categories?.map((category)=>
   
   <div className=" "> <img  className="w-full category-img "   src={category.image} alt={category.name} />
   <h3 className="text-2xl bold">{category.name}</h3>
   </div>)}
   </Slider>
   </div>
    
      </>
}
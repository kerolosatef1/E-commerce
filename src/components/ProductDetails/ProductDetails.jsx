import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../UserContext/CartContext";
import toast from "react-hot-toast";
export default function Productdetails() {
    const { addProductToCart } = useContext(CartContext);

    async function addProduct(productId){
         let response= await addProductToCart(productId)
 
         if(response.data.status ==='success'){
             toast.success(response.data.message ,{
                 position: "top-right",
                 autoClose: 3000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
             })
         }
         else{
             toast.error(response.data.message)
         }
     }
 
 
 
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    let { id, category } = useParams();

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                setProductDetails(data.data);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
            });
    }

    function getRelatedProduct(category) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let related = data.data.filter(product => product.category.name === category);
                setRelatedProducts(related);
            })
            .catch((error) => {
                console.error("Error fetching related products:", error);
            });
    }

    useEffect(() => {
        getProductDetails(id);
        getRelatedProduct(category);
    }, [id, category]);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-6">
            <div className="w-full md:w-1/2 lg:w-1/3 mb-5 md:mb-0 px-4">
                <Slider {...settings}>
                    {productDetails?.images.map((src, index) => (
                        <img key={index} className="w-full object-cover" src={src} alt={productDetails?.title} />
                    ))}
                </Slider>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 px-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900">{productDetails?.title}</h1>
                <p className="text-gray-700 font-light mt-4">{productDetails?.description}</p>
                <div className="py-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">{productDetails?.price} EGP</span>
                        <span className="text-yellow-500 text-lg font-medium flex items-center">
                            {productDetails?.ratingsAverage} 
                            <i className="fas fa-star ml-1"></i>
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <button onClick={()=> addProduct(productDetails.id)} className="bg-green-600 text-white py-2 px-4 rounded">Add to cart</button>
                        <span className="text-green-600 text-2xl">
                            <i className="fa-solid fa-heart"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useContext, useState, useEffect } from "react";
import style from './RecentProducts.module.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../UserContext/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../WishListContext/WishListContext";

export default function RecentProducts() {
    const { addProductToCart } = useContext(CartContext);
    const { addProductToWish } = useContext(WishContext);
    
   
    const [wishlistStatus, setWishlistStatus] = useState(() => {
        
        const storedWishlist = localStorage.getItem('wishlistStatus');
        return storedWishlist ? JSON.parse(storedWishlist) : {};
    });

    useEffect(() => {
        localStorage.setItem('wishlistStatus', JSON.stringify(wishlistStatus));
    }, [wishlistStatus]);

    async function addWish(productId) {
        let response = await addProductToWish(productId);

        if (response.data.status === 'success') {
           
            setWishlistStatus((prevState) => ({
                ...prevState,
                [productId]: !prevState[productId]
            }));

            toast.success('It has been added to Favourite', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(response.data.message);
        }
    }

    async function addProduct(productId) {
        let response = await addProductToCart(productId);

        if (response.data.status === 'success') {
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(response.data.message);
        }
    }

    const [searchTerm, setSearchTerm] = useState("");

    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let { data, isError, isFetching, error, isLoading } = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getRecent,
        staleTime: 5000,
        refetchInterval: 1000
    });

    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-screen"><span className="loader"></span></div>;
    }
    if (isError) {
        return <div>Error fetching data: {error.message}</div>;
    }

    const filteredProducts = data?.data.data.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center my-4">
                    <input
                        type="text"
                        placeholder="Search for a product..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts?.map((product) => (
                        <div className="bg-white product p-4 rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-green-400" key={product.id}>
                            <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                <img className="w-full object-cover rounded-t-lg" src={product.imageCover} alt={product.title} />
                                <div className="p-4">
                                    <span className="block font-light text-green-600">{product.category.name}</span>
                                    <h3 className="text-lg font-normal text-gray-800 mb-4">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                                    <div className="flex justify-between items-center">
                                        <span>{product.price} EGP</span>
                                        <span>{product.ratingsAverage}<i className="fas fa-star text-yellow-300"></i></span>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex justify-between items-center py-2 mt-2">
                                <button onClick={() => addProduct(product.id)} className="btn">Add to Cart</button>
                                <span 
                                    onClick={() => addWish(product.id)} 
                                    className={`text-black text-2xl ${wishlistStatus[product.id] ? "text-red-600" : "focus:text-red-600"}`}
                                >
                                    <i className="fa-solid fa-heart"></i>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export let WishContext = createContext();
export default function WishContextProvider(props) {
    const [WishCount, setWishCount] = useState(0);

    let headers = {
        token: localStorage.getItem('userToken')
    }

    useEffect(() => {
        getLoggedUserWish();
    }, []);


    function getLoggedUserWish() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: headers })
            .then((response) => {
               
                if (Array.isArray(response.data.data)) {
                    setWishCount(response.data.data.length); 
                } else {
                    setWishCount(0); 
                }
                return response;
            })
            .catch((error) => error);
    }

    function addProductToWish(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: productId }, { headers: headers })
            .then((response) => {
                return response;
            })
            .catch((error) => error);
    }
    function deleteProductItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: headers })
            .then((response) => {
                
                setWishCount(prevCount => prevCount - 1);
                return response;
            })
            .catch((error) => error);
    }

    return (
        <WishContext.Provider value={{  getLoggedUserWish, addProductToWish,deleteProductItem }}>
            {props.children}
        </WishContext.Provider>
    );















}

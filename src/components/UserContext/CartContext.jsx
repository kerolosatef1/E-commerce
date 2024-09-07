import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [cartCount, setCartCount] = useState(() => {
        
        const savedCount = localStorage.getItem('cartCount');
        return savedCount ? parseInt(savedCount) : 0; 
    });

    let headers = {
        token: localStorage.getItem('userToken')
    };

    useEffect(() => {
        
        if (cartCount === 0) {
            getLoggedUserCart();
        }
    }, []); 

    
    useEffect(() => {
        localStorage.setItem('cartCount', cartCount);
    }, [cartCount]);

   
    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers })
            .then((response) => {
                if (response.data.data && Array.isArray(response.data.data)) {
                
                    if (response.data.data.length > 0) {
                        setCartCount(response.data.data.length);
                    }
                } else {
                    
                    setCartCount(prevCount => prevCount); 
                }
                return response;
            })
            .catch((error) => {
                console.error("Error fetching cart data: ", error);
                return error;
            });
    }

   
    function updateCartCount(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: count }, { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }

    // إضافة منتج جديد للسلة
    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: productId }, { headers: headers })
            .then((response) => {
                // تحديث العداد بزيادة 1
                setCartCount(prevCount => prevCount + 1);
                return response;
            })
            .catch((error) => error);
    }

    
    function deleteProductItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers: headers })
            .then((response) => {
                
                setCartCount(prevCount => Math.max(prevCount - 1, 0));
                return response;
            })
            .catch((error) => error);
    }

    return (
        <CartContext.Provider value={{ deleteProductItem, getLoggedUserCart, addProductToCart, updateCartCount, cartCount }}>
            {props.children}
        </CartContext.Provider>
    );
}

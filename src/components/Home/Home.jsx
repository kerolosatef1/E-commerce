import React, { useEffect, useState } from "react";
import axios from "axios";
import RecentProducts from "../RecentProducts/RecentProducts";

import CategorySlider from './../CategorySlider/CategorySlider';
import { Card } from 'flowbite-react';


export default function Products(){
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    },[]);
    async function getProducts(){
        let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`) 
         setProducts(response.data.data);
    }
    getProducts();
    return <>
    <CategorySlider />
    <RecentProducts />

    
 </>}
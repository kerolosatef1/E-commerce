import React, { useEffect, useState } from "react";
import Style from './Categories.module.css';
import axios from "axios";
import Products from './../Products/Products';
import { Card } from "flowbite-react";
import reduce from './../../../node_modules/lodash-es/reduce';
export default function Categories(){
    
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories();
    },[]);
   
 
   async function getCategories(){
    let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`) 
     setCategories(response.data.data);
}
getCategories();
    return <>
    
    <div className="container md:px-14 flex flex-wrap md:translate-x-0  ">
    
     {categories.length > 0? categories.map((product)=>
    <div className="md:w-1/3 sm:w-full py-8  ">
    <Card
      className="max-w-sm w-full disabled:shadow-md shadow-lg border border-x-2 sm:mx-auto  border-solid border-[ #dee2e6]  hover:shadow-green-400 delay-10 transition duration-[1s] ease-in-out transform hover:-translate-"
      renderImage={() => <img  src={product.image} alt="image1" className="w-full h-80 object-cover object-center  " />}
    >
      <h2 className="text-2xl font-bold tracking-tight mx-auto text-green-400  dark:text-white">
        {product.name}
      </h2>
      
    </Card>
    </div>
): <div className="flex justify-center items-center w-full h-screen"><span class="loader"></span></div>}


 </div>

 
 <p className="text-4xl text-center   text-green-400">Men's Fashion subcategories</p>

<div className="container px-24  box-border flex flex-wrap py-14  ">
    <div className="md:w-1/3 sm:w-full  md:mx-3 rounded border border-solid p-3 sh border-[#dee2e6;] shadow-lg font-bold  hover:shadow-green-400 delay-10 transition duration-[1s] ease-in-out transform hover:-translate-">
        <p className="w-full text-center text-2xl ">Bags & luggage</p>
    </div>
    <div className="md:w-1/3 sm:w-full sm:my-4 md:my-0 rounded border border-solid p-3 border-[#dee2e6;] shadow-lg font-bold  hover:shadow-green-400 delay-10 transition duration-[1s] ease-in-out transform hover:-translate-">
        <p className="w-full text-center text-2xl ">Men's Clothing</p>
    </div>
</div>
 

 
       </>
}
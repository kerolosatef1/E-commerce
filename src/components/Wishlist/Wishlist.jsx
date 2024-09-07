import React, { useContext, useEffect, useState } from "react";
import { WishContext } from "../WishListContext/WishListContext";


export default function Wish(){
    let {getLoggedUserWish,deleteProductItem}=useContext(WishContext)
    const[wishDetails,setWishDetails]=useState(null)
    async function getWish(){
        let respone=await getLoggedUserWish()
        setWishDetails(respone.data.data) 
       }

       
    async function deleteItem(productId){
        let respone=await deleteProductItem(productId )
        setWishDetails(respone.data.data)  
           
       }

       useEffect(()=>{
        getWish()
        
    })



    return <>
    

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h2 className="text-3xl text-green-400 text-center py-4"> Shopping Cart</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product
                    </th>
                    
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {wishDetails?.map((product)=> 
                 <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                 <td className="p-4">
                     <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title}/>
                 </td>
                 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.title}
                 </td>
               
                 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    <span>{product.price } EGP</span>
                 </td>
                 <td className="px-6 py-4">
                     <button onClick={()=>deleteItem(product.id)}  className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                 </td>
             </tr>
                )}
               
             
            </tbody>
        </table>
    </div>
    <h3 className="text-2xl text-gray-500 py-4 text-center">Total Cart Price :  {wishDetails?.totalCartPrice}</h3>
    
       
        </>
    }




















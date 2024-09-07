import React from 'react';
import { useState,useEffect } from 'react';
import './App.css';
import { createBrowserRouter , RouterProvider} from'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Wishlist/Wishlist';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Productdetails from './components/ProductDetails/ProductDetails';
import ProtectedRouting from './components/ProtectedRouting/ProtectedRouting';
import { UserContextProvider } from './components/UserContext/UserContext';
import Login from './components/Login/Login';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RecentProducts from './components/RecentProducts/RecentProducts';
import CartContextProvider from './components/UserContext/CartContext';
import { Toaster } from 'react-hot-toast';
import WishContextProvider from './components/WishListContext/WishListContext';
let query=new QueryClient({
  defaultOptions : {
    queries: {
      
    },
  },
}); 


let x=createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element: <ProtectedRouting><Home/></ProtectedRouting>},
    {path:'home',element:<ProtectedRouting><Home/></ProtectedRouting>},
    {path:'cart',element:<ProtectedRouting><Cart/></ProtectedRouting>},
    {path:'wishlist',element:<ProtectedRouting><Wishlist/></ProtectedRouting>},
    {path:'products',element:<ProtectedRouting><Products/></ProtectedRouting>},
    {path:'productdetails/:id/:category',element:<ProtectedRouting><Productdetails/></ProtectedRouting>},
    {path:'categories',element:<ProtectedRouting><Categories/></ProtectedRouting>},
    {path:'brands',element:<ProtectedRouting><Brands/></ProtectedRouting>},
    {path:'register',element:<Register/>},
    {path:'login',element:<Login/>},

    {path:'*',element:<NotFound/>}




  ]}

])

function App() {

    return <>
    <QueryClientProvider client={query}>
    <UserContextProvider>
      <WishContextProvider> 
    <CartContextProvider>
  <RouterProvider router={x}></RouterProvider>
  <ReactQueryDevtools initialIsOpen="false" />
  <Toaster/>
 </CartContextProvider>
 </WishContextProvider>
  </UserContextProvider>
  </QueryClientProvider>

   


   
   
   
    </>
}

export default App
import React, { useEffect, useState } from "react";
import Style from './Layout.module.css';
import Navbarr from '../Navbarr/Navbarr.jsx';
import { Outlet } from "react-router-dom";

export default function Layout(){
    const [count, setCount] = useState(0);
    useEffect(() => {},[]);
    return <>
 <Navbarr/>
 <Outlet>


 </Outlet>
    
    </>
}
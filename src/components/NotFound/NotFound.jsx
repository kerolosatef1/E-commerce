import React, { useEffect, useState } from "react";
import Style from './NotFound.module.css';
import imgNotFound from '../../assets/Images/image2.svg'

export default function NoFound(){
    const [count, setCount] = useState(0);
    useEffect(() => {},[]);
    return <>
    
        <img src={imgNotFound} className="mx-auto" alt="NotFoundImg" />
    
    
    </>
}
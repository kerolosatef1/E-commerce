import React, { useEffect, useState } from "react";
import Style from './Products.module.css';
import axios from "axios";
import { Card } from "flowbite-react";
import RecentProducts from './../RecentProducts/RecentProducts';
export default function Products(){

    return <>
<RecentProducts/>
    </>
}
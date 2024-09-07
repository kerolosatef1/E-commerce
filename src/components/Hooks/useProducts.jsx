import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function useProducts(){
    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let responseObject = useQuery({
        queryKey: ['recentProducts'],
        queryFn: getRecent,
        staleTime: 5000,
        refetchInterval: 1000
    });
    return responseObject;
}
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function RecentBrands() {
    // إضافة state للـ modal والبراند المختار
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    
    function getRecent() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }

    
    let { data, isError, isFetching, error, isLoading } = useQuery({
        queryKey: ['recentbrands'],
        queryFn: getRecent,
        staleTime: 5000,
        refetchInterval: 1000
    });

    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-screen"><span className="loader"></span></div>
    }
    if (isError) {
        return <div>Error fetching data: {error.message}</div>
    }

    
    const filterBrands = data?.data?.data?.filter(Brand =>
        Brand?.name?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    
    const handleBrandClick = (Brand) => {
        setSelectedBrand(Brand);  
        setIsModalOpen(true);     
    };

    return (
        <>
          
            {isModalOpen && (
  <div
    className="fixed inset-0  bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2"
      >
        X
      </button>
      <img src={selectedBrand?.image} alt={selectedBrand?.name} className="w-full h-auto" />
      <h2 className="text-2xl font-bold text-green-600">{selectedBrand?.name}</h2>
      <button onClick={() => setIsModalOpen(false)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg">
        Close
      </button>
    </div>
  </div>
)}


            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center my-4">
                    <input
                        type="text"
                        placeholder="Search for a Brand..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filterBrands?.map((Brand) => (
                        <div
                            className="bg-white product p-4 rounded-lg border border-gray-400 hover:shadow-xl delay-10 transition duration-[.5s] ease-in-out transform hover:-translate- hover:shadow-green-400"
                            key={Brand.id}
                            onClick={() => handleBrandClick(Brand)} 
                        >
                            <img className="w-full object-cover rounded-t-lg" src={Brand?.image} alt={Brand?.name} />
                            <div className="p-4">
                                <span className="block font-light text-3xl mx-auto">{Brand?.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

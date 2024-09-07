import React, { useContext, useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import img1 from "../../assets/Images/img3.svg";
import { UserContext } from "../UserContext/UserContext";
import { CartContext } from "../UserContext/CartContext";

export default function Navbarr() {
    const { userLogin, setUserLogin } = useContext(UserContext);
    const { cartCount } = useContext(CartContext); 
    const navigate = useNavigate();
    const [state, setState] = useState(false);
    const navRef = useRef();

    const logOut = () => {
        localStorage.removeItem('userToken');
        setUserLogin(null);
        navigate('/login');
    };

    const navigation = [
        { title: "Home", path: "home" },
        { title: "Cart", path: "cart" },
        { title: "Wishlist", path: "wishlist" },
        { title: "Products", path: "products" },
        { title: "Categories", path: "categories" },
        { title: "Brands", path: "brands" }
    ];

    useEffect(() => {
        const body = document.body;
        const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"];
        if (state) body.classList.add(...customBodyStyle);
        else body.classList.remove(...customBodyStyle);

        const customStyle = ["sticky-nav", "fixed", "border-b"];
        window.onscroll = () => {
            if (window.scrollY > 80) navRef.current.classList.add(...customStyle);
            else navRef.current.classList.remove(...customStyle);
        };
    }, [state]);

    return (
        <nav ref={navRef} className="bg-gray-100 w-full top-0 z-20">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex">
                <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
                    <NavLink to="home">
                        <img src={img1} width={200} height={50} alt="Logo" />
                    </NavLink>
                    <div className="lg:hidden">
                        <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}>
                            {state ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${state ? 'h-screen pb-20 overflow-auto pr-4' : 'hidden'}`}>
                    <div>
                        <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                            {userLogin == null ? (
                                <>
                                    <li className="mt-8 lg:mt-0">
                                        <NavLink to="register" className="py-3 px-4 text-center text-white bg-green-600 hover:bg-green-700 rounded-md shadow block lg:inline">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="mt-8 lg:mt-0">
                                        <NavLink to="login" className="py-3 px-4 text-center text-white bg-green-600 hover:bg-green-700 rounded-md shadow block lg:inline">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="mt-4 lg:mt-0 relative">
                                        <NavLink to="cart" className="py-3 px-4 text-2xl text-center border text-gray-600 hover:text-green-400 rounded-md block lg:inline lg:border-0">
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
    {cartCount}
</span>

                                        </NavLink>
                                    </li>
                                    <li className="mt-8 lg:mt-0">
                                        <span onClick={logOut} className="py-3 px-4 text-center text-white bg-red-600 cursor-pointer hover:bg-red-700 rounded-md shadow block lg:inline">
                                            Logout
                                        </span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="flex-1">
                        <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                            {navigation.map((item, idx) => (
                                userLogin !== null ? (
                                    <li key={idx} className="text-gray-600 hover:text-green-400 delay-10 transition duration-[.5s] ease-in-out transform hover:-translate">
                                        <NavLink to={item.path}>
                                            {item.title}
                                        </NavLink>
                                    </li>
                                ) : null
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

import React, { FC, useEffect } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/redux/AuthSlice/AuthSlice";

interface LayoutProps {
    children:any
}

const Layout:FC<LayoutProps> = ({ children }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setAccessToken(localStorage.getItem('ACCESS_TOKEN')))
    }, [])
    return (
        <>
            <Header/>
                { children }
            <Footer/>
        </>     
    )
}

export default Layout
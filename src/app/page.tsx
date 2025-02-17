
import "../../styles/global.css";
import { Component } from "react"
import Navbar from "../../components/Navbar"
import Banner from '../../components/Hero'
import ProductPage from "../../components/productcard"
import Bottom from "../../components/bottomFooter"
import Footer from "../../components/Footer"
import Bakerbanner from '../../components/bakerbanner'
import RatingPage from "../../components/rating"
import Contact from "../../components/contact"
import Product from "../../models/product"
import Topcake from "../../components/Topcake"
import WhatWeOffer from "../../components/collection";
import AboutUs from "../../components/aboutus";
import Header from "../../components/header";



function Home() {
    return (
        <div>
            {/* <Header/> */}
            <Navbar /><br/><br/>
            <Banner/><br/><br/>
            <WhatWeOffer/><br/><br/>
            <Topcake/><br/><br/>
            <Bakerbanner/><br/><br/><br/><br/>
            <AboutUs/>
            <Footer/>
            <Bottom/>
        </div>
    )
}


export default Home
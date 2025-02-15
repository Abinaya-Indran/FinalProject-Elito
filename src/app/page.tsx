
import "../../styles/global.css";
import { Component } from "react"
import Navbar from "../../components/Navbar"
import Banner from '../../components/Banner'
import ProductPage from "../../components/productcard"
import Bottom from "../../components/bottomFooter"
import Footer from "../../components/Footer"
import Bakerbanner from '../../components/bakerbanner'
import RatingPage from "../../components/rating"
import Contact from "../../components/contact"
import Product from "../../models/product"
import Topcake from "../../components/Topcake"



function Home() {
    return (
        <div>
            <Navbar /><br/><br/>
            <Banner/><br/><br/>
            <Topcake/><br/><br/>
            {/* <ProductPage/><br/><br/> */}
            <Bakerbanner/><br/><br/><br/><br/>
            {/* <RatingPage/> */}
            <Contact/><br/>
            <Footer/>
            <Bottom/>
        </div>
    )
}


export default Home
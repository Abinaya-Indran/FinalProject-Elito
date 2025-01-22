

import { Component } from "react"
import Navbar from "../../components/Navbar"
import Banner from '../../components/Banner'
import ProductList from '../../components/Topcake'
import Bottom from "../../components/bottomFooter"
import Footer from "../../components/Footer"
import Bakerbanner from '../../components/bakerbanner'
import RatingPage from "../../components/rating"
import Contact from "../../components/contact"



function Home() {
    return (
        <div>
            <Navbar /><br/><br/>
            <Banner/><br/><br/>
            <ProductList/><br/><br/>
            <Bakerbanner/><br/><br/><br/><br/>
            <RatingPage/>
            <Contact/><br/>
            <Footer/>
            <Bottom/>
        </div>
    )
}


export default Home
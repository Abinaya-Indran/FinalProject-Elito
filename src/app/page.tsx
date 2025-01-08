import { Component } from "react"
import Navbar from "../../components/Navbar"
import Footer from '../../components/Footer'
import Banner from '../../components/Banner'
import ProductList from '../../components/Topcake'

function Home() {
    return (
        <div>
            <Navbar />
            <Banner/>
            <ProductList/>
            <Footer/>
        </div>
    )
}

export default Home
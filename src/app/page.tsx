
import "../../styles/global.css";
import Navbar from "../../components/Navbar"
import Banner from '../../components/Hero'
import Bottom from "../../components/bottomFooter"
import Footer from "../../components/Footer"
import Bakerbanner from '../../components/bakerbanner'
import Topcake from "../../components/Topcake"
import WhatWeOffer from "../../components/collection";
import AboutUs from "../../components/aboutus";



function Home() {
    return (
        <div>
            {/* <Header/> */}
            <Navbar />
            <Banner/>
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
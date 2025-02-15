import Bottom from '../../../components/bottomFooter'
import Contact from '../../../components/contact'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import "../../../styles/global.css";


function contactPage() {
    return (
        <div>

            <Navbar/><br/><br/><br/><br/>
            <Contact/><br/><br/><br/><br/><br/><br/><br/>
            {/* <Footer/> */}
            <Bottom/>

        </div>
    )
}

export default contactPage
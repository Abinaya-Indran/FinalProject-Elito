import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'
import Bottom from '../../../components/bottomFooter'
import SellerGrow from '../../../components/sellergrow';
import Sellerhero from '../../../components/sellerhero1';
import SellerHero from '../../../components/sellerhero2';
import SellerHero3 from '../../../components/sellerhero3';
import "../../../styles/global.css";

function AddcakePage() {
    return (
        <div>
            <Navbar/>
            <SellerHero/>
            <SellerHero3/>
            <Sellerhero/>
            <SellerGrow/>
            <Footer/>
            <Bottom/>
        </div>
    )
}

export default AddcakePage
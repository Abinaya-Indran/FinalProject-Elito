
import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import SellerPage from '../../../components/sellerpage'
import "../../../styles/global.css";


function sellerPage() {
    return (
        <div>
            <Navbar/>   
            <SellerPage/>
            <Bottom/>
        </div>
    )
}

export default sellerPage
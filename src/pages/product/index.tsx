import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import Productpage from '../../../components/productcard'
import "../../../styles/global.css";



function ProductPage() {
    return (
        <div>
            <Navbar/>
            <Productpage/>
            <Bottom/>
           
        </div>
    )
}

export default ProductPage
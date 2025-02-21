
import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import SellerDashboardComponent from '../../../components/sellerdashboard';
import "../../../styles/global.css";


function SellerDashboard() {
    return (
        <div>
            <Navbar/>   
            <SellerDashboardComponent/>
            <Bottom/>
        </div>
    )
}

export default SellerDashboard
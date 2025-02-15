import Bottom from '../../../components/bottomFooter'
import DeliveryStatus from '../../../components/deliverystatus'
import "../../../styles/global.css";
import Navbar from '../../../components/Navbar'
import Tracker from '../../../components/tracker'

function LoginPage() {
    return (
        <div>
            <Navbar/>
            <Tracker/>
            <DeliveryStatus/>
            <Bottom/>
        </div>
    )
}

export default LoginPage
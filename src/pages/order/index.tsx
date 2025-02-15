
import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import Order from '../../../components/order'
import ProgressBar from "../../../components/deliverystatus"; // Import progress tracker

function orderPage() {
    return (
        <div>
            <Navbar/><br/><br/>
            <ProgressBar step={2}/>
            <Order/><br/><br/><br/>
            <Bottom/>
        </div>
    )
}

export default orderPage
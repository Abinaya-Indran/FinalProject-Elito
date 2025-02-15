import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import OrderStatus from '../../../components/orderstatus'
import ProgressBar from '../../../components/deliverystatus'



function orderstatus() {
    return (
        <div>
            <Navbar/>
            <ProgressBar step={3}/>
            <OrderStatus/>
            <Bottom/>
           
        </div>
    )
}

export default orderstatus
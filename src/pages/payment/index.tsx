import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import Payment from '../../../components/payment'
import ProgressBar from '../../../components/deliverystatus'


function paymentPage() {
    return (
        <div>
            <Navbar/>
            <ProgressBar step={4}/>
            <Payment />
            <Bottom/>
        </div>
    )
}

export default paymentPage
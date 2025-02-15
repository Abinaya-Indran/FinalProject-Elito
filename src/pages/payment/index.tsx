import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import Payment from '../../../components/paymnet'
import ProgressBar from '../../../components/deliverystatus'


function paymentPage() {
    return (
        <div>
            <Navbar/><br/><br/>
            <ProgressBar step={4}/>
            <Payment /><br/><br/>
            <Bottom/>
        </div>
    )
}

export default paymentPage
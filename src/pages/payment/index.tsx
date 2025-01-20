import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import Payment from '../../../components/paymnet'


function paymentPage() {
    return (
        <div>
            <Navbar/><br/><br/>
            <Payment /><br/><br/>
            <Bottom/>
        </div>
    )
}

export default paymentPage
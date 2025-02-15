import Navbar from '../../../components/Navbar'
import YourCart from '../../../components/yourcart'
import Bottom from '../../../components/bottomFooter'
import "../../../styles/global.css";


function cartPage() {
    return (
        <div>
            <Navbar/><br/><br/>
            <YourCart /><br/><br/><br/><br/>
            <Bottom/>

        </div>
    )
}

export default cartPage
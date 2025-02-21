import Navbar from '../../../components/Navbar'
import Bottom from '../../../components/bottomFooter'
import "../../../styles/global.css";
import SuccessPage from '../../../components/success';


function cartPage() {
    return (
        <div>
            <Navbar/>
            <SuccessPage/>
            <Bottom/>

        </div>
    )
}

export default cartPage
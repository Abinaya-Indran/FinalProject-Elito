import Bottom from '../../../components/bottomFooter'
import Cakedetails from '../product/[id]'
import Navbar from '../../../components/Navbar'
import ProgressBar from "../../../components/deliverystatus"; // Import progress tracker


function CakePage() {
    return (
        <div>
            <Navbar/><br/><br/>
            <ProgressBar step={1}/>
            <Cakedetails/><br/><br/><br/><br/>
            <Bottom/>
        </div>
    )
}

export default CakePage
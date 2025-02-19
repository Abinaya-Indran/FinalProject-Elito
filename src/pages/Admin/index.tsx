import Admin from '../../../components/admin'
import Bottom from '../../../components/bottomFooter';
import Navbar from '../../../components/Navbar'
import "../../../styles/global.css";


function Adminpage() {
    return (
        <div>
            <Navbar/>
            <Admin/>
            <Bottom/>
        </div>
    )
}

export default Adminpage
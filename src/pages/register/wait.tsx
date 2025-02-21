import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import Registerwait from '../../../components/registerwait'
import "../../../styles/global.css";


function signupPage() {
    return (
        <div>
            <Navbar/>
            <Registerwait/>
            <Bottom/>
           
        </div>
    )
}

export default signupPage
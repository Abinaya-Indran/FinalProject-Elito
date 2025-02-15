import Bottom from '../../../components/bottomFooter'
import Navbar from '../../../components/Navbar'
import Register from '../../../components/register'
import "../../../styles/global.css";


function signupPage() {
    return (
        <div>
            <Navbar/>
            <Register />
            <Bottom/>
           
        </div>
    )
}

export default signupPage
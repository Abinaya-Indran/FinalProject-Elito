import Bottom from '../../../components/bottomFooter'
import Login from '../../../components/Login'
import Navbar from '../../../components/Navbar'
import "../../../styles/global.css";

function LoginPage() {
    return (
        <div>
            <Navbar/><br/>
            <Login/><br/><br/><br/><br/>
            <Bottom/>
        </div>
    )
}

export default LoginPage
import Bottom from '../../../components/bottomFooter'
import Login from '../../../components/Login'
import Navbar from '../../../components/Navbar'
import "../../../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
    return (
        <div>
            <Navbar/>
            <ToastContainer />
            <Login/>
            <Bottom/>
        </div>
    )
}

export default LoginPage
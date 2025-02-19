import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "../../../components/editprofile";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Bottom from "../../../components/bottomFooter";

function App() {
  return (
    <>
     
      <Navbar/>
      <ToastContainer />
      <EditProfile/>
      <Bottom/>
    </>
  );
}

export default App;

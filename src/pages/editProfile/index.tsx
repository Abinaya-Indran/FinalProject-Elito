import Bottom from '../../../components/bottomFooter'
import EditProfile from '../../../components/editprofile'
import Navbar from '../../../components/Navbar'




function editProfilepage() {
    return (
        <div>
            <Navbar/>
            <EditProfile user={null} />
            <Bottom/>
        </div>
    )
}

export default editProfilepage
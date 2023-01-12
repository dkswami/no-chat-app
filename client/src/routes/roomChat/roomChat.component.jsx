import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { getAllUsersUrl } from "../../utils/api.utils"
import { UserContext } from "../../contexts/user.context"

const RoomChat = () => {
	const { currentUser, isLoggedIn } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect( ()=> {
		/* const fetchUsers = async () => {
			try {

				const response = await axios.get(`${getAllUsersUrl}${currentUser._id}`)
				console.log(response)
			} catch (error) {
				console.log(error);
			}
		} */
		if (isLoggedIn) {
			//fetchUsers();
		} else {
			navigate('/login');
		}
		
	},[])
  return (
    <div>RoomChat</div>
  )
}

export default RoomChat
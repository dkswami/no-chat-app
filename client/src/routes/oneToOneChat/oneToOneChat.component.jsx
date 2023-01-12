import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { getAllUsersUrl } from "../../utils/api.utils"
import { UserContext } from "../../contexts/user.context"
import DispalyUsers from "../../components/display-users/displayUsers.component"
import ChatContainer from "../../components/chat-container/chatContainer.component"
import './oneToOneChat.styles.scss'

const OneToOneChat = () => {
	const [allUsers, setAllUsers] = useState([]);

	const { currentUser, isLoggedIn } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAllUsers = async () => {
			try {

				const response = await axios.get(`${getAllUsersUrl}${currentUser._id}`)
				console.log(response)
				setAllUsers(response.data.users)
			} catch (error) {
				console.log(error);
			}
		}
		if (isLoggedIn) {
			fetchAllUsers();
		} else {
			navigate('/login');
		}

	}, [])
	return (
		<div className="oneToOneChat-container">
			<div className="users-chat-container">
				<DispalyUsers allUsers={allUsers} />
				<ChatContainer />
			</div>
		</div>
	)
}

export default OneToOneChat
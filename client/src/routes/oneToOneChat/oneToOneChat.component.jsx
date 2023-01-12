import { useEffect, useContext, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { io } from "socket.io-client";
import { getAllUsersUrl, backend } from "../../utils/api.utils"
import { UserContext } from "../../contexts/user.context"
import DispalyUsers from "../../components/display-users/displayUsers.component"
import ChatBox from "../../components/chat-box/chatBox.component"
import './oneToOneChat.styles.scss'

const OneToOneChat = () => {
	const [allUsers, setAllUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(undefined);

	const { currentUser, isLoggedIn } = useContext(UserContext);
	const navigate = useNavigate();
	const socket = useRef();

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
			socket.current = io(backend);
			socket.current.emit("add-user", currentUser._id);
		} else {
			navigate('/login');
		}
	}, [])

	return (
		<div className="oneToOneChat-container">
			<div className="users-chat-container">
				<DispalyUsers allUsers={allUsers} setSelectedUser={setSelectedUser} />
				{
					selectedUser === undefined ? (
						<div className="before-selection">
							<h3>Select a user to start chat</h3>
						</div>
					) : (
						<ChatBox selectedUser={selectedUser} socket={socket} />
					)
				}
			</div>
		</div>
	)
}

export default OneToOneChat
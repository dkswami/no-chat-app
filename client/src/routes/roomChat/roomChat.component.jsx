import { useState, useEffect, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { backendURL, getAllUsersUrl } from "../../utils/api.utils"
import { UserContext } from "../../contexts/user.context"
import { io } from "socket.io-client";
import "./roomChat.styles.scss"
import ChatBoxRoom from "../../components/chat-box-room/chat-box-room.component"

const RoomChat = () => {
	const [roomName, setRoomName] = useState('');
	const [inRoom, setInRoom] = useState(false);

	const { currentUser, isLoggedIn } = useContext(UserContext);
	const navigate = useNavigate();
	const socketRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		socketRef.current.emit("join-room", roomName);
		setInRoom(true);
	}

	useEffect(() => {
		if (isLoggedIn) {
			socketRef.current = io(backendURL);
		} else {
			navigate('/login');
		}
	}, [])
	return (
		<>
			{
				inRoom ? (
					<ChatBoxRoom roomName={roomName} socket={socketRef} />
				) : (
					<div className="roomchat-container">
						<form onSubmit={handleSubmit} >
							<h3>Hello {currentUser && currentUser.name}, Join a Room to continue</h3>
							<input type="text" placeholder="Enter Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
							<button type="submit">Join Room</button>
						</form >
					</div >
				)
			}
		</>

	)
}

export default RoomChat
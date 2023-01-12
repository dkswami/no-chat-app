import { useState } from 'react';
import ChatInput from '../chat-input/chat-input.component'
import '../chat-box/chatBox.styles.scss'
import './chat-box-room.styles.scss';
import { useEffect } from 'react';

const ChatBoxRoom = ({ roomName, socket }) => {
	const [messages, setMessages] = useState([]);
	const [incomingMessage, setIncomingMessage] = useState();

	const handleSendMessage = async (messageData) => {
		const dataToSend = {
			roomId: roomName,
			message: messageData
		}
		socket.current.emit("send-message-room", dataToSend);
		setMessages([ ...messages, { fromSelf: true, message: messageData } ]);
	}

	useEffect(() => {
		if(socket.current) {
			socket.current.on("receive-message-room", (data) => {
				setIncomingMessage({ fromSelf: false, message: data});
			})
		}		
	}, [])

	useEffect(() => {
		if (incomingMessage) {
			setMessages([ ...messages, incomingMessage ])
		}
	}, [incomingMessage])

	console.log(messages, incomingMessage);
	return (
		<div className="chatbox-room-container">
			<div className='chatbox-container'>
				<div className='chatbox-header'>
					<h4>Room Name : {roomName}</h4>
				</div>
				<div className='chatbox-body'>
					{messages.map((message, idx) => {
					return (
						<div key={idx} className={`message ${ message.fromSelf ? 'sent' : 'recieved'}`}>
							<div className="content">
								<p>{message.message}</p>
							</div>
						</div>
					)
				})}
				</div>
				<ChatInput handleSendMessage={handleSendMessage} />
			</div>
		</div>
	)
}

export default ChatBoxRoom
import { useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../contexts/user.context'
import { addMessageUrl, getMessagesUrl } from '../../utils/api.utils'
import ChatInput from '../chat-input/chat-input.component'
import './chatBox.styles.scss'
import { useEffect } from 'react'

const ChatBox = ({ selectedUser, socket }) => {
	const [ messages, setMessages ] = useState([]);
	const [ incomingMessage, setIncomingMessage ] = useState(null);
	const { currentUser } = useContext(UserContext);

	const handleSendMessage = async (messageData) => {
		try {
			const dataToSend =  {
				to: selectedUser._id,
				from: currentUser._id,
				message: messageData
			}
			const response = await axios.post(addMessageUrl, dataToSend);
			socket.current.emit("send-message", dataToSend);
			setMessages([ ...messages, { fromSelf: true, message: messageData }])
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		const fetchAllMessages = async () => {
			try {
				const response = await axios.post(getMessagesUrl, {
					to: selectedUser._id,
					from: currentUser._id,
				});
				setMessages(response.data);
			} catch (error) {
				console.log(error)
			}
		}
		fetchAllMessages();
	}, [selectedUser])
	
	useEffect(() => {
		if(socket.current) {
			socket.current.on("receive-message", (data) => {
				setIncomingMessage({ formSelf: false, message: data});
			})
		}
	},[])

	useEffect(() => {
		if (incomingMessage) {
			setMessages([...messages, incomingMessage ])
		}
	}, [incomingMessage])
	
	console.log(incomingMessage)
	//console.log(messages)
	return (
		<div className='chatbox-container'>
			<div className='chatbox-header'>
				<h4>{selectedUser.name}</h4>
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
	)
}

export default ChatBox
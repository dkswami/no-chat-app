import ChatInput from '../chat-input/chat-input.component'
import './chatBox.styles.scss'

const ChatBox = ({ selectedUser }) => {
	return (
		<div className='chatbox-container'>
			<div className='chatbox-header'>
				<h4>{selectedUser.name}</h4>
			</div>
			<div className='chatbox-body'>
				This is body
			</div>
			<ChatInput />
		</div>
	)
}

export default ChatBox
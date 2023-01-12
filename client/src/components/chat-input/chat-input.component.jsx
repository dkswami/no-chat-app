import { useState } from 'react';
import './chat-input.styles.scss';

const ChatInput = ({ handleSendMessage }) => {
	const [message, setMessage] = useState('');

	const handleChange = (event) => {
		setMessage(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (message.length > 0) {
			setMessage("");
			handleSendMessage(message);			
		}
	}
	return (
		<div className='chatbox-input'>
			<form className='input-container' onSubmit={handleSubmit}>
				<input type="text" placeholder="Type a message" value={message} onChange={handleChange}/>
				<button>Send</button>
			</form>
		</div>
	)
}

export default ChatInput
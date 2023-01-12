import './chat-input.styles.scss';

const ChatInput = () => {
	const handleSubmit = (e) => {
		e.preventDefault();

	}
	return (
		<div className='chatbox-input'>
			<form className='input-container' onSubmit={handleSubmit}>
				<input type="text" placeholder="Type a message" />
				<button>Send</button>
			</form>
		</div>
	)
}

export default ChatInput
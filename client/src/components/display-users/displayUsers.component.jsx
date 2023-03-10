import { useState } from 'react';
import './displayUsers.styles.scss'

const DisplayUsers = ({ allUsers, setSelectedUser }) => {
	const [selectedIndex, setSelectedIndex] = useState(undefined);

	const handleUserClick = (idx, user) => {
		setSelectedIndex(idx);
		setSelectedUser(user);
	}

	return (
		<div className='allUsers-container'>
			<h3 className='heading'>All Users :</h3>
			<div className='users-detail-container'>
			{
				allUsers.map((user,idx) => {
					return (
						<div key={idx} className={`user ${ selectedIndex === idx ? 'selected' : ''}`}
							onClick={() => handleUserClick(idx, user)}
						>
							<h4>{user.name}</h4>
							<p>{user.email}</p>
						</div>
					)
				})
			}
			</div>			
		</div>
	)
}

export default DisplayUsers
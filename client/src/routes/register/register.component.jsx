import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import axios from 'axios';
import { registerUrl } from '../../utils/api.utils';
import './register.styles.scss';
import { useEffect } from 'react';

const defaultFormFields = {
	name: '',
	email: '',
	password: ''
}

function Register() {
	const [formFields, setFormFields] = useState(defaultFormFields);

	const { setIsLoggedIn } = useContext(UserContext);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post(registerUrl, formFields);
			console.log(data)
			if (data.status === false) {
				alert(data.message);
			}
			else if (data.status === true) {
				localStorage.setItem('user_data', JSON.stringify(data.user))
				setIsLoggedIn(true);
				alert(`registered successfully, ${data.user.name}`);
				navigate('/');
			}
		} catch {
			console.log('Error');
		}
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	useEffect(() => {
		if (localStorage.getItem('user_data')) {
			navigate('/');
		}
	}, []);

	return (
		<div className='register-login-container'>
			<form onSubmit={handleSubmit}>
				<div className='register-heading'>
					<h2>A RealTime Chat App for No App</h2>
					<h3>Please Register</h3>
				</div>
				<input
					type="text"
					placeholder="User Name"
					name="name"
					onChange={handleChange}
				/>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					onChange={handleChange}
				/>
				<button type="submit">Create User</button>
				<span>
					Already have an account ? <Link to="/login">Login.</Link>
				</span>
			</form>
		</div>
	)
}

export default Register
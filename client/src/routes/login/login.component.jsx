import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUrl } from '../../utils/api.utils';
import '../register/register.styles.scss';
import { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
	email: '',
	password: ''
}

function Login() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	
	const { setIsLoggedIn } = useContext(UserContext);
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(loginUrl, formFields);
			console.log(response);
			const data = response.data;
			if (data.status === false) {
				alert(data.message);
			}
			else if (data.status === true) {
				localStorage.setItem('user_data', JSON.stringify(data.user))
				setIsLoggedIn(true);
				alert(`Logged In successfully, ${data.user.name}`);
				navigate('/');
			}
		} catch(error) {
			console.log('Error',error);
			if (error.code === "ERR_BAD_RESPONSE" || "ERR_NETWORK"){
				alert('Backend Server is not running. Please start the server and try again.')
			}
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
					<h3>Please Login as a registered user!</h3>
				</div>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					onChange={handleChange}
					required
				/>
				<button type="submit">Log In</button>
				<span>
					Don't have an account ? <Link to="/register">Register.</Link>
				</span>
			</form>
		</div>
	)
}

export default Login
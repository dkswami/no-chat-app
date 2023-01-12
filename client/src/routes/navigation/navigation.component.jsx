import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';

const Navigation = () => {
	const { setIsLoggedIn, isLoggedIn, setCurrentUser, currentUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogoutClick = () => {
		setIsLoggedIn(false)
		localStorage.removeItem('user_data')
		setCurrentUser({})
		navigate('/login');
	}

	return (
		<>
			<Navbar bg="primary" variant="dark">
				<Container>
					<Navbar.Brand href="/">No Chat App</Navbar.Brand>
					<Nav className="me-auto">
						<NavLink to="/" className={({ isActive }) => isActive ? `nav-link active` : `nav-link`}>Home</NavLink>
						<NavLink to="/chat" className={({ isActive }) => isActive ? `nav-link active` : `nav-link`}>One to One Chat</NavLink>
						<NavLink to="/room" className={({ isActive }) => isActive ? `nav-link active` : `nav-link`}>Room Chat</NavLink>
					</Nav>
					<Nav>
						{
							isLoggedIn ? (
								<>
									<span>{currentUser.name}</span>
									<button onClick={handleLogoutClick} style={{ border: 'none' }}>LOG OUT</button>
								</>
							) : (
								<>
									<NavLink to="/login" className={({ isActive }) => isActive ? `nav-link active` : `nav-link`}>Login</NavLink>
									<NavLink to="/register" className={({ isActive }) => isActive ? `nav-link active` : `nav-link`}>Register</NavLink>
								</>
							)
						}
					</Nav>
				</Container>
			</Navbar>
			<Outlet />
		</>
	)
}

export default Navigation
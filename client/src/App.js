import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './routes/register/register.component';
import Login from './routes/login/login.component';
import OneToOneChat from './routes/oneToOneChat/oneToOneChat.component';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigation />} >
				<Route index element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/chat" element={<OneToOneChat />} />
			</Route>
		</Routes>
	);
}

export default App;

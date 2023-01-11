import './App.css';
import { Route, Routes } from 'react-router-dom';
import Register from './routes/register/register.component';
import Login from './routes/login/login.component';
import Chat from './routes/chat/chat.component';

function App() {
  return (
	<Routes>
		<Route path="/register" element={<Register />} />
		<Route path="/login" element={<Login />} />
		<Route path="/" element={<Chat />} />
	</Routes>
  );
}

export default App;

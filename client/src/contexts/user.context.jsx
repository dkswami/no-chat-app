import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => { },
	isLoggedIn: false,
	setIsLoggedIn: () => { },
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const userData = localStorage.getItem('user_data')

	useEffect(() => {
		if (userData) {
			setCurrentUser(JSON.parse(userData))
			setIsLoggedIn(true)
		}
	}, [userData]);
	console.log(currentUser, isLoggedIn)
	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser,  isLoggedIn, setIsLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
}
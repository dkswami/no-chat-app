export const backendURL = process.env.REACT_APP_BACKEND_URL;
export const registerUrl = `${backendURL}/api/v1/auth/register`;
export const loginUrl = `${backendURL}/api/v1/auth/login`;
export const getAllUsersUrl = `${backendURL}/api/v1/auth/allusers`;
export const addMessageUrl = `${backendURL}/api/v1/chat/addmessage`;
export const getMessagesUrl = `${backendURL}/api/v1/chat/getmessages`;
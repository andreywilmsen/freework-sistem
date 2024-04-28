// Action de login
export const LoginAction = (token) => {
    return {
        type: 'LOGIN',
        payload: token
    };
};
// Action de logout
export const LogoutAction = () => {
    return {
        type: 'LOGOUT',
    };
};
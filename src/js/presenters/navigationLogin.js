import React from "react";
import NavigationLoginView from '../views/navigationLoginView'

/**
 * The presenter is responsible to show the log in form.
 * The form lets the user enter the username and password.
 * @param {UserModel} userModel userModel that includes user sing in data.
 * @returns {NavigationLoginView} a react element of the NavigationLoginView which lets the user to log in with username and password data.
 *                                 When the user is logged in successfully, the Navigation presenter will display the the username in the navbar. 
 */
function NavigationLogin({ userModel }) {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showLogin, setShowLogin] = React.useState(false);

    return React.createElement(NavigationLoginView, {
        setUsername: (username) => setUsername(username),
        setPassword: (password) => setPassword(password),
        handleSignin: () => userModel.loginUser(username, password),
        show: showLogin,
        handleShow: () => setShowLogin(true),
        handleClose: () => setShowLogin(false)
    });
}

export default NavigationLogin;

import React from "react";
import useModelProp from "../useModelProp";
import NavigationView from "../views/navigationView";
import {toast} from 'react-toastify';

/**
 * The presenter is responsible for which button will be displayed according to the logged in status. 
 * The status is either signedIn or not (True or false) using the useModelProp which return a specific component in the passed Model (userModel).
 * An error toast will be displayed to the user in case there is any error occurred while signing in.
 * Another error toast will be displayed to the user in case there is any error occurred will creating an instance of the Application Model
 * 
 * @param {UserModel} userModel The userModel includes data about the logged in user data.
 * @param {ServiceModel} serviceModel The application Model is used in the toast to check if there is any error occurred in it.
 * @param {Component} children to switch the state of the log in status. 
 * @returns {NavigationView} A react element of the NavigationView. 
 *                           Toggle state between (username, submit application and log out) button if the user is logged in and normal user,
 *                           (username and signout) buttons if the user is logged in and is worker/admin 
 *                           and (Signup and log in) buttons if the user has not logged in yet.
 *                    
 */
function Navigation({ userModel, serviceModel, children }) {
  
  const signedIn = useModelProp(userModel, "loggedIn"); 
  const [navigationSigninComponent, navigationSignupComponent, navigationSignoutComponent] = children; 
  const errorDataUser = useModelProp(userModel, "errorData"); 

  const errorDataApplication = useModelProp(serviceModel, "errorData"); 
  const [toggleState, setToggleState] = React.useState(false); 
  
    if (errorDataUser) {
      toast.error(errorDataUser.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      userModel.emptyErrorData();
    };

    if (errorDataApplication) {
      toast.error(errorDataApplication.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
      serviceModel.emptyErrorData();
    };
  

  if(signedIn) {
    return React.createElement(NavigationView, {
      component: [navigationSignoutComponent],
      toggleState: toggleState,
      setToggleState: () => setToggleState(!toggleState),
      handleClose: () => setToggleState(false)
    });
  } 

  return React.createElement(NavigationView, {
    component: [navigationSignupComponent, navigationSigninComponent],
    toggleState: toggleState,
    setToggleState: () => setToggleState(!toggleState),
    handleClose: () => setToggleState(false)
  }); 
}


export default Navigation;

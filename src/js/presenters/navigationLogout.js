import React from "react";
import useModelProp from "../useModelProp";
import NavigationUserLogoutView from '../views/navigationUserLogoutView'
import NavigationAdminWorkerLogoutView from "../views/navigationAdminWorkerLogoutView";
import RolesEnum from "../rolesEnum";
/**
 * The presenter is responsible to display the username and log out button.
 * (For admin/worker) The username will take the user to userProfile where they can filter applications, and the log out will log out the user from the homepage.
 * (For normal users) The username will take the user to userProfile where they can their already submitted applications, submit application button where they can submit new applications and the log out will log out the user from the homepage.
 * @param {UserModel} userModel userModel that includes logged in user data.
 * @param {Function} goToHomePageHref navigation to the homepage reference.
 * @param {Function} goToUserProfileHref navigation to the userProfile reference.
 * @returns {NavigationUserLogoutView} A react element of the NavigationUserLogoutView which lets the user to log out and handle the log out operation.
 *  
 * */
function NavigationLogout({ userModel, goToHomePageHref, goToUserProfileHref, goToUserViewHref }) {

    const modelUsername = useModelProp(userModel, "username");
    const modelUserRoleId = useModelProp(userModel, "role");
    if(modelUserRoleId === RolesEnum.Administrator || modelUserRoleId === RolesEnum.Worker) {
        return React.createElement(NavigationAdminWorkerLogoutView, {
            username: modelUsername,
            handleLogout: () => userModel.LogoutUser(),
            navHomePageHref: goToHomePageHref,
            navFilteringApplicationsHref: goToUserViewHref
        });
    }else {
        return React.createElement(NavigationUserLogoutView, {
            username: modelUsername,
            handleLogout: () => userModel.LogoutUser(),
            navHomePageHref: goToHomePageHref,
            navUserProfileHref: goToUserProfileHref,
            navToSubmitApplicationHref: goToUserViewHref
        });
    }
    
}

export default NavigationLogout;

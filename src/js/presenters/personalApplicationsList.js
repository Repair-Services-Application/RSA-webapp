import React from "react";
import useModelProp from "../useModelProp";
import WorkerAdminFilterView from "../views/workerAdminFilterView";
import PersonalApplicationsView from "../views/personalApplicationsView";
import FilteredApplicationsView from "../views/filteredApplicationsView";
import RolesEnum from "../rolesEnum";
import NoUserAccessView from "../views/noUserAccess";

/**
 * The PersonalApplicationsList presenter is responsible for showing the user's personal already submitted applications list by the personalApplicationsView view. 
 * According to the chosenApplication, 
 * When the user chooses an application, can open it using the chosenApplicationDetials presenter. 
 * @param {ServiceModel} serviceModel contains data about the applicationsList.
 * @param {Function} navToApplicationDetails  Takes the worker to the applicationDetails view when an application is chosen to be displayed.
 * @returns {PersonalApplicationsView | NoUserAccessView} PersonalApplicationsView to let the user to chose which application the user wants to display its details
 */
function PersonalApplicationsList({ userModel, serviceModel, navToApplicationDetails }) {

  let modelRoleId = useModelProp(userModel, "role");
  let modelApplicationsList = useModelProp(serviceModel, "applicationsList");
  let filledPersonalApplicationsOnce = useModelProp(serviceModel, "filledPersonalApplicationsOnce");

  if (modelRoleId === RolesEnum.User) { 
    
    if(filledPersonalApplicationsOnce !== true) {
      serviceModel.getPersonalApplicationsList();
    }
    return React.createElement(
      React.Fragment,
      {},
      modelApplicationsList &&
      React.createElement(PersonalApplicationsView, {
        applicationsList: modelApplicationsList,
        showApplicationDetails: (applicationId) => {
          serviceModel.setCurrentApplicationID(applicationId);
          serviceModel.getChosenApplicationData(applicationId);
        },
        navToApplicationDetails: navToApplicationDetails,
      })
    );
  } else {
    return React.createElement(NoUserAccessView, {},)
  }

}
export default PersonalApplicationsList;

import React from "react";
import useModelProp from "../useModelProp";
import ChosenApplicationDetailsWorkerView from "../views/chosenApplicationDetailsWorkerView";
import ChosenApplicationDetailsUserView from "../views/chosenApplicationDetailsUserView";
import RolesEnum from "../rolesEnum";
import FailedSignInView from "../views/failedSignInView";

/**
 * The presenter of the View (ChosenApplicationDetailsView) 
 * which render the details of the chosen application by the logged in worker 
 * and let the worker to make a decision for the chosen application (reviewed, accepted, picked up, being fixed, finished, or delivered).
 * 
 * @param {UserModel} userModel The userModel that includes logged in user data.
 * @param {ServiceModel} serviceModel The serviceModel that includes data about the filtered application, chosen application data, etc.
 * @param {Function} navToApplicationsList After making the decision, the presenter will be returning the worker to the workerAdminMain presenter.
 * @returns {ChosenApplicationDetailsWorkerView | ChosenApplicationDetailsUserView | FailedSignInView} Rendered react element of the ChosenApplicationDetailsView with the passed data. 
 *                                                                                   It gives the worker the options to make a decision for the chosen application to be registered later in the database.
 *                                                                                   If the logged in  has another role than user, worker or admin. It will return a react element View of "NoUserAccessView" 
 *                                                                                   which tells that the logged in user doesn't have the permission to visit this page.
 *                                                                                   If the website visitor hasn't logged in yet. It will return a React element of the view "FailedSignInView" which informs the visitor to log in first.
 */
function ChosenApplicationDetails({ userModel, serviceModel, navToApplicationsList, navToPersonalApplicationsList }) {

  const [priceSuggestion, setPriceSuggestion] = React.useState(""); // will be used for priceSuggestion registration.
  const [reparationStatus, setReparationStatus] = React.useState("");// will be used for reparationStatus registration.
  const [approvalValue, setApprovalValue] = React.useState("");// will be used for user approvalValue registration.
  let approvalAvailableValues = ["Yes", "No"];
  let reparationStatuses = useModelProp(serviceModel, "reparationStatuses");
  let applicationId = useModelProp(serviceModel, "currentApplicationId"); // later for decision submission.
  let chosenApplicationDetails = useModelProp(serviceModel, "chosenApplicationData");
  let modelRoleId = useModelProp(userModel, "role");


  if (modelRoleId === RolesEnum.Worker || modelRoleId === RolesEnum.Administrator) {
    return (
      chosenApplicationDetails &&
      React.createElement(ChosenApplicationDetailsWorkerView, {
        applicationData: chosenApplicationDetails,
        reparationStatuses: reparationStatuses,
        setReparationStatus: setReparationStatus,
        setPriceSuggestion: priceSuggestion => setPriceSuggestion(priceSuggestion),
        makeChanges: () => {},
        // () => {call the update endpoints},
        navToApplicationsList: navToApplicationsList,
      })
    );
  }
  else if (modelRoleId === RolesEnum.User) {
   return (
    chosenApplicationDetails &&
    React.createElement(ChosenApplicationDetailsUserView, {
      applicationData: chosenApplicationDetails,
      approvalAvailableValues: approvalAvailableValues,
      setApprovalValue: setApprovalValue,
      makeChanges: () => {},
      // () => {call the update endpoints},
      navToApplicationsList: navToPersonalApplicationsList,
    })
  );
  }
  else {
   return React.createElement(FailedSignInView, {});
  }
}
export default ChosenApplicationDetails;

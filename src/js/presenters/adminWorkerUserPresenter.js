import React from "react";
import useModelProp from "../useModelProp";
import WorkerAdminMain from "./workerAdminMain";
import ApplicationSubmission from "./applicationSubmission";
import FailedSignInView from "../views/failedSignInView";
import RolesEnum from "../rolesEnum";

/**
 * The presenter chooses whether the Worker or Application presenter will be presented depending on the logged user (roleId).
 * @param {UserModel} userModel an object includes data about the logged in user, if the user is either worker or user. 
 * @param {ServiceModel} serviceModel an object includes data that checks if the categories[] and reparationStatuses[] have been filled once or not (to prevent be filled multiple times).
 * The model is passed later to the WorkerAdminMain and ApplicationSubmission presenters.
 * @param {Function} navToApplicationDetails take the user back to Application Details page
 * @returns {WorkerAdminMain | ApplicationSubmission | FailedSignInView} The presenter WorkerAdminMain if the logged in user is a worker.
 *                                                                     The ApplicationSubmission if the logged in user is a user.
 *                                                                     A react element of the FailedSignInView that let the visitor to know 
 *                                                                     the page needs a log in first. 
 */
function AdminWorkerUserPresenter({ userModel, serviceModel, navToApplicationDetails }) {
  const modelRoleId = useModelProp(userModel, "role");
  let filledCategoryDataOnceInList = useModelProp(serviceModel, "filledCategoryDataOnce");
  let filledReparationStatusDataOnce = useModelProp(serviceModel, "filledReparationStatusDataOnce");

  React.useEffect(
    function () {
      if ((modelRoleId === RolesEnum.Administrator || modelRoleId === RolesEnum.Worker || modelRoleId === RolesEnum.User) && filledCategoryDataOnceInList === false) {
        serviceModel.getCategories();

      }
      if ((modelRoleId === RolesEnum.Administrator || modelRoleId === RolesEnum.Worker) && (filledReparationStatusDataOnce === false)) {
        serviceModel.getReparationStatuses();
      }
    },
    [modelRoleId]
  );

  if (modelRoleId === RolesEnum.User) {
    return <ApplicationSubmission serviceModel={serviceModel} />
  }
  else if (modelRoleId === RolesEnum.Worker) {
    return <WorkerAdminMain serviceModel={serviceModel} navToApplicationDetails={navToApplicationDetails} />
  }
  else if (modelRoleId === RolesEnum.Administrator) {
    return <WorkerAdminMain serviceModel={serviceModel} navToApplicationDetails={navToApplicationDetails} />
  }
  return React.createElement(FailedSignInView, {});
}

export default AdminWorkerUserPresenter;
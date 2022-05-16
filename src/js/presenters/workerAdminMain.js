import React from "react";
import useModelProp from "../useModelProp";
import WorkerAdminFilterView from "../views/workerAdminFilterView";
import FilteredApplicationsView from "../views/filteredApplicationsView";

import { toast } from 'react-toastify';

/**
 * The WorkerAdminMain is responsible for the filter bar where the worker chooses which attribute will be used for the applications filtering.
 * According to the chosen attribute, the FilteredApplicationsView view will list the applications.
 * When the worker chooses an application, and makes a decision for that application, a notification will be shown to the worker to verify 
 * the made decision with the application id as a notification. 
 * @param {ServiceModel} serviceModel contains data about the competenceType list, the filtered application using the chosen attributes, 
 *                                            the chosen application details to be used for the notification and the made decision of the chosen application.
 * @param {Function} navToApplicationDetails  Takes the worker to the applicationDetails view when an application is chosen to be displayed.
 * @returns {WorkerAdminFilterView & FilteredApplicationsView} WorkerAdminFilterView to let the user to enter the desired attributes data to filter 
 *                                                           the applications depending on. 
 *                                                           FilteredApplicationsView will be displayed when the "Filter application" button is pressed. 
 *                                                           It displays the filtered applications.
 */
function WorkerAdminMain({ serviceModel, navToApplicationDetails }) {
  const [applicationId, setApplicationId] = React.useState("");
  const [categoryRelationId, setCategoryRelationId] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [dateOfRegistrationFrom, setDateOfRegistrationFrom] = React.useState("");
  const [dateOfRegistrationTo, setDateOfRegistrationTo] = React.useState("");
  const [suggestedPriceFrom, setSuggestedPriceFrom] = React.useState("");
  const [suggestedPriceTo, setSuggestedPriceTo] = React.useState("");
  const [reparationStatusId, setReparationStatusId] = React.useState("");

  let categories = useModelProp(serviceModel, "categories");
  let reparationStatuses = useModelProp(serviceModel, "reparationStatuses");
  let modelApplicationsList = useModelProp(serviceModel, "applicationsList");
  let chosenApplicationDetails = useModelProp(serviceModel, "chosenApplicationData");

  
  return React.createElement(
    React.Fragment,
    {},
    React.createElement(WorkerAdminFilterView, {
      setApplicationId: applicationId => setApplicationId(applicationId),
      categories: categories,
      setCategoryRelationId: categoryRelationId => setCategoryRelationId(categoryRelationId),
      setFirstname: firstname => setFirstname(firstname),
      setLastname: lastname => setLastname(lastname),
      dateOfRegistrationFrom: dateOfRegistrationFrom,
      setDateOfRegistrationFrom: dateOfRegistrationFrom => setDateOfRegistrationFrom(dateOfRegistrationFrom),
      dateOfRegistrationTo: dateOfRegistrationTo,
      setDateOfRegistrationTo: dateOfRegistrationTo => setDateOfRegistrationTo(dateOfRegistrationTo),
      setSuggestedPriceFrom: suggestedPriceFrom =>setSuggestedPriceFrom(suggestedPriceFrom),
      setSuggestedPriceTo: suggestedPriceTo =>setSuggestedPriceTo(suggestedPriceTo),
      reparationStatuses: reparationStatuses,
      setReparationStatusId: reparationStatusId => setReparationStatusId(reparationStatusId),
      handleAppliedFilter: () => {
        serviceModel.filterUnFilteredApplicationsData(applicationId, categoryRelationId, firstname, lastname, dateOfRegistrationFrom,
          dateOfRegistrationTo, suggestedPriceFrom, suggestedPriceTo, reparationStatusId);
      },
    }),
    modelApplicationsList &&
    React.createElement(FilteredApplicationsView, {
      applicationsList: modelApplicationsList,
      showApplicationDetails: (applicationId) => {
        serviceModel.setCurrentApplicationID(applicationId);
        serviceModel.getChosenApplicationData(applicationId);
      },
      navToApplicationDetails: navToApplicationDetails,
    }), 
  );
}
export default WorkerAdminMain;

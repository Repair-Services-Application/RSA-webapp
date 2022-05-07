import React from "react";
import useModelProp from "../useModelProp";
import ApplicationSubmissionView from "../views/applicationSubmissionView";
import { toast } from 'react-toastify';

/**
 * The presenter of the View (applicationSubmissionView) which render the form of the application and 
 * lets the user submit a new application with new data.
 * The function shows a toast with the application ID(notification) to the user when the application is successfully registered in the database.
 * The function accessed only when the logged in user is a normal user.
 * 
 * @param {Object} serviceModel from the "AdminWorkerUserPresenter" 
 * which includes data about the filtered applications and other data for other presenters.
 * 
 * @returns {ApplicationSubmissionView} A React element helps the user to enter the data of the submitted application.
 */
function ApplicationSubmission({ serviceModel }) {

  const [categoryId, setCategoryId] = React.useState("");

  let submitApplicationText = "Submit the application";
  let categories = useModelProp(serviceModel, "categories")
  const [problemDescription, setProblemDescription] = React.useState("");
  let applicationID = useModelProp(serviceModel, "latestSubmittedApplicationId");

  if(applicationID) {
    let message = `Your application has been successfully registered with application ID: ${applicationID}`; 
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored"
    });
    serviceModel.emptySubmittedApplicationID();
  }

  return (
    React.createElement(ApplicationSubmissionView, {
      categories: categories,
      setCategoryId: categoryId => setCategoryId(categoryId),
      setProblemDescription: problemDescription => setProblemDescription(problemDescription),
      submitApplicationText: submitApplicationText,
      submitApplication: () => {
        serviceModel.filterSubmittedApplicationData(categoryId, problemDescription)
      },
    })
  );
}
export default ApplicationSubmission;

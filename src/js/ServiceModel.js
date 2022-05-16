import ApiData from "./apiData";

/**
 * Responsible for handling all the information about the applications.
 */
class ServiceModel {
    /**
     * Create an instance of the application handler.
     */
    constructor() {
        this.subscribers = [];
        this.categories = [];
        this.category = {
            categoryRelationId: null,
            categoryId: null,
            categoryDescription: null,
            parentCategoryId: null,
        };

        this.reparationStatuses = [];
        this.reparationStatus = {
            reparationStatusId: null,
            reparationStatusDescription: null,
        }
        this.applicationsList = [];
        this.errorData = null;
        this.filledCategoryDataOnce = false;
        this.filledReparationStatusDataOnce = false;
        this.filledPersonalApplicationsOnce = false;
        this.currentApplicationId = null;
        this.latestSubmittedApplicationId = null;
        this.chosenApplicationData = null;
        this.latestApplicationDecision = null;
    }

    /**
     * Get the categories and their info and store them into an attribute.
     */
     getCategories() {
        ApiData.getCategories()
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateCategoriesData(dataContent);
                    });
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Get the reparation statuses and their info and store them into an attribute.
     */
    getReparationStatuses() {
        ApiData.getReparationStatuses()
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateReparationStatusData(dataContent);
                    });
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });
    }

    /**
     * Get all the application that follow the filtering parameters. The user must be a worker/admin.
     *  
     * @param {number} applicationId The Id of the application.
     *                      Leaving it empty means no filtering with applicationId.
     * @param {number} categoryId The category Id of the application.
     *                      Leaving it empty means no filtering with categoryId.
     * @param {string} firstname The first name of the user that the application relates to.
     *                      Leaving it empty means no filtering with first name.
     * @param {string} lastname The last name of the user that the application relates to.
     *                      Leaving it empty means no filtering with last name.
     * @param {string} dateOfRegistrationFrom The date of registration that the application submitted at (the start of the range).
     *                      Leaving it empty means no filtering with dateOfRegistrationFrom.
     * @param {string} dateOfRegistrationTo The date of registration that the application submitted at (the end of the range).
     *                      Leaving it empty means no filtering with dateOfRegistrationTo.
     * @param {number} suggestedPriceFrom The suggested price that is suggested by worker/admin for the application (the start of the range).
     *                      Leaving it empty means no filtering with suggestedPriceFrom.
     * @param {number} suggestedPriceTo The suggested price that is suggested by worker/admin for the application (the end of the range).
     *                      Leaving it empty means no filtering with suggestedPriceTo.
     * @param {string} reparationStatusId The Id of the current reparation status of the application.
     *                      Leaving it empty means no filtering with reparationStatusId.
     */
    filterApplications(applicationId, categoryRelationId, firstname, lastname, dateOfRegistrationFrom,
        dateOfRegistrationTo, suggestedPriceFrom, suggestedPriceTo, reparationStatusId) {

        ApiData.listApplications(applicationId, categoryRelationId, firstname, lastname, dateOfRegistrationFrom,
            dateOfRegistrationTo, suggestedPriceFrom, suggestedPriceTo, reparationStatusId)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateApplicationsData(dataContent);
                    });
                } else {
                    result.json().then((data) => {
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });

    }

    /**
     * Get all the information related to the specified application.
     * @param {number} applicationId The id related to the application.
     */
    getChosenApplicationData(applicationId) {
        ApiData.getApplicationDetails(applicationId)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateChosenApplicationData(dataContent);
                    });
                } else {
                    result.json().then((data) => {
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });

    }

    /**
     * Get the logged in user's personal applications list. The user must have the role "user".
     */
    getPersonalApplicationsList() {
        ApiData.listPersonalApplications()
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populatePersonalApplicationsData(dataContent);
                        this.filledPersonalApplicationsOnce = true;
                    });
                } else {
                    result.json().then((data) => {
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });

    }

    /**
     * Filter out the info of the passed data to match a specific format for listing out the applications.
     * @param {number} unfiliteredAapplicationId The unfiltered application Id that could be empty.
     * @param {number} unfiliteredCategoryId  The unfiltered application category Id that could be empty.
     * @param {string} unfiliteredFirstname  The unfiltered application first name that could be empty.
     * @param {string} unfiliteredLastname  The unfiltered application last name that could be empty.
     * @param {string} unfiliteredDateOfRegistrationFrom  The unfiltered application date of registration from that could be empty.
     * @param {string} unfiliteredDateOfRegistrationTo  The unfiltered application date of registration to that could be empty.
     * @param {number} unfiliteredSuggestedPriceFrom  The unfiltered application suggested price from that could be empty.
     * @param {number} unfiliteredSuggestedPriceTo  The unfiltered application suggested price to that could be empty.
     * @param {number} unfiliteredReparationStatusId  The unfiltered application reparation status Id that could be empty.
     */
    filterUnFilteredApplicationsData(unfiliteredAapplicationId, unfiliteredCategoryId, 
        unfiliteredFirstname, unfiliteredLastname, unfiliteredDateOfRegistrationFrom, 
        unfiliteredDateOfRegistrationTo, unfiliteredSuggestedPriceFrom, unfiliteredSuggestedPriceTo, 
        unfiliteredReparationStatusId) {
        
        let applicationId = 0;
        let categoryId = 0;
        let firstname = "";
        let lastname = "";
        let dateOfRegistrationFrom = "";
        let dateOfRegistrationTo = "";
        let suggestedPriceFrom = 0;
        let suggestedPriceTo = 0;
        let reparationStatusId = 0;
        
        if (unfiliteredAapplicationId !== "") {
            applicationId = unfiliteredAapplicationId;
        }
        if (unfiliteredCategoryId !== "") {
            categoryId = unfiliteredCategoryId;
        }
        if (unfiliteredFirstname !== "") {
            firstname = unfiliteredFirstname;
        }
        if (unfiliteredLastname !== "") {
            lastname = unfiliteredLastname;
        }
        if (unfiliteredDateOfRegistrationFrom !== "" && 
        unfiliteredDateOfRegistrationFrom !== undefined && 
        unfiliteredDateOfRegistrationFrom !== null) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateOfRegistrationFrom = unfiliteredDateOfRegistrationFrom.toLocaleDateString('sv-SE', options);
        }
        if (unfiliteredDateOfRegistrationTo !== "" && 
        unfiliteredDateOfRegistrationTo !== undefined && 
        unfiliteredDateOfRegistrationTo !== null) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            dateOfRegistrationTo = unfiliteredDateOfRegistrationTo.toLocaleDateString('sv-SE', options);
        }
        if (unfiliteredSuggestedPriceFrom !== "") {
            suggestedPriceFrom = unfiliteredSuggestedPriceFrom;
        }
        if (unfiliteredSuggestedPriceTo !== "") {
            suggestedPriceTo = unfiliteredSuggestedPriceTo;
        }
        if (unfiliteredReparationStatusId !== "") {
            reparationStatusId = unfiliteredReparationStatusId;
        }

        this.filterApplications(applicationId, categoryId, firstname, lastname, dateOfRegistrationFrom,
            dateOfRegistrationTo, suggestedPriceFrom, suggestedPriceTo, reparationStatusId);
    }

    /**
     * Create an application for the user for the repairment service.
     * @param {number} categoryId The category id that is related to the service.
     * @param {string} problemDescription The problem description of the submitted application.
     */
    submitApplication(categoryRelationId, problemDescription) {
        ApiData.submitApplication(categoryRelationId, problemDescription)
            .then((result) => {
                if (result.ok) {
                    result.json().then((data) => {
                        let dataContent = data.success;
                        this.populateSubmittedApplicationData(dataContent);
                    });
                } else {
                    result.json().then((data) => {
                        this.handleErrorMessages(result.status, data.error);
                    });
                }
            })
            .catch((error) => {
                if (error instanceof TypeError) {
                    this.handleErrorMessages(503, 'There is no connection to the server or the server is unavailable.');
                } else {
                    this.handleErrorMessages(503, 'Something went wrong in the website or the service.');
                }
            });

    }

    /**
     * Filter out the info about the submission of the application parameters. The user must be an user.
     * @param {number} unfilteredCategoryId The unfiltered category Id that could be empty.
     * @param {string} unfilteredProblemDescription The problem description of the application that could be empty.
     */
    filterSubmittedApplicationData(unfilteredCategoryRelationId, unfilteredProblemDescription) {

        let categoryRelationId = 0;
        let problemDescription = "";

        if (unfilteredCategoryRelationId !== "") {
            categoryRelationId = parseInt(unfilteredCategoryRelationId);
        }
        if (unfilteredProblemDescription !== "" && unfilteredProblemDescription !== undefined) {
            problemDescription = unfilteredProblemDescription;
        }        

        this.submitApplication(categoryRelationId, problemDescription);
    }

    /**
     * Notify the observers for the error encountered during some operation and pass on the error information.
     * @param {number} code The status code related to the error.
     * @param {string} message The message explanting the error.
     */
    reportError(code, message) {
        this.errorData = { code: code, message: message };
        this.notifyObservers();
    }

    /**
     * Set the categories information with all their data.
     * @param {[categoryId, description, parentCategoryId]} dataContent The content related to the categories. 
     */
    populateCategoriesData(dataContent) {
        if (!this.filledCategoryDataOnce) {
            for (let i = 0; i < dataContent.length; i++) {

                this.category = {
                    categoryRelationId: dataContent[i].categoryRelationId,
                    categoryId: dataContent[i].categoryId,
                    categoryDescription: dataContent[i].categoryDescription,
                    parentCategoryId: dataContent[i].parentCategoryId,
                };

                this.categories = [this.category, ...this.categories];
            }
            this.filledCategoryDataOnce = true;
        }
        this.notifyObservers();
    }

    /**
     * Set the reparations statuses information with all their data.
     * @param {[reparationStatusId, reparationStatusDescription]} dataContent The content related to the reparations statuses. 
     */
    populateReparationStatusData(dataContent) {
        if (!this.filledReparationStatusDataOnce) {
            for (let i = 0; i < dataContent.length; i++) {

                this.reparationStatus = {
                    reparationStatusId: dataContent[i].reparationStatusId,
                    reparationStatusDescription: dataContent[i].reparationStatusDescription,
                };

                this.reparationStatuses = [this.reparationStatus, ...this.reparationStatuses];
            }
            this.filledReparationStatusDataOnce = true;
        }
        this.notifyObservers();
    }

    /**
     * Set all the applications that are filtered.
     * @param {{applicationID, firstName, lastName, competenceType, yearsOfExperience, dateFrom, 
     *          dateTo, decision}} filteredApplications The applications that are filtered.
     */
    populateApplicationsData(filteredApplications) {
        let applications = filteredApplications.applications;
        this.applicationsList = applications;
        this.notifyObservers();
    }

    populatePersonalApplicationsData(personalApplications) {
        let applications = personalApplications.applications;
        this.applicationsList = applications;
        this.notifyObservers();
    }

    /**
     *      * Set the application details with all the needed information.
     * @param {{applicationId, firstname, lastname, categoryDescription, categoryId, problemDescription, dateOfRegistration, 
     *          timeOfRegistration, suggestedPriceByWorker, priceApprovalByUser, reparationStatusId, reparationStatusDescription}} 
     *          fill the application details in the variable "chosenApplicationData".
     */
    populateChosenApplicationData(applicationDetails) {
        let chosenApplicationData = {
            applicationId: applicationDetails.applicationId,
            firstname: applicationDetails.firstname,
            lastname: applicationDetails.lastname,
            categoryDescription: applicationDetails.categoryDescription,
            categoryId: applicationDetails.categoryId,
            problemDescription: applicationDetails.problemDescription,
            dateOfRegistration: applicationDetails.dateOfRegistration,
            timeOfRegistration: applicationDetails.timeOfRegistration,
            suggestedPriceByWorker: applicationDetails.suggestedPriceByWorker,
            priceApprovalByUser: applicationDetails.priceApprovalByUser,
            reparationStatusId: applicationDetails.reparationStatusId,
            reparationStatusDescription: applicationDetails.reparationStatusDescription,
        }

        this.chosenApplicationData = chosenApplicationData;
        this.notifyObservers();
    }

    /**
     * Get the application details with all the needed information.
     * @return {{applicationId, firstname, lastname, categoryDescription, categoryId, problemDescription, dateOfRegistration, 
     *          timeOfRegistration, suggestedPriceByWorker, priceApprovalByUser, reparationStatusId, reparationStatusDescription}} 
     *          the application details in the variable "chosenApplicationData"..
     */
    returnChosenApplicationDetails() {
        return this.chosenApplicationData;
    }

    /**
     * Set the id for the submitted application.
     * @param {{id}} dataContent The data with an id content.
     */
    populateSubmittedApplicationData(dataContent) {
        this.latestSubmittedApplicationId = dataContent.applicationID;
        this.notifyObservers();
    }

    /**
     * Get the id for the submitted application.
     * @returns {number} The id for the submitted application.
     */
    getSubmittedApplicationID() {
        return this.latestSubmittedApplicationId;
    }

    /**
     * Get the applications that were filtered.
     * @returns {[{firstName, lastName}]} An array of applications.
     */
    getApplicationsList() {
        return this.applicationsList;
    }

    /**
     * Set the id value of the current application.
     * @param {number} applicationID The id of the application.
     */
    setCurrentApplicationID(applicationId) {
        this.currentApplicationId = applicationId;
        this.notifyObservers();
    }

    /**
     * Get the last id for the application which is the most recent.
     * @returns {number} The id of the most recent application.
     */
    getCurrentApplicationID() {
        return this.currentApplicationId;
    }

    /**
     * Reset the info about the last registered application.
     */
    emptySubmittedApplicationID() {
        this.latestSubmittedApplicationId = null;
        this.notifyObservers();
    }

    /**
     * Reset the info about the application to display.
     */
    emptyChosenApplicationData() {
        this.chosenApplicationData = null;
        this.notifyObservers();
    }

    /**
     * Reset the info about the error that was recently encountered and notify the observers.
     */
    emptyErrorData() {
        this.errorData = null;
        this.notifyObservers();
    }

    /**
     * Adds an observer to the class.
     * @param {function} callback The operation that will be called when the observer is notified.
     */
    addObserver(callback) {
        this.subscribers = this.subscribers.concat(callback);
    }

    /**
     * Removes the observer from the class.
     * @param {Observer} obs The observer 
     */
    removeObserver(obs) {
        this.subscribers = this.subscribers.filter(o => { return o !== obs; });
    }

    /**
     * Notifies the observers after any changes.
     */
    notifyObservers() {
        this.subscribers.forEach(callback => {
            try {
                callback();
            }
            catch (err) {
                console.error("Callback error: ", err, callback);
            }
        });
    }

    /**
   * Handle the errors that the website encounters.
   * @param {number} status The status code related to the error.
   * @param {string | {msg, param}} error The error that happened.
   */
    handleErrorMessages(status, error) {
        if (typeof error === 'string') {
            this.reportError(status, error);
            return;
        }

        let message = '';

        error.errors.forEach((err) => {
            message = err.msg + ' for ' + err.param;
            this.reportError(status, message);
        });
    }
}

export default ServiceModel;
import BASE_URL from "./apiConfig";

/**
 * Responsible for the api calls that will happen in the website. Ranging from creating the 
 * proper request to receiving the response.
 */
const ApiData = {
    /**
     * The base api call function that fetches resources using the BASE_URL, and the specified urlPath 
     * according to the needed functionality to be preformed. 
     * fetch function is using a base URL for the requests that is the hosted server, 
     * the information about the host server is specified in the apiConfig.js.
     * @param {string} urlPath Specific URL related to the api for retrieving specific recourses.
     * @param {Request} requestContent The request content needed for the request to fetch the info. 
     *                                 it will contain method type, credentials, headers and body.
     * @returns {Response} The response from the sent request.
     * @throws {Exception} Any type of error that could be encountered through the call.
     */
    apiCall(urlPath, requestContent) {
        const fetchData = fetch(BASE_URL + urlPath, requestContent)
            .then((response) => { return response; })
            .catch((error) => { throw error; });
        return fetchData;
    },

    /**
     * Create the proper request with the user info to try to login 
     * the user into the account.
     * user/login is the endpoint that the api call will answer to for 
     * signing in users.
     * @param {string} username The username of the account.
     * @param {string} password The password of the account.
     * @returns {Response} The response after signing in. 
     */
    loginUser(username, password) {
        return this.apiCall(
            'user/login'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                }),
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Checks if the user is still logged in according to the stored cookie.
     * user/checkSignin is the endpoint that the api call will answer to for
     * checking the sing in validation. 
     * @returns {Response} The response after the login check.
     */
     checkLogin() {
        return this.apiCall(
            'user/checkLogin'
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Sign out the user that was logged in before.
     * user/signout is the endpoint that the api call will answer to for
     * signing out the user.
     * @returns {Response} The response after signing out. 
     */
     LogoutUser() {
        return this.apiCall(
            'user/logout'
            , {
                method: 'get',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                }
            }
        ).then((response) => {
            return response;
        });
    },

    /**
     * Try to create a new account for the new user. Providing the needed info about the new user.
     * user/signup is the endpoint that the api call will answer to for
     * signing up the user with a new account.
     * @param {string} firstName The first name of the new user.
     * @param {string} lastName The last name of the new user.
     * @param {string} personNumber The personal number of the new user.
     * @param {string} email The email of the new user.
     * @param {string} username the username for the new account.
     * @param {string} password The password for the new account.
     * @returns {Response} The response after trying to create the new account.
     */
    signupUser(firstName, lastName, personNumber, email, username, password, mobileNumber) {
        return this.apiCall(
            'user/signup'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "firstname": firstName,
                    "lastname": lastName,
                    "personalNumber": personNumber,
                    "email": email,
                    "username": username,
                    "password": password,
                    "mobileNumber": mobileNumber
                }),
            })
            .then((response) => {
                return response;
            });
    },

    /**
     * Get the available categories.
     * service/getCategories is the endpoint that the api call will answer to for getting the categories for submitting an application /
     *  filter applications.
     * @returns {Response} The response after getting the available categories.
     */
    getCategories() {
        return this.apiCall(
            'service/getCategories'
            , {
                method: 'get',
                credentials: 'include',
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * Get the available reparation statuses.
     * service/getReparationStatusList is the endpoint that the api call will answer to for getting the reparation statuses for 
     * submitting a decision for an application.
     * @returns 
     */
    getReparationStatuses() {
        return this.apiCall(
            'service/getReparationStatusList'
            , {
                method: 'get',
                credentials: 'include',
            }
        )
            .then((response) => {
                return response;
            });
    },

    
    /**
     * List the applications which could be filtered with different values that are the parameters. 
     * The user must be a worker.
     * service/getApplicationsByWorker is the endpoint that the api call will answer to for
     * getting the application that are following the filtering parameters if they exist.
     * There are specific values for the parameters indicating if they exist.
     * @param {number} applicationId the application's id.
     * @param {number} categoryId the application's category id.
     * @param {string} firstname the application's user's firstname,
     * @param {string} lastname the application's user's lastname.
     * @param {string} dateOfRegistrationFrom The date range of applications registration starts from.
     * @param {string} dateOfRegistrationTo The date range of applications registration ends to.
     * @param {number} suggestedPriceFrom The suggested price range of applications starts from.
     * @param {number} suggestedPriceTo The suggested price range of applications starts from.
     * @param {number} reparationStatusId The application's reparation status id
     * @returns a list of the filtered applications according to the filtering parameters.
     */
    listApplications(applicationId, categoryId, firstname, lastname, dateOfRegistrationFrom,
        dateOfRegistrationTo, suggestedPriceFrom, suggestedPriceTo, reparationStatusId) {
        return this.apiCall(
            'service/getApplicationsByWorker?' + new URLSearchParams({
                "applicationId": applicationId,
                "categoryId": categoryId,
                "firstname": firstname,
                "lastname": lastname,
                "dateOfRegistrationFrom": dateOfRegistrationFrom,
                "dateOfRegistrationTo": dateOfRegistrationTo,
                "suggestedPriceFrom": suggestedPriceFrom,
                "suggestedPriceTo": suggestedPriceTo,
                "reparationStatusId": reparationStatusId,
            })
            , {
                method: 'get',
                credentials: 'include',
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * List the applications which the user has submitted earlier
     * @returns The user's submitted applications list.
     */
    listPersonalApplications() {
        return this.apiCall(
            'service/getPersonalApplications'
            , {
                method: 'get',
                credentials: 'include',
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * Get all needed information about an application. The user must be a worker/Admin to get all applications' details, 
     * and must be a normal user to get personal applications' details.
     * service/getApplication is the endpoint that the api call will answer to get the desired application's information.
     * @param {number} applicationId The id of the specified application.
     * @returns {Response} The response after trying to retrieve the application info.
     */
    getApplicationDetails(applicationId) {
        return this.apiCall(
            'service/getApplicationDetails?' + new URLSearchParams({
                "applicationId": applicationId
            })
            , {
                method: 'get',
                credentials: 'include',
            }
        )
            .then((response) => {
                return response;
            });
    },

    /**
     * Register a new application for the user with the needed information. The user must be an user.
     * service/registerApplication is the endpoint that the api call will answer to for
     * registering the application for the application(user).
     * @param {number} categoryId The category id that is related to the service.
     * @param {string} problemDescription The problem description of the submitted application.
     * @returns {Response} The response after trying to register the new application for the user.
     */
     submitApplication(categoryId, problemDescription) {
        return this.apiCall(
            'service/registerApplication'
            , {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "categoryId": categoryId,
                    "problemDescription": problemDescription
                }),
            }
        )
            .then((response) => {
                return response;
            });
    },

};

export default ApiData;

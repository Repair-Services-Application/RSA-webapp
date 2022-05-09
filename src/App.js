import React from "react";
import Homepage from "./js/presenters/homepage";
import ShowView from "./js/presenters/viewManager";
import Navigation from "./js/presenters/navigation";
import ChosenApplicationDetails from "./js/presenters/chosenApplicationDetails";
import AdminWorkerUserPresenter from "./js/presenters/adminWorkerUserPresenter";
import NavigationSignup from "./js/presenters/navigationSignup";
import NavigationLogin from "./js/presenters/navigationLogin";
import NavigationLogout from "./js/presenters/navigationLogout";
import PersonalApplicationsList from "./js/presenters/personalApplicationsList";


import './App.css';


const goToHomePageHref = "#home";
const userPersonalApplicationsHref = "#personalList";
const goToUserViewHref =  "#userView";
const goToUserView = () => window.location.hash = "userView";
const goToApplicationDetails = () => window.location.hash = "applicationDetails";
const goToPersonalApplications = () => window.location.hash = "personalList";

/**
 * 
 * @param {*} param0 
 * @returns div of the specified views according to the entered hash. 
 */
function App({userModel, serviceModel}) {
  return (
    <div className="App">
      <Navigation userModel={userModel} serviceModel={serviceModel}>
        <NavigationLogin userModel={userModel}/>
        <NavigationSignup userModel={userModel}/>
        <NavigationLogout userModel={userModel} goToHomePageHref={goToHomePageHref} goToUserProfileHref={userPersonalApplicationsHref} goToUserViewHref={goToUserViewHref} />
      </Navigation>
      <ShowView hash="#home">
        <div>
          <Homepage />
        </div>
      </ShowView>

      <ShowView hash="#userView">
        <div>
         <AdminWorkerUserPresenter userModel={userModel} serviceModel={serviceModel} navToApplicationDetails ={goToApplicationDetails}/>
        </div>
      </ShowView>

      <ShowView hash="#applicationDetails">
        <div>
           <ChosenApplicationDetails userModel={userModel} serviceModel={serviceModel} navToApplicationsList={goToUserView} navToPersonalApplicationsList={goToPersonalApplications} />
        </div>
      </ShowView>

      <ShowView hash="#personalList">
        <div>
           <PersonalApplicationsList userModel={userModel} serviceModel={serviceModel} navToApplicationDetails ={goToApplicationDetails} />
        </div>
      </ShowView>
      
    </div>
  );
}


/**
 * when the route isn't one of the hashes listed in the if statement, or if the hash changed to uneligiable hash, 
 * the defaultRoute() will change it back to #home
 */
function defaultRoute() {
  if (!["#home", "#applicationDetails","#userView", "#personalList", ].find(knownRoute =>
    knownRoute === window.location.hash))
    window.location.hash = "#home";
}

defaultRoute();
window.addEventListener("hashchange", defaultRoute);

export default App;
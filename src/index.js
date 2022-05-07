import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserModel from "./js/UserModel";
import ServiceModel from "./js/ServiceModel";
import 'bootstrap/dist/css/bootstrap.min.css';


const userModel = new UserModel();
const serviceModel = new ServiceModel();

ReactDOM.render(<App userModel={userModel} serviceModel={serviceModel} />, document.getElementById("app"));



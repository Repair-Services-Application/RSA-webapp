# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project is for the Repair-Services-Application under the same organisation.

## Used tools
The following tools are used to accomplish the goal of this project:
- Code and Version control (Git / Github desktop).
- JavaScript runtime environment (Node.js).
- Project and package management (npm). 
- Automatic server restart if any changes occurs on the project files (React-scripts).
- Code editor (Visual Studio Code).

## Frameworks

The frameworks were used in the project:
- bootstrap
- react
- react-bootstrap
- react-bootstrap-icons
- react-cookie-consent
- react-datepicker
- react-dom
- react-scripts
- react-toastify
- web-vitals


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
The server runs on [http://localhost:3000](http://localhost:3000) locally, open the link to view the project in your browser.

The page will reload when you make changes.\
There are possibility to see eslint errors in the console. 

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.



### Deployment to Cloud

To deploy the project on an online hosting cloud, follow the steps below:

1. Create a free account on Heroku's cloud platform (If you don't have one already) [here](https://heroku.com/).
2. Install the latest version of this project `RSA-webapp` on your machine.
3. Install the Heroku CLI from [here](https://devcenter.heroku.com/articles/heroku-cli).
4. Login to your Heroku account using the command `heroku login`.
5. A new browser window will open to login to your account.
6. Go to the installed project path (`RSA-webapp` instance that has been downloaded earlier in step 2).
7. Create a Git init folder (Initialization) using `git init`.
8. Delete the .gitignore file or modify it, so it let uploading the .env file
9. The file ".env" should be included in the repository.
10. modify the `apiConfig.js` file and fill it with the required data (VERY IMPORTANT TO FILL IT WITH THE CORRECT DATA).
11. Configure the git configuration using the commands: `git config user.email "email"`,  `git config user.name "name"` where email and name are the heroku account owner's name and email.
12. Add the git files to the Git repository using `git add .` .
13. Commit the changes to the Github repository using `git commit -m "commit message here"`.
14. Push the changes to the created project using the command `git push heroku master`.
15. Create a Heroku project usign the command `heroku create --region eu --buildpack mars/create-react-app`.
16. The creation process may take some time. 
17. Once the deployment is done, a link of the deployed project will be included in the shell.
18. The logs and status of the created project can be viewed using the command `heroku logs -n 200`

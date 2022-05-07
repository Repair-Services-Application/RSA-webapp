import { Table, Button } from "react-bootstrap";


const PersonalApplicationsView = ({ applicationsList, showApplicationDetails, navToApplicationDetails }) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Application ID:</th>
          <th>Category Description</th>
          <th>Date of registration</th>
          <th>Time of registration</th>
        </tr>
      </thead>
      <tbody>

        {
          applicationsList.map(ApplicationDetails =>
            <tr key={ApplicationDetails.applicationId}>
              <td>
              {ApplicationDetails.applicationId}
              </td>
              <td>
              {ApplicationDetails.categoryDescription}
              </td>
              <td>
              {ApplicationDetails.dateOfRegistration}
              </td>
              <td>
              {ApplicationDetails.timeOfRegistration}
              </td>
              <td><Button onClick={(e) => {
                e.preventDefault();
                showApplicationDetails(ApplicationDetails.applicationId);
                navToApplicationDetails();
              }} variant="outline-dark" >Show</Button>
              </td>
            </tr>
          )
        }
        


      </tbody>
    </Table>
);
export default PersonalApplicationsView;

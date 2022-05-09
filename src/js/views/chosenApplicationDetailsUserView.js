import { Button, CardDeck, Card, InputGroup, Form, Row, Col } from "react-bootstrap";


const ChosenApplicationDetailsUserView = ({ applicationData, approvalAvailableValues, setApprovalValue, makeChanges, navToApplicationsList }) => (
  <div className="applicationDetailsDiv">
    <CardDeck className="p-2 d-flex flex-wrap justify-content-center m-3" >


      <Card className="p-2 radiusDimensions borderlessTD">

        <h1 className="textCenter p-2"> Submitted Application:</h1>

        <Row className="p-2 d-flex align-items-center">
          <Col>
            <strong>First Name: </strong>
            {applicationData.firstname}
          </Col>
          <Col >
            <strong>Last Name: </strong>
            {applicationData.lastname}
          </Col>
        </Row>
        <Row className="p-2">
          <Col>
            <strong>Category: </strong>
            {applicationData.categoryDescription}
          </Col>
          <Col>
            <strong>Application ID: </strong>
            {applicationData.applicationId}
          </Col>
        </Row>
        <Row className="p-2">
          <Col>
            <strong>Date of registration: </strong>
            {applicationData.dateOfRegistration}
          </Col>
          <Col>
            <strong>Time of registration: </strong>
            {applicationData.timeOfRegistration}
          </Col>
        </Row>
        <Row className="p-2">
          <Col>
            <strong>Suggested Price: </strong>
            {applicationData.suggestedPriceByWorker}
          </Col>
          <Col>
            <strong>Reparation Status: </strong>
            {applicationData.reparationStatusDescription}
          </Col>
        </Row>
        <Row className="p-2">
          <Col>
            <strong>User's price approval: </strong>
            {applicationData.priceApprovalByUser}
          </Col>
        </Row>
        <Row className="p-2">
          <Col>
            <strong>Problem Description: </strong>
            {applicationData.problemDescription}
          </Col>
        </Row>
        <Row>

          <div className="justify-content-center p-2">
            <Col>
              <InputGroup.Append className=" btnSize ">

                <Form.Label className="p-2"><strong>Approval Descision : </strong></Form.Label>
                <Form.Control className="" size="md" as="select" onChange={(e) => setApprovalValue(e.target.value)} required>
                  <option value="default" hidden>Not defined</option>
                  {approvalAvailableValues.map((approvalValue, i) => (
                    <option key={i} value={i} >{approvalValue}</option>
                  ))}
                </Form.Control>
              </InputGroup.Append>
            </Col>

          </div>
          <Col>
            <Button id="makeDecisionButton" className="mr-2 btnSize p-2 " variant="outline-dark"
              onClick={(e) => {
                e.preventDefault();
                makeChanges();
                navToApplicationsList();
              }
              }>Submit the Decision</Button>

            <Button id="cancelButton" className="mr-2 btnSize p-2 " variant="outline-dark"
              onClick={(e) => {
                e.preventDefault();
                navToApplicationsList();
              }
              }>Cancel</Button>
          </Col>
        </Row>


      </Card>
    </CardDeck>
  </div >
);
export default ChosenApplicationDetailsUserView;
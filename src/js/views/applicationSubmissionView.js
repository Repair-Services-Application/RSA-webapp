import { Button, Form, InputGroup, Card, CardDeck, Container, Row, Col } from "react-bootstrap";

const ApplicationSubmissionView = ({ categories, setCategoryId, setProblemDescription, submitApplicationText, submitApplication}) => (
  <div>
    <Container>
        <Card className="p-2 radiusDimensions borderlessTD">

          <Row className="justify-content-md-center mt-3">
            <h1 className="textCenter"> Repairment Service Form</h1>
          </Row>
          <InputGroup className="groupInputDisplayFix">

            <InputGroup.Append className="groupInputDisplayFix p-3">
              <Row>
                <Col>
                <Container>
                    <Form.Label>Choose category: </Form.Label>
                    <Form.Control className="btnSize mr-2" size="md" as="select" onChange={(e) => setCategoryId(e.target.value)} required>
                      <option value="category" hidden> product's category type</option>
                      {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId} >{category.description}</option>
                      ))}
                    </Form.Control>
                    </Container>
                </Col>
                <Col>
                <Container>
                    <Form.Label>Problem description: </Form.Label>
                    <textarea className="form-control" onChange={e => setProblemDescription(e.target.value)}></textarea>
                    </Container>
                </Col>
              </Row>
              
            </InputGroup.Append>
            <Button size="lg" className="mr-2 my-2" variant="outline-dark" onClick={(e) => { submitApplication();e.preventDefault();}}>
              {submitApplicationText}
            </Button>
          </InputGroup>
        </Card>
    </Container>
  </div >
);

export default ApplicationSubmissionView;

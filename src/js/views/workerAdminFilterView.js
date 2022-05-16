import { Button, Card, Form, InputGroup, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WorkerAdminFilterView = ({ setApplicationId, categories, setCategoryRelationId, setFirstname, setLastname,
  dateOfRegistrationFrom, setDateOfRegistrationFrom, dateOfRegistrationTo, setDateOfRegistrationTo, 
  setSuggestedPriceFrom, setSuggestedPriceTo, reparationStatuses, setReparationStatusId, handleAppliedFilter }) => (
  <Card className="p-1">
    <Form className="filter d-flex justify-content-center">
        <InputGroup className="d-flex justify-content-center">
          <InputGroup.Append className="">
            <Row>
              <Col>
                <Form.Group controlId="formBasicName" className="p-1">
                  <Form.Label>Application ID</Form.Label>
                  <Form.Control onChange={e => setApplicationId(e.target.value)} type="text" placeholder="ex: 1" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicCategories" className=" p-1">
                  <Form.Label>Categories:</Form.Label>
                  <Form.Control size="md" as="select" onChange={(e) => setCategoryRelationId(e.target.value)}>
                    <option value="0"> Any competence </option>
                    {categories.map(category => (
                        <option key={category.categoryRelationId} value={category.categoryRelationId} >{category.categoryDescription}</option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicName" className="p-1">
                  <Form.Label>First name</Form.Label>
                  <Form.Control onChange={e => setFirstname(e.target.value)} type="text" placeholder="ex: Alex (Case sensitive)" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicName" className="p-1">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control onChange={e => setLastname(e.target.value)} type="text" placeholder="ex: Johnsson (Case sensitive)" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicFromDate">
                  <Form.Label>From:</Form.Label>
                  <DatePicker className=" p-2"
                    selected={dateOfRegistrationFrom}
                    onChange={(date) => setDateOfRegistrationFrom(date)}
                    selectsStart
                    startDate={dateOfRegistrationFrom}
                    endDate={dateOfRegistrationTo}
                    dateFormat={'yyyy-MM-dd'}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicToDate">
                  <Form.Label>To: </Form.Label>
                  <DatePicker className=" p-2"
                    selected={dateOfRegistrationTo}
                    onChange={(date) => setDateOfRegistrationTo(date)}
                    selectsEnd
                    startDate={dateOfRegistrationFrom}
                    endDate={dateOfRegistrationTo}
                    minDate={dateOfRegistrationFrom}
                    dateFormat={'yyyy-MM-dd'}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicName" className="p-1">
                  <Form.Label>Suggested price from:</Form.Label>
                  <Form.Control onChange={e => setSuggestedPriceFrom(e.target.value)} type="text" placeholder="ex: 1" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicName" className="p-1">
                  <Form.Label>Suggested price to:</Form.Label>
                  <Form.Control onChange={e => setSuggestedPriceTo(e.target.value)} type="text" placeholder="ex: 1" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicCategories" className=" p-1">
                  <Form.Label>Reparation status:</Form.Label>
                  <Form.Control size="md" as="select" onChange={(e) => setReparationStatusId(e.target.value)}>
                    <option value="0"> Any reparation status </option>
                    {reparationStatuses.map(reparationStatus => (
                      <option key={reparationStatus.reparationStatusId} value={reparationStatus.reparationStatusId} >{reparationStatus.reparationStatusDescription}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

            </Row>

            <Col>
              <Form.Group className="p-4">

                <Button className="mr-2 my-1" variant="outline-dark" type="button" size="md" onClick={(e) => { handleAppliedFilter(); e.preventDefault(); }}>
                  Filter Applications
                </Button>
              </Form.Group>
            </Col>
          </InputGroup.Append>
        </InputGroup>
    </Form>
  </Card>
);

export default WorkerAdminFilterView;

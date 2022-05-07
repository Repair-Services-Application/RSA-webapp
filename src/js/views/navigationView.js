import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { HouseFill } from "react-bootstrap-icons"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const NavigationView = ({ component, toggleState, setToggleState, handleClose }) =>
  <Navbar expand="sm" bg="dark" variant="dark">
    <Navbar.Brand onClick={(e) => handleClose()}  href="#home">
      <Row>
        <Col className="pl-3">
          <p className="font-weight-bold pl-0">RepairmentServiceApp</p>
        </Col>
      </Row>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={(e) => setToggleState()} />
    <Navbar.Collapse in={toggleState} id="responsive-navbar-nav" onClick={(e) => handleClose()}>
      <Nav className="ml-auto">
        <Nav.Link href="#home" className="navButton pr-3 pl-3" >
          <HouseFill className="houseFill" /> Home</Nav.Link>
        {component}
      </Nav>
    </Navbar.Collapse>
    <ToastContainer />
  </Navbar>
  ;

export default NavigationView;
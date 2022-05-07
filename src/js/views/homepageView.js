import {Container, Row, Col, Card} from "react-bootstrap";


const HomepageView = ()=>
  <Container className="mt-fix">
    <Card className="shadow p-3 mb-5 bg-white roundedBoxBorder">
      <Row>
            <div className="textAlignJustify p-5">
              <h1 data-testid="titleTextElement" className="pt-4 color-text-blue darken-4 font-weight-bolder ">Repairment Application</h1>
              <h5 data-testid="welcomeTextElement" className="pt-2 pb-3">Welcome to the Repairment WebApp</h5>
                
              <h6 className="mt-4 color-text-red font-weight-bold">What is Repairment Service WebApp?</h6>
              <p className="mr-5">
                Repairment Service WebApp is a website were customers can submit applications for a repairment service. 
                The service covers a wide range of products repairment, which are listed under different categories.
              </p>

              <h6 className="mt-4 color-text-red font-weight-bold">How to use ?</h6>
              <p className="mr-5 mb-4">
                First create an account or login to your existing account. 
                Once you are logged in, you will be able to submit your repairment application.
                Your application will be processed later by our staff.
              </p>
            </div>
      </Row>
    </Card>
  </Container>
;

export default HomepageView;
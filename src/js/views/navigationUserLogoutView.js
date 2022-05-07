import { Nav } from "react-bootstrap";

const NavigationUserLogoutView = ({ username, handleLogout, navHomePageHref, navUserProfileHref, navToSubmitApplicationHref }) =>
    <>
        <Nav.Link className="navButton pr-3 pl-3" href={navUserProfileHref}>{username}</Nav.Link>
        <Nav.Link className="navButton pr-3 pl-3" href={navToSubmitApplicationHref}>Submit Application</Nav.Link>
        <Nav.Link className="navButton pr-3 pl-3" href={navHomePageHref} onClick={(e) => { handleLogout(); }}>Logout</Nav.Link>
    </>;

export default NavigationUserLogoutView;
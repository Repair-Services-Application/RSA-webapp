import { Nav } from "react-bootstrap";

const NavigationAdminWorkerLogoutView = ({ username, handleLogout, navHomePageHref, navFilteringApplicationsHref}) =>
    <>
        <Nav.Link className="navButton pr-3 pl-3" href={navFilteringApplicationsHref}>{username}</Nav.Link>
        <Nav.Link className="navButton pr-3 pl-3" href={navHomePageHref} onClick={(e) => { handleLogout(); }}>Logout</Nav.Link>
    </>;

export default NavigationAdminWorkerLogoutView;
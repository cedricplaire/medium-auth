import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavLink, NavItem, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faHome,
  faFileAlt,
  faUserTag,
  faUserTie,
  faUserCheck,
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';

function NavBar({ showModeratorBoard, showAdminBoard, currentUser, logOut }) {
  return (
    <div>
      <Navbar sticky="top" expand="md" bg="dark" variant="dark">
        <Navbar.Brand to="/">IWantCode</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to={"/home"}>Home <FontAwesomeIcon icon={faHome} /></Nav.Link>
            <Dropdown as={NavItem} id="collasible-dropdown">
              <Dropdown.Toggle as={NavLink} variant="light">
                Dashboard <FontAwesomeIcon icon={faChartLine}/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {currentUser && <Dropdown.Item as={Link} to={"/users/user"}>User Board <FontAwesomeIcon icon={faUser} /></Dropdown.Item>}
                {showModeratorBoard && (
                  <Dropdown.Item as={Link} to={"/users/mod"}>Moderator Board <FontAwesomeIcon icon={faUserTag} /></Dropdown.Item>
                )}
                {showAdminBoard && (
                  <Dropdown.Item as={Link} to={"/users/admin"}>Admin Board <FontAwesomeIcon icon={faUserTie} /></Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>

          <Nav className="ml-auto mr-auto">
            <Navbar.Text>Tutorials <FontAwesomeIcon icon={faFileAlt} /></Navbar.Text>
            <Nav.Link as={Link} to="/tutorials">List</Nav.Link>
            <Nav.Link as={Link} to="/tutorials/add">Add</Nav.Link>
          </Nav>

          <Nav className="users-nav ml-auto mr-2">
            <Dropdown
              as={NavItem}
              id="collasible-dropdown"
              className="dropdown-users mr-3"
            >
              <Dropdown.Toggle as={NavLink}>
                User <FontAwesomeIcon icon={faUserCircle}/>
              </Dropdown.Toggle>
              <Dropdown.Menu className="nav-menu-users mr-3">
                {currentUser ? (
                  <div>
                    <Dropdown.Item as={Link} to="/profile">
                      <FontAwesomeIcon icon={faUserCheck} /> Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/" onClick={logOut}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Dropdown.Item>
                  </div>
                ) : (
                  <div>
                    <Dropdown.Item as={Link} to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/signup"><FontAwesomeIcon icon={faUserPlus} /> Register</Dropdown.Item>
                  </div>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;

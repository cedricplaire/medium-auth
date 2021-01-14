import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from 'react-bootstrap';
import AuthService from "./services/auth.service";

import NavBar from './components/navigation/NavBar';
import SideBar from './components/navigation/SideBar';
import LoginRegister from "./components/auth/Login-Register";
import Home from "./components/Home";
import BoardUser from "./components/dashboard/BoardUser";
import BoardModerator from "./components/dashboard/BoardModerator";
import BoardAdmin from "./components/dashboard/BoardAdmin";

// tutorial components
import AddTutorial from "./components/tutorial/AddTutorial";
import TutorialEdit from "./components/tutorial/TutorialEdit";
import Tutorial from "./components/tutorial/Tutorial";
import TutorialsList from "./components/tutorial/TutorialsList";
// users components
import UserEdit from "./components/user/UserEdit";
import UserList from "./components/user/UserList";
import Profile from "./components/user/Profile";
import ProfilEdit from "./components/user/ProfilEdit";

const App = () => {	
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    window.history.pushState("logout redirect", "/home");
  };

  return (
    <div className="global-wrapper">
      <div
        className="sidebar-wrapper"
      >
        <SideBar
          navbarBS={false}
          className="side-bar"
          vertical="md"
          logOut={logOut}
        />
      </div>
      <div className="content-wrapper">
        <NavBar
          showModeratorBoard={showModeratorBoard}
          showAdminBoard={showAdminBoard} 
          currentUser={currentUser}
          logOut={logOut}
        />
        <Container className="mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path={["/login", "/signup"]}><LoginRegister /></Route>
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/:id/edit" component={ProfilEdit} />
            <Route path="/users/mod" component={BoardModerator} />
            <Route path="/users/admin" component={BoardAdmin} />
            <Route path="/users/edit/:id"><UserEdit /></Route>
            <Route path="/users/delete/:id" component={BoardAdmin} />
            <Route path="/users/user" component={BoardUser} />
            <Route exact path="/userslist"><UserList /></Route>
            <Route exact path={["/tutorials", "/tutorials/list"]} component={TutorialsList} />
            <Route path="/tutorials/add" component={AddTutorial} />
            <Route path="/tutorials/edit/:id"><TutorialEdit /></Route>
            <Route path="/tutorials/:id"><Tutorial /></Route>
          </Switch>
        </Container>
      </div>
    </div>
  );
};

export default App;

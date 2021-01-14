import React, { useState, useEffect } from "react";
import UserDataService from "../../services/user.service";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Search from "../Search";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const location = useLocation();

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveUsers = () => {
    UserDataService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const findUserByName = (event) => {
    event.preventDefault();
    UserDataService.findByName(searchName)
      .then((response) => {
        setUsers(response.data);
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs="12" md="8">
          <Search
            value={searchName}
            onChange={onChangeSearchName}
            onSubmit={findUserByName}
          >
            Search
          </Search>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <h4>Users List</h4>
          <ListGroup className="mb-2">
            {users &&
              users.map((user, index) => (
                <ListGroup.Item
                  active={index === currentIndex}
                  onClick={() => setActiveUser(user, index)}
                  key={user.id}
                >
                  {user.username}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col xs={12} md={8}>
          {currentUser ? (
            <div className="w-100">
              <h4 className="text-center text-secondary">User informations</h4>
              <div className="inline-flex">
                <label style={{ with: "30%" }}>
                  <strong className="mr-1 text-secondary">Username: </strong>
                  {currentUser.username}
                </label>
              </div>
              <div className="inline-flex">
                <label>
                  <strong className="mr-1 text-secondary">EMail: </strong>
                  {currentUser.email}
                </label>
              </div>
              <div className="inline-flex">
                <label>
                  <strong className="mr-1 text-secondary">Registered At: </strong>
                  {moment(currentUser.createdAt).format('DD-MMMM-YYYY')}
                </label>
              </div>
              <div className="inline-flex">
                <label>
                  <strong className="mr-1 text-secondary">Modified At: </strong>
                  {moment(currentUser.updatedAt).format('DD-MMMM-YYYY')}
                </label>
              </div>
              <div className="inline-flex">
                <label className="w-25">
                  <strong className="mr-1 text-secondary">Authorities: </strong>
                </label>
                <ListGroup className="w-75">
                  {currentUser.roles &&
                    currentUser.roles.map((role, index) => (
                      <ListGroupItem key={index}>{role}</ListGroupItem>
                    ))}
                </ListGroup>
              </div>
              <div
                style={{borderBottom: "1px solid #999", width: "75%"}}
                className="my-2"
              ></div>
              <Form.Group as={Row}>
                <Form.Label column sm={3}>
                  Actions :
                </Form.Label>
                <Col sm={9}>
                  {location.pathname === '/users/admin/listusers' ? (
                    <Link
                      to={"/users/admin/edituser/" + currentUser.id}
                      className="btn btn-danger"  
                    >
                      Edit
                    </Link>
                  ) : (
                    <Link
                      to={"/users/edit/" + currentUser.id}
                      className="btn btn-danger"
                    >
                      Edit
                    </Link>
                  )}
                </Col>
              </Form.Group>
            </div>
          ) : (
            <div>
              <br />
              <h5>Please select a User...</h5>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;

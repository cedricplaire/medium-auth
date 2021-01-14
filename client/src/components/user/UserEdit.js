import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserDataService from "../../services/user.service";
import { 
  Container,
  Form,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

const UserEdit = (props) => {
  const initialUserState = {
      id: null,
      username: "",
      email: "",
      public: null,
      roles: [],
      accessToken: ""
  }

  const params = useParams();
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = (id) => {
    UserDataService.getUser(id)
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(params.id);
  }, [params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleSwitchChange = (event) => {
    const etat = event.target.checked;
    updatePublicState(etat);
  };

  const updatePublicState = (status) => {
    var data = {
      id: currentUser.id,
      username: currentUser.username,
      email: currentUser.email,
      public: status,
      roles: currentUser.roles,
      accessToken: currentUser.accessToken,
    };

    UserDataService.updateUser(currentUser.id, data)
      .then((response) => {
        setCurrentUser({ ...currentUser, public: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
      setMessage("Public state was changed successfully");
  };

  const updateCurrentUser = () => {
    UserDataService.updateUser(currentUser.id, currentUser)
      .then((response) => {
        console.log(response.data);
        setMessage("The User was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col sm={12} md={10}>
                {message ? (<h4 className="text-center">{message}</h4>) 
                : (<h4 className="text-center">Edit User</h4>)}
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3} htmlFor="username">
                            Username
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                            type="text"
                            id="username"
                            required
                            value={currentUser.username}
                            onChange={handleInputChange}
                            name="username"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={3} htmlFor="email">
                            Email
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                            type="text"
                            id="email"
                            required
                            value={currentUser.email}
                            onChange={handleInputChange}
                            name="email"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={3} htmlFor="public">
                            Public state :
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Check
                                type="switch"
                                id="public"
                                label={
                                    currentUser.public ? "Public" : "Private"
                                }
                                checked={currentUser.public}
                                onChange={handleSwitchChange}
                                name="public"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm={3} htmlFor="public">
                            Authorities :
                        </Form.Label>
                      <ListGroup>
                        {currentUser.roles.map((role) => (
                          <ListGroupItem>
                            {role}
                          </ListGroupItem>
                        ))}
                      </ListGroup>
                    </Form.Group>
                </Form>
                <Form.Group className="text-center">
                    <Button
                        type="submit"
                        className="btn btn-success mr-2"
                        onClick={updateCurrentUser}
                    >
                        Update
                    </Button>

                    <Link
                        className="btn btn-primary"
                        to="/userslist"
                    >
                        Cancel
                    </Link>
              </Form.Group>
            </Col>
        </Row>
    </Container>
  )
}

export default UserEdit;
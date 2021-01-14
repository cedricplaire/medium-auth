import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import TutorialDataService from "../../services/tutorial.service";
import AuthService from "../../services/auth.service";

const TutorialEdit = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    content: "",
    published: false,
    author: "",
  };
  const params = useParams();
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();

  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(params.id);
  }, [params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const handleSwitchChange = (event) => {
    const etat = event.target.checked;
    updatePublished(etat);
  };

  const updatePublished = (status) => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      content: currentTutorial.content,
      published: status,
      author: currentTutorial.author,
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then((response) => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then((response) => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={10}>
          {currentTutorial ? (
            <div>
              <div className="text-center">
                <h3 className="text-primary">Tutorial Edition</h3>
                {message && <p>{message}</p>}
              </div>
              <Form>
                <Form.Group as={Row}>
                  <Form.Label column sm={3} htmlFor="author">Author</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      id="author"
                      readOnly
                      value={currentUser.username}
                      name="author"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={3} htmlFor="title">
                    Title
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      id="title"
                      required
                      value={currentTutorial.title}
                      onChange={handleInputChange}
                      name="title"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={3} htmlFor="description">
                    Description
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      id="description"
                      required
                      value={currentTutorial.description}
                      onChange={handleInputChange}
                      name="description"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={3} htmlFor="content">
                    Content
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      as="textarea"
                      placeholder="Type your content here ..."
                      rows="8"
                      id="content"
                      required
                      value={currentTutorial.content}
                      onChange={handleInputChange}
                      name="content"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label column sm={3} htmlFor="published">
                    Tutorial published state :
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Check
                      type="switch"
                      id="published"
                      label={
                        currentTutorial.published ? "Published" : "Pending"
                      }
                      checked={currentTutorial.published}
                      onChange={handleSwitchChange}
                      name="published"
                    />
                  </Col>
                </Form.Group>
              </Form>

              <Form.Group className="text-center">
                <Button
                  type="submit"
                  className="btn btn-success mr-2"
                  onClick={updateTutorial}
                >
                  Update
                </Button>
                <Link to="/tutorials/" className="btn btn-success">
                  Back to list
                </Link>

                <Button
                  className="btn btn-danger ml-2"
                  onClick={deleteTutorial}
                >
                  Delete
                </Button>
              </Form.Group>
            </div>
          ) : (
            <Form.Group className="text-center">
              <br />
              <p>Oup's, Please go back to the list and try again...</p>
              <Link
                to={"/tutorials/"}
                className="btn btn-success"
              >
                Back to list
              </Link>
            </Form.Group>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TutorialEdit;

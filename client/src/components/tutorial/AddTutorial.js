import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import TutorialDataService from "../../services/tutorial.service";
import AuthService from "../../services/auth.service";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    content: "",
    published: false,
    author: null,
  };
  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    tutorial.author = currentUser.id;
  }, [tutorial, currentUser]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const handleSwitchChange = event => {
    const etat = event.target.checked;
    setTutorial({ ...tutorial, published: etat });
  }

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
      content: tutorial.content,
      published: tutorial.published,
      author: tutorial.author,
    };

    TutorialDataService.create(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          content: response.data.content,
          published: response.data.published,
          author: response.data.author,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={10} lg={8}>
          {submitted ? (
            <Form.Group className="text-center">
              <h4>You submitted successfully!</h4>
              <Button variant="success" onClick={newTutorial}>
                Create New
              </Button>
              <Link
                to={"/tutorials/"}
                className="btn btn-success ml-2"
              >
                Back to list
              </Link>
            </Form.Group>
          ) : (
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
                <Form.Label column sm={3} htmlFor="title">Title</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    id="title"
                    required
                    value={tutorial.title}
                    onChange={handleInputChange}
                    name="title"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3} htmlFor="description">Description</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    id="description"
                    required
                    value={tutorial.description}
                    onChange={handleInputChange}
                    name="description"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3} htmlFor="content">Content</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as="textarea"
                    placeholder="Type your content here ..."
                    rows="8"
                    id="content"
                    required
                    value={tutorial.content}
                    onChange={handleInputChange}
                    name="content"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm={3} htmlFor="content">Published state</Form.Label>
                <Col sm={9}>
                  <Form.Check
                    type="switch"
                    id="published"
                    label={tutorial.published ? "Published" : "Pending"}
                    checked={tutorial.published}
                    onChange={handleSwitchChange}
                    name="published"
                  />
                </Col>
              </Form.Group>

              <Form.Group className="text-center">
                <Button onClick={saveTutorial} variant="success">
                  Save All
                </Button>
                <Link
                  to={"/tutorials/add"}
                  className="btn btn-success ml-2"
                  onClick={saveTutorial}
                >
                  {"Save & New"}
                </Link>
              </Form.Group>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AddTutorial;
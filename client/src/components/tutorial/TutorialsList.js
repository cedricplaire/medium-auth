import React, { useState, useEffect } from "react";
import TutorialDataService from "../../services/tutorial.service";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Form,
} from 'react-bootstrap';
import Search from '../Search';

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then(response => {
        setTutorials(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = (event) => {
    event.preventDefault();
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs="12" md="8">
          <Search
            value={searchTitle}
            onChange= {onChangeSearchTitle}
            onSubmit={findByTitle}
          >
            Search
          </Search>
        </Col>
      </Row>
      <Row>
        <Col xs="12" md="4">
          <h4>Tutorials List</h4>

            <ListGroup className="mb-2">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <ListGroup.Item
                  active={index === currentIndex}
                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </ListGroup.Item>
              ))}
          </ListGroup>

          <Button
            variant="danger"
            onClick={removeAllTutorials}
          >
            Remove All
          </Button>
        </Col>
        <Col xs="12" md="8">
        {currentTutorial ? (
          <div>
            <h4>Tutorial {currentTutorial._id}</h4>
            <div>
              <label>
                <strong>Title:</strong>
              {currentTutorial.title}
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              {currentTutorial.description}
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Created At</strong>
              {currentTutorial.createdAt}
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Modified At</strong>
              {currentTutorial.modifiedAt}
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              {currentTutorial.published ? "Published" : "Pending"}
              </label>{" "}
            </div>

            <Form.Group className="text-center my-2">
              <span className="form-text">Actions for this tutorial</span>
              <Link
                to={"/tutorials/" + currentTutorial._id}
                className="btn btn-primary mr-2"
              >
                Read
              </Link>
              <Link
                to={"/tutorials/edit/" + currentTutorial._id}
                className="btn btn-danger"
              >
                Edit
              </Link>
            </Form.Group>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a Tutorial...</p>
          </div>
        )}
        </Col>
      </Row>
    </Container>
  );
};

export default TutorialsList;

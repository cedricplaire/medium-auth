import React, { useState, useEffect } from 'react';
import UserMessageDataService from "../../services/message.service";
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

function MessageList() {
  const [userMessages, setUserMessages] = useState([]);
  const [currentUserMessage, setCurrentUserMessage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveUserMessages();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveUserMessages = () => {
    UserMessageDataService.getAll()
      .then(response => {
        setUserMessages(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUserMessages();
    setCurrentUserMessage(null);
    setCurrentIndex(-1);
  };

  const setActiveUserMessage = (UserMessage, index) => {
    setCurrentUserMessage(UserMessage);
    setCurrentIndex(index);
  };

  const removeAllUserMessages = () => {
    UserMessageDataService.removeAll()
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
    UserMessageDataService.findByTitle(searchTitle)
      .then(response => {
        setUserMessages(response.data);
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
          <h4>userMessage List</h4>

            <ListGroup className="mb-2">
            {userMessages &&
              userMessages.map((userMessage, index) => (
                <ListGroup.Item
                  active={index === currentIndex}
                  onClick={() => setActiveUserMessage(userMessage, index)}
                  key={index}
                >
                  {userMessage.title}
                </ListGroup.Item>
              ))}
          </ListGroup>

          <Button
            variant="danger"
            onClick={removeAllUserMessages}
          >
            Remove All
          </Button>
        </Col>
        <Col xs="12" md="8">
        {currentUserMessage ? (
          <div>
            <h4>UserMessage {currentUserMessage._id}</h4>
            <div>
              <label>
                <strong>Title:</strong>
              {currentUserMessage.title}
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              {currentUserMessage.description}
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Created At</strong>
              {currentUserMessage.createdAt}
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Modified At</strong>
              {currentUserMessage.modifiedAt}
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              {currentUserMessage.published ? "Published" : "Pending"}
              </label>{" "}
            </div>

            <Form.Group className="text-center my-2">
              <span className="form-text">Actions for this messagee</span>
              <Link
                to={"/message/" + currentUserMessage._id}
                className="btn btn-primary mr-2"
              >
                Read
              </Link>
              <Link
                to={"/message/edit/" + currentUserMessage._id}
                className="btn btn-danger"
              >
                Edit
              </Link>
            </Form.Group>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a Message...</p>
          </div>
        )}
        </Col>
      </Row>
    </Container>
    )
}

export default MessageList

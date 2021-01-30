import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import uuid from 'uuid/dist/v4';
import moment from 'moment';
import { ListGroup, Container, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import UserService from "../services/user.service";
import "./home.css";

const Home = () => {
  const [content, setContent] = useState([]);
  const [items, setItems] = useState([
    { id: uuid(), text: 'Buy eggs' },
    { id: uuid(), text: 'Pay bills' },
    { id: uuid(), text: 'Invite friends over' },
    { id: uuid(), text: 'Fix the TV' },
  ]);

  const handleAdd = () => {
    const text = prompt("enter text item");
    if (text) {
      setItems(items => [
        ...items,
        { id: uuid(), text },
      ]);
    }
  }

  const handleRemove = (id) => {
    console.log(id);

    let newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <Container style={{ marginTop: '2rem' }}>
      <header className="jumbotron">
        <h3>Welcome to IWantCode.</h3>
      </header>
      {content && content.map((elem) => (
        <div key={elem.title} className="d-flex flex-column my-2">
          <div
            className="d-inline-flex"
            style={{alignItems: "center"}}
          >
            <h3 className="mr-2">
              {elem.title}
            </h3>
            <Image
              style={{maxWidth: "80px"}}
              alt="picture tutorial" 
              src={elem.picture ? (
                `/${elem.picture}`
              ) : (
                `/picture.png`
              )}
            />
          </div>
          <div
            className="d-flex flex-column"
            style={{height: "42px"}}
          >
            <span>
              Created At : <FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />
              {moment(elem.createdAt).format("ddd, DDD MMMM YYYY HH:mm")}
            </span>
            <span>
              Updated At : <FontAwesomeIcon className="mr-2" icon={faCalendarAlt} />
              {moment(elem.updatedAt).format("ddd, DDD MMMM YYYY HH:mm")}
            </span>
          </div>
        </div>
      ))}
      <ListGroup style={{ marginBottom: '1rem' }}>
        <TransitionGroup className="todo-list">
          {items && items.map(({id, text}) => (
            <CSSTransition
              key={id}
              timeout={500}
              classNames="item"
            >
              <ListGroup.Item>
                <Button
                  className="remove-btn"
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemove(id)}
                >
                  &times;
                </Button>
                {text}
              </ListGroup.Item>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
      <Button
        onClick={handleAdd}
      >
        Add Item
      </Button>
    </Container>
  )
};

export default Home;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from 'moment';
import TutorialDataService from "../../services/tutorial.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faInfoCircle,
  faFileAlt,
  faAlignLeft,
  faHeading,
  faUserEdit,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import "./readTuto.css";

const Tutorial = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    content: "",
    published: false,
    createdAt: "",
    updatedAt: "",
    author: null,
  };
  const params = useParams();
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [authorTutorial, setAuthorTutorial] = useState({});

  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        const {id, title, description, content, published, createdAt, updatedAt } = response.data;
        setAuthorTutorial(response.data.author);
        setCurrentTutorial({id, title, description, content, published, createdAt, updatedAt});
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(params.id);
  }, [params.id]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={10} lg={8} className="pt-2">
          {currentTutorial ? (
            <div>
              <h3 className="text-center">{currentTutorial.title}</h3>
              <div className="zonetext">
                <div className="zonetext-icon">
                  <FontAwesomeIcon icon={faHeading} />
                </div>
                <div className="zonetext-text">
                  <div className="zone-info">
                    <div className="zi-date">
                      <FontAwesomeIcon icon={faUserEdit} className="mr-1" />
                      <span className="text-muted mr-1" style={{fontSize: 12}}> Author </span>
                      <Badge variant="primary">
                        {authorTutorial.username}
                      </Badge>
                    </div>
                    <div className="zi-date">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                      <span className="text-muted mr-1" style={{fontSize: 12}}> Created at </span>
                      <Badge variant="primary">
                        {moment(currentTutorial.createdAt).format("DD MMM YYYY HH:mm")}
                      </Badge>
                    </div>
                  </div>

                  <div className="zone-info">
                    <div className="zi-date">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                      <span className="text-muted mr-1" style={{fontSize: 12}}> EMail </span>
                      <Badge variant="primary">
                        {authorTutorial.email}
                      </Badge>
                    </div>
                    <div className="zi-date">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                      <span className="text-muted mr-1" style={{fontSize: 12}}> Modified at </span>
                      <Badge variant="primary">
                        {moment(currentTutorial.updatedAt).format("DD MMM YYYY HH:mm")}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="zonetext">
                <div className="zonetext-icon">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </div>
                <div className="zonetext-text">
                  {currentTutorial.description}
                </div>
              </div>
              <hr />
              <div className="zonetext">
                <div className="zonetext-icon">
                  <FontAwesomeIcon icon={faAlignLeft} />
                </div>
                <div className="zonetext-text">
                  {currentTutorial.content}
                </div>
              </div>
              <hr />
              <Form.Group className="text-center">
                <Link to="/tutorials/" className="btn btn-large btn-outline-primary">
                <FontAwesomeIcon icon={faFileAlt} className="mr-1" />
                  Back to list
                </Link>
              </Form.Group>
            </div>
          ) : (
            <Form.Group className="text-center">
              <br />
              <p>Oup's, go back to the list and select a Tutorial...
                if the problem persist, please contact us.
              </p>
              <Link
                to={"/tutorials/"}
                className="btn btn-success"
              >
                <FontAwesomeIcon icon={faFileAlt} className="mr-1" /> Back to list
              </Link>
            </Form.Group>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Tutorial;

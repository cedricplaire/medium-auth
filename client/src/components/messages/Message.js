import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Row, Col, Badge, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEdit } from "@fortawesome/free-solid-svg-icons";

import AuthService from "../../services/auth.service";
import MessageDataService from "../../services/message.service";

function Message() {
    const initialMessageState = {
        subject: "",
        content: "",
        author: null,
        receiver: null,
    }
    const urlParams = useParams();
    const [message, setMessage] = useState(initialMessageState);

    const retriveMessage = (id) => {
        MessageDataService.findOne(id)
            .then((err, umsg) => {
                setMessage(umsg);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        retriveMessage(urlParams.id);
    })

    return (
      <Row className="justify-content-md-center">
        <Col sm={12} md={10} lg={8} className="pt-2">
          {message ? (
            <div>
              <h3 className="text-center">{message.author}</h3>
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
                        {author.username}
                      </Badge>
                    </div>
                    <div className="zi-date">
                      <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                      <span className="text-muted mr-1" style={{fontSize: 12}}> Created at </span>
                      <Badge variant="primary">
                        {moment(message.createdAt).format("DD-MMMM-YYYY")}
                      </Badge>
                    </div>
                  </div>

                  <div className="zone-info">
                    <div className="zi-date">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
                      <span className="text-muted mr-1" style={{fontSize: 12}}> EMail </span>
                      <Badge variant="primary">
                        {author.email}
                      </Badge>
                    </div>
                    <div className="zi-date">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                      <span className="text-muted mr-1" style={{fontSize: 12}}> Modified at </span>
                      <Badge variant="primary">
                        {moment(message.modifiedAt).format("DD-MMMM-YYYY")}
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
                  {message.description}
                </div>
              </div>
              <hr />
              <div className="zonetext">
                <div className="zonetext-icon">
                  <FontAwesomeIcon icon={faAlignLeft} />
                </div>
                <div className="zonetext-text">
                  {message.content}
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
    )
}

export default Message


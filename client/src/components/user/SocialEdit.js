import React from "react";
import { Accordion, Card, Form, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function SocialEdit({ social, onChange }) {
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="1">
          Social Links
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
        <Card.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="youtube">
                <FontAwesomeIcon icon={faYoutube} /> Youtube
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="youtube"
                  required
                  value={social.youtube}
                  onChange={onChange}
                  name="youtube"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="twitter">
                <FontAwesomeIcon icon={faTwitter} /> Twitter
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="twitter"
                  required
                  value={social.twitter}
                  onChange={onChange}
                  name="twitter"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="facebook">
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="facebook"
                  required
                  value={social.facebook}
                  onChange={onChange}
                  name="facebook"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="github">
                <FontAwesomeIcon icon={faGithub} /> Github
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="github"
                  required
                  value={social.github}
                  onChange={onChange}
                  name="github"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="linkedin">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="linkedin"
                  required
                  value={social.linkedin}
                  onChange={onChange}
                  name="linkedin"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="instagram">
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="instagram"
                  required
                  value={social.instagram}
                  onChange={onChange}
                  name="instagram"
                />
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default SocialEdit;

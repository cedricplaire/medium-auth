import React from "react";
import { Accordion, Card, Form, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRoad,
  faCity,
  faFlag,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";

function AddressEdit({ addressProps }, onChange ) {
  const { street, postalCode, city, country } = addressProps;
  return (
    <Card className="p-0">
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey="2">
          Postal Address
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="2">
        <Card.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="street">
                <FontAwesomeIcon icon={faRoad} /> Street
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="street"
                  required
                  value={street}
                  onChange={onChange}
                  name="street"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="postalcode">
                <FontAwesomeIcon icon={faMailBulk} /> Postal Code
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="postalcode"
                  required
                  value={postalCode}
                  onChange={onChange}
                  name="postalcode"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="city">
                <FontAwesomeIcon icon={faCity} /> City
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="city"
                  required
                  value={city}
                  onChange={onChange}
                  name="city"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3} htmlFor="country">
                <FontAwesomeIcon icon={faFlag} /> Country
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  id="country"
                  required
                  value={country}
                  onChange={onChange}
                  name="country"
                />
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default AddressEdit;

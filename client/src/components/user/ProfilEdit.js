import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import AuthService from "../../services/auth.service";
import ProfilDataService from "../../services/profil.service";
import "./profilEdit.css";
import { Container, Accordion, Card, Form, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGolfBall,
  faSave,
  faInfoCircle,
  faUsers,
  faCalendarCheck,
  faUserCircle,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import bsCustomFileInput from "bs-custom-file-input";
import AddressEdit from './AddressEdit';
import SocialEdit from "./SocialEdit";

const ProfilEdit = (props) => {
  const initialProfilState = {
    hobbies: "type your hobbies",
    bio: "fill with your real bio",
    public: true,
    avatar: "defaut avatar",
    lastconnect: "Date",
    owner: null,
    social: {
      youtube: "https://youtube.com",
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
    address: {
      street: "complete street with number and name",
      postalCode: "75001",
      city: "Paris",
      country: "France",
    },
  };

  const params = useParams();
  const [currentProfil, setCurrentProfil] = useState(initialProfilState);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();

  const getProfil = (id) => {
    ProfilDataService.getProfil(id)
      .then((response) => {
        setCurrentProfil(response.data);
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProfil(params.id);
    bsCustomFileInput.init();
  }, [params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentProfil({ ...currentProfil, [name]: value });
  };

  const handleSocialChange = (event) => {
    const { name, value } = event.target;
    //setSocials({ ...socials, [name]: value });
    setCurrentProfil({ ...currentProfil.social, [name]: value });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    //setAddress({ ...address, [name]: value });
    setCurrentProfil({ ...currentProfil.address, [name]: value });
  };

  const handleSwitchChange = (event) => {
    const etat = event.target.checked;
    updatePublicState(etat);
  };

  const updatePublicState = (status) => {
    var data = {
      id: currentProfil._id,
      hobbies: currentProfil.hobbies,
      bio: currentProfil.bio,
      public: status,
      avatar: currentProfil.avatar,
      lastconnect: currentProfil.lastconnect,
      owner: currentProfil.owner,
      address: currentProfil.address,
      social: currentProfil.social,
    };

    ProfilDataService.updateProfil(currentProfil._id, data)
      .then((response) => {
        setCurrentProfil({ ...currentProfil, public: status });
        //console.log(response.data);
        setMessage("Public state was changed successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCurrentProfil = () => {
    /* currentProfil.address = address;
    currentProfil.social = socials; */
    ProfilDataService.updateProfil(currentProfil._id, currentProfil)
      .then((response) => {
        //console.log(response.data);
        setMessage("The Profil was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const uploadHandler = (event) => {
    const data = new FormData();
    data.append("file", event.target.files[0]);
    console.log(data);
    axios.post("/upload", data).then((res) => {
      setCurrentProfil({ ...currentProfil, avatar: res.data.filename });
      updateCurrentProfil();
      setMessage("Upload successfully");
      //console.log(currentProfil.avatar);
    });
  };

  return (
    <Container>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Général Profil
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label
                      column
                      sm={3}
                      htmlFor="hobbies"
                    >
                      <FontAwesomeIcon icon={faGolfBall} /> Hobbies
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        type="textarea"
                        id="hobbies"
                        rows={3}
                        required
                        value={currentProfil.hobbies}
                        onChange={handleInputChange}
                        name="hobbies"
                      />
                      <Form.Text className="text-muted">
                        Type yours hobbies separated with a ",".
                      </Form.Text>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label
                      column
                      sm={3}
                      htmlFor="bio" 
                    >
                      <FontAwesomeIcon icon={faInfoCircle} /> Biography
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        id="bio"
                        required
                        value={currentProfil.bio}
                        onChange={handleInputChange}
                        name="bio"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label
                      column
                      sm={3}
                      htmlFor="public"
                    >
                      <FontAwesomeIcon icon={faUsers} /> Public state :
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Check
                        type="switch"
                        id="public"
                        label={currentProfil.public ? "Public" : "Private"}
                        checked={currentProfil.public}
                        onChange={handleSwitchChange}
                        name="public"
                      />
                      <Form.Text className="text-muted">
                        Logged in users can see your profile, otherwise none.
                      </Form.Text>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label
                      column
                      sm={3}
                      htmlFor="lastconnect"
                    >
                      <FontAwesomeIcon icon={faCalendarCheck} /> Last Connection :
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        type="text"
                        id="lastconnect"
                        required
                        disabled
                        value={moment(currentProfil.lastconnect, "LL").format}
                        onChange={handleInputChange}
                        name="lastconnect"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm={3} htmlFor="file">
                    <FontAwesomeIcon icon={faUserCircle} /> Avatar :
                    </Form.Label>
                    <Col sm={9}>
                      <input
                        type="file"
                        id="file"
                        onChange={uploadHandler}
                        name="file"
                        className="custom-file-input"
                      />
                      <label className="custom-file-label" htmlFor="file"></label>
                    </Col>
                  </Form.Group>
                  <Form.Row>
                    <Col sm={6}>
                      <Form.Label htmlFor="profilimg">
                        <span>Preview : </span>
                      </Form.Label>
                    </Col>
                    <Col sm={6}>
                      <Image
                        src={`/${currentProfil.avatar}`}
                        alt="user avatar"
                        name="profilimg"
                        roundedCircle
                      />
                    </Col>
                  </Form.Row>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <SocialEdit socialProps={currentProfil.social} onChange={handleSocialChange} />
          <AddressEdit addressProps={currentProfil.address} onChange={handleAddressChange} />
        </Accordion>
        <Col sm={12} md={10}>
          {message ? (
            <h4 className="text-center">{message}</h4>
          ) : (
            <h4 className="text-center">Edit {currentUser.username} Profil</h4>
          )}
          
          <Form.Group className="text-center">
            <Button
              type="submit"
              className="btn btn-success mr-2"
              onClick={updateCurrentProfil}
            >
              <FontAwesomeIcon icon={faSave} /> Update
            </Button>

            <Link className="btn btn-primary" to="/profile">
              <FontAwesomeIcon icon={faUndo} /> Cancel
            </Link>
          </Form.Group>
        </Col>
    </Container>
  );
};

export default ProfilEdit;

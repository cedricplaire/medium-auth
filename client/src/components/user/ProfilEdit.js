import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import AuthService from "../../services/auth.service";
import ProfilDataService from "../../services/profil.service";
import "./profilEdit.css";
import { Container, Form, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGolfBall,
  faSave,
  faInfoCircle,
  faUsers,
  faCalendarCheck,
  faUserCircle,
  faUndo
} from "@fortawesome/free-solid-svg-icons";
import bsCustomFileInput from "bs-custom-file-input";

const ProfilEdit = (props) => {
  const initialProfilState = {
    hobbies: "type your hobbies",
    bio: "fill with your real bio",
    public: true,
    avatar: "defaut avatar",
    lastconnect: "Date",
    owner: null,
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
      <Row className="justify-content-md-center">
        <Col sm={12} md={10}>
          {message ? (
            <h4 className="text-center">{message}</h4>
          ) : (
            <h4 className="text-center">Edit {currentUser.username} Profil</h4>
          )}
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
                  value={moment(currentProfil.lastconnect).format("LL")}
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
            <Col sm={4} md={3}>
              <span>Avatar preview</span>
            </Col>
            <Col sm={8} md={9}>
              <Image
                src={`http://localhost:8000/${currentProfil.avatar}`}
                alt="user avatar"
                roundedCircle
              />
            </Col>
          </Form>
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
      </Row>
    </Container>
  );
};

export default ProfilEdit;

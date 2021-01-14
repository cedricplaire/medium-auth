import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { Tab, Row, Col, ListGroup, Badge, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faIdCard, faUserEdit, faChartLine, faInfo } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import AuthService from "../../services/auth.service";
import UserDataService from "../../services/user.service";

const Profile = () => {
  const stateProfil = {
    id: "id",
    username: "name",
    email: "tot@tata.com",
    password: "hash-password",
    createdAt: "Date",
    updatedAt: "Date",
    roles: [],
    profil: {
      hobbies: "type your hobbies",
      bio: "fill with your real bio",
      public: true,
      avatar: "defaut avatar",
      lastconnect: "Date",
      owner: null,
    },
    tutorials: [],
  };

  const histo = useHistory();
  const [profile, setProfile] = useState(stateProfil);
  const currentUser = AuthService.getCurrentUser();

  const getProfil = (id) => {
    UserDataService.getFullUser(id)
      .then((response) => {
        //console.log(response.data.user);
        setProfile(response.data.user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!currentUser.id) {
      histo.push("/home");
      histo.action("reload");
    }
    getProfil(currentUser.id);
  }, [currentUser.id, histo]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{profile.username}</strong> Profile
        </h3>
        <p>Here is the information about you</p>
      </header>
      <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
        <Row>
          <Col sm={4} md={3}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                <div className="profil-global-list">
                  <span>Global</span>
                  <FontAwesomeIcon icon={faIdCard} />
                </div>
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                <div className="profil-global-list">
                  <span>Activities</span>
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                <div className="profil-global-list">
                  <span>Biography</span>
                  <FontAwesomeIcon icon={faInfo} />
                </div>
              </ListGroup.Item>
            </ListGroup>
            <Link
              className="btn btn-outline-danger w-100 mt-1"
              to={`/profile/${profile.profil._id}/edit`}
            >
              <FontAwesomeIcon icon={faUserEdit} /> Edit
            </Link>
          </Col>
          <Col sm={8} md={9}>
            <Tab.Content className="profil-tabcontent">
              <Tab.Pane eventKey="#link1">
                <div className="tab1-wrapper">
                  <div className="tab1-left">
                    <h5>Avatar :</h5>
                    <Image
                      alt="user avatar"
                      src={`http://localhost:8000/${profile.profil.avatar}`}
                      style={{ maxWidth: "200px" }}
                      className="justify-content-center"
                    />
                    <hr />
                    <h5>Authorities</h5>
                    <p>
                      {profile.roles &&
                        profile.roles.map((role, index) => (
                          <Badge
                            variant="info"
                            className="mr-1"
                            key={role.name}
                          >
                            {role.name}
                          </Badge>
                        ))}
                    </p>
                  </div>

                  <div className="tab1-right">
                    <h5 className="text-center">Informations</h5>
                    <div className="tab1-right-infos">
                      <p>
                        <strong className="text-secondary mr-1">
                          Nick Name :
                        </strong>{" "}
                        {profile.username}{" "}
                      </p>
                      <p>
                        <strong className="text-secondary mr-1">
                          Your EMail :
                        </strong>
                        {profile.email}{" "}
                      </p>
                      <p>
                        <strong className="text-secondary mr-1">
                          Last visit :
                        </strong>
                        {moment(profile.profil.lastconnect).format(
                          "DD-MMMM-YYYY HH:mm"
                        )}
                      </p>
                      <p>
                        <strong className="text-secondary mr-1">
                          Public Profil :
                        </strong>
                        {profile.profil.public ? "true" : "false"}{" \n "}
                        <small className="text-muted">Only connected user can view your profil</small>
                      </p>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                <div className="tab1-wrapper">
                  <div className="tab1-left">
                    <h5 className="text-center">Hobbies :</h5>
                    <p>
                      {profile.profil.hobbies
                        ? profile.profil.hobbies
                        : "No hobbies !"}
                    </p>
                  </div>
                  <div className="tab1-right">
                    <h5 className="text-center">Posts written :</h5>
                    <ListGroup style={{width: "100%"}}>
                      {profile.tutorials &&
                        profile.tutorials.map((tuto, index) => (
                          <ListGroup.Item key={index}>
                            <div className="list-tutos-profil">
                            <span className="profil-tutos">{tuto.title}</span>
                            <span className="profil-tutos">
                              <FontAwesomeIcon icon={faCalendar} />
                              <Badge variant="secondary" className="ml-2">
                                {moment(tuto.createdAt).format("LL")}
                              </Badge>
                            </span>
                            </div>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                <p>{profile.profil.bio}</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { Tab, Row, Col, ListGroup, Badge, Image, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faUserEdit,
  faChartLine,
  faInfo,
  faCalendarAlt,
  faMailBulk,
  faRoad,
  faCity,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faFacebook,
  faInstagram,
  faYoutube,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
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
      address: {},
      social: {},
    },
    tutorials: [],
  };

  const histo = useHistory();
  const [profile, setProfile] = useState(stateProfil);
  const currentUser = AuthService.getCurrentUser();

  const getProfil = (id) => {
    UserDataService.getFullUser(id)
      .then((response) => {
        //console.log(response.data.user.profil);
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
    <Container>
      <header className="jumbotron">
        <h3>
          <strong>{profile.username}</strong> Profile
        </h3>
        <p>Here is the information about you</p>
      </header>
      <Tab.Container id="list-group-tabs" defaultActiveKey="#link1">
        <Row>
          <Col sm={3} md={2}>
            <ListGroup>
              <ListGroup.Item action href="#link1">
                <div className="profil-global-list">
                  <span>Global</span>
                  <FontAwesomeIcon icon={faIdCard} />
                </div>
              </ListGroup.Item>
              <ListGroup.Item action href="#link2">
                <div className="profil-global-list">
                  <span>Socials</span>
                  <FontAwesomeIcon icon={faMailBulk} />
                </div>
              </ListGroup.Item>
              <ListGroup.Item action href="#link3">
                <div className="profil-global-list">
                  <span>Activities</span>
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
              </ListGroup.Item>
              <ListGroup.Item action href="#link4">
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
          <Col sm={9} md={10} style={{marginLeft: "0px"}}>
            <Tab.Content className="profil-tabcontent">
              <Tab.Pane eventKey="#link1">
                <div className="tab1-wrapper">
                  <div className="tab1-left">
                    <h5>Avatar :</h5>
                    <Image
                      alt="user avatar"
                      src={`/${profile.profil.avatar}`}
                      style={{ maxWidth: "200px" }}
                    />
                    <hr />
                    <h5>Authorities</h5>
                    <span>
                      {profile.roles &&
                        profile.roles.map((role, index) => (
                          <h5>
                          <Badge
                            variant="info"
                            className="mr-1"
                            key={index}
                          >
                            {role.name}
                          </Badge>
                          </h5>
                        ))}
                    </span>
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
                        {moment.utc(profile.profil.lastconnect).format("DD-MMMM-YYYY HH:mm")}
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
                    <h5 className="text-center">Postal Address :</h5>

                      <div className="list-address-profil">
                        {profile.profil.address.street &&
                          <span className="profil-address">
                            Street <FontAwesomeIcon icon={faRoad} />{` : ${profile.profil.address.street}`}
                          </span>
                        }
                        {profile.profil.address.postalCode &&
                          <span className="profil-address">
                            Postal Code <FontAwesomeIcon icon={faMailBulk} />{` : ${profile.profil.address.postalCode}`}
                          </span>
                        }
                        {profile.profil.address.city &&
                          <span className="profil-address">
                            City <FontAwesomeIcon icon={faCity} />{` : ${profile.profil.address.city}`}
                          </span>
                        }
                        {profile.profil.address.country &&
                          <span className="profil-address">
                            Country <FontAwesomeIcon icon={faFlag} />{` : ${profile.profil.address.country}`}
                          </span>
                        }
                      </div>
                  </div>
                  <div className="tab1-right">
                  <h5 className="text-center">Socials Links :</h5>
                    <ListGroup>
                      {profile.profil.social.youtube && 
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faYoutube} />{`: ${profile.profil.social.youtube}`}
                        </ListGroup.Item>
                      }
                      {profile.profil.social.twitter && 
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faTwitter} />{`: ${profile.profil.social.twitter}`}
                        </ListGroup.Item>
                      }
                      {profile.profil.social.facebook && 
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faFacebook} />{`: ${profile.profil.social.facebook}`}
                        </ListGroup.Item>
                      }
                      {profile.profil.social.github && 
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faGithub} />{`: ${profile.profil.social.github}`}
                        </ListGroup.Item>
                      }
                      {profile.profil.social.linkedin && 
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faLinkedin} />{`: ${profile.profil.social.linkedin}`}
                        </ListGroup.Item>
                      }
                      {profile.profil.social.instagram && 
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faInstagram} />{`: ${profile.profil.social.instagram}`}
                        </ListGroup.Item>
                      }
                    </ListGroup>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
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
                              <FontAwesomeIcon icon={faCalendarAlt} />
                              <Badge variant="secondary" className="ml-2">
                                {moment.utc(tuto.createdAt).format("DD-MMMM-YYYY HH:mm")}
                              </Badge>
                            </span>
                            </div>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#link4">
                <p>{profile.profil.bio}</p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Profile;

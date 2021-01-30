import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
import { 
  Container,
  Row,
  Col,
  Card,
  Badge,
  Jumbotron,
  Image,
} from "react-bootstrap";
import "./BoardAdmin.css";

import UserService from "../../services/user.service";
import UserList from "../user/UserList";
import UserEdit from "../user/UserEdit";
import TutorialsList from "../tutorial/TutorialsList";
import TutorialEdit from "../tutorial/TutorialEdit";

const BoardAdmin = () => {
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
  };
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([stateProfil]);
  const [tutos, setTutos] = useState([]);
  const [publicProfil, setPublicProfil] = useState(0);
  const { path, url } = useRouteMatch();
  var F_DATE_RFC2822 = "dddd, DD MMMM YYYY HH:mm:ss";
  var M_DATE_RFC2822 = "dd, DD MMM YYYY HH:mm";
  var S_DATE_RFC2822 = "DD MMM YYYY HH:mm";


  const filterData = (data) => {
    const tmpTutos = [];
    data.map((user) => (
      user.tutorials.forEach(element => {
        tmpTutos.push(element)
      })
    ));
    setTutos(tmpTutos);
    //console.log(data);
    //console.log(tmpTutos);

    const pp = data.map((user) => {
      return user
    }).filter((profil) => {
      return profil.profil.public === true
    })
    //console.log(pp);
    setPublicProfil(pp);
  }

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        //console.log(response.data);
        setUsers(response.data);
        filterData(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} md={12}>
          <Jumbotron>
            <h1>Welcome to the Administration section</h1>
            {<h3>{content}</h3>}
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Card border="secondary" className="p-0 mt-1">
            <Card.Header as="h3" className="bg-dark text-light">
              Users Statitics
            </Card.Header>
            <Card.Body>
              <Card.Title>Connexion informations</Card.Title>
              <div className="d-inline-flex justify-content-around w-100">
                <div className="admin-usercard-block aub-infos">
                  <h6>Registered 
                  <Badge className="ml-1" variant="light">
                    {users && users.length}
                  </Badge>
                  </h6>
                </div>
                <div className="admin-usercard-block aub-success">
                  <h6>
                  Public
                  <Badge className="ml-1" variant="light">
                    {publicProfil && publicProfil.length}
                  </Badge>
                  </h6>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="bg-dark text-light admin-card-footer">
              <Link to={`${url}/listusers`} className="btn btn-outline-light mr-2">List</Link>
              <Link to={`${url}/edituser`} className="btn btn-outline-light">Edit</Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card border="secondary" className="p-0 mt-1">
            <Card.Header as="h3" className="bg-dark text-light">
              Articles Statistics
            </Card.Header>
            <Card.Body>
              <Card.Title>Latest tutorials informations</Card.Title>
              <div className="d-inline-flex justify-content-around w-100">
                <div className="admin-usercard-block aub-warning">
                  <h6>
                  Total
                  <Badge className="ml-1" variant="light">
                    {tutos && tutos.length}
                  </Badge>
                  </h6>
                </div>
                <div className="admin-usercard-block aub-danger">
                  <h6>
                  Latest
                  <Badge className="ml-1" variant="light">
                    {publicProfil && publicProfil.length}
                  </Badge>
                  </h6>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="bg-dark text-light admin-card-footer">
              <Link to={`${url}/listtutos`} className="btn btn-outline-light mr-2">List</Link>
              <Link to={`${url}/edittuto`} className="btn btn-outline-light">Edit</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} sm={12} id="admin-users-col2">
          {users && users.map((element, index) => (
            <div key={index} className="admin-user-cardh">
              {element.profil &&  
              <div className="admin-user-picture w-25">
                <Image alt="picture tutorial" 
                  src={element.profil.avatar ? (
                    `/${element.profil.avatar}`
                  ) : (
                    `/profil.png`
                  )} />
              </div>}
              <div className="admin-user-descript w-75">
                <span>{element.username}</span>
                <span>{moment(element.createdAt).format(M_DATE_RFC2822)}</span>
                <span>{moment(element.updatedAt).format(F_DATE_RFC2822)}</span> 
              </div>
            </div>
          ))}
        </Col>
        <Col md={6} sm={12} id="admin-tutos-col2">
          {tutos && tutos.map((tuto, index) => (
            <div key={index} className="admin-tuto-cardh">
              <div className="admin-tuto-picture w-25">
                <Image alt="picture tutorial" 
                  src={tuto.picture ? (
                    `/${tuto.picture}`
                  ) : (
                    `/picture.png`
                  )} />
              </div>
              <div className="admin-tuto-descript w-75">
                <span>{tuto.title}</span>
                <span>{moment(tuto.createdAt).format(S_DATE_RFC2822)}</span>
                <span>{moment(tuto.updatedAt).format(S_DATE_RFC2822)}</span> 
              </div>
            </div>
          ))}
        </Col>
      </Row>
      <Row>
        <Switch>
					<Route path={`${path}/listusers`}>
						<UserList />
					</Route>
					<Route path={`${path}/edituser`}>
						<UserEdit />
					</Route>
          <Route path={`${path}/listtutos`}>
						<TutorialsList />
					</Route>
					<Route path={`${path}/edittuto`}>
						<TutorialEdit />
					</Route>
				</Switch>
      </Row>
    </Container>
  );
};

export default BoardAdmin;

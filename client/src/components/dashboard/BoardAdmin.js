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
          <Card border="secondary" className="p-0">
            <Card.Header as="h4" className="bg-dark text-light">
              Users Management
            </Card.Header>
            <Card.Body>
              <Card.Title>Latest users informations</Card.Title>
              <div className="admin-card-badges">
                <div>
                Registered : <Badge variant="secondary">
                  {users && users.length}
                  </Badge>
                </div>
                <div>
                Public Profils : <Badge variant="secondary">
                  {publicProfil && publicProfil.length}
                  </Badge>
                </div>
              </div>
            </Card.Body>
            <Card.Footer className="bg-dark text-light">
              <Link to={`${url}/listusers`} className="btn btn-outline-light mr-2">List</Link>
              <Link to={`${url}/edituser`} className="btn btn-outline-light">Edit</Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card border="secondary" className="p-0">
            <Card.Header as="h4" className="bg-dark text-light">
              Posts Management
            </Card.Header>
            <Card.Body>
              <Card.Title>Latest tutorials informations</Card.Title>
              <Card.Text>
                Tutorials: <Badge variant="secondary">
                  {tutos && tutos.length}
                  </Badge>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-dark text-light">
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
                    `http://localhost:8000/${element.profil.avatar}`
                  ) : (
                    `http://localhost:8000/profil.png`
                  )} />
              </div>}
              <div className="admin-user-descript w-75">
                <span>{element.username}</span>
                <span>{moment(element.createdAt).format("LL")}</span>
                <span>{moment(element.updatedAt).format("LL")}</span> 
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
                    `http://localhost:8000/${tuto.picture}`
                  ) : (
                    `http://localhost:8000/picture.png`
                  )} />
              </div>
              <div className="admin-tuto-descript w-75">
                <span>{tuto.title}</span>
                <span>{moment(tuto.createdAt).format("LL")}</span>
                <span>{moment(tuto.updatedAt).format("LL")}</span> 
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

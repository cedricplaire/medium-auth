import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import Timeline from '../timeline/Timeline';

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
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
    <div className="container">
      <header className="jumbotron">
      <h1>Welcome to the User section</h1>
        <h3>{content}</h3>
      </header>
      <div>
        <Timeline />
      </div>
    </div>
  );
};

export default BoardUser;

import axios from "axios";
//import jwt from "jsonwebtoken";
//const config = require("../config/auth.config");

const API_URL = "http://localhost:8000/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios
    .post(API_URL + "signin", {
      username,
      password,
    });
    console.log(response);
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.replace("/home");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
  // future test
  /* const user = localStorage.getItem('user');
  const token = user.accessToken;
  try {
    //const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err.name === 'TokenExpiredError') {
            const payload = jwt.verify(token, config.secret, {ignoreExpiration: true} );
            const userid = payload.userid;
            const is_admin = payload.is_admin;

            const refreshToken = jwt.sign({
                userid: userid,
                is_admin: is_admin
            }, config.secret, {
                algorithm: 'HS256',
                expiresIn: '10m'
            })
            res.status(200).json({status: true, token: refreshToken});
        }
        else if(err) {
            res.status(401).json({status: false, result: "Invalid token"});
        }
    })
  } catch(e) {
      //console.log(e);
      res.status(401).json({status: false, result: "Token does not exist"});
  } */
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
  getCurrentUser,
};

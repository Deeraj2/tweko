import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as api from "../../api";
import "./Auth.css";
import { socialContext } from "../../context/BlogProvider";

const initialState = {
  name: "",
  email: "",
  avatar: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const { user, setUser, setAlert } = useContext(socialContext);

  const [formDatas, setFormDatas] = useState(initialState);
  const [isSignUp, setisSignUp] = useState(false);
  const navigate = useNavigate();

  const signUp = async () => {
    if (
      !formDatas.name ||
      !formDatas.email ||
      !formDatas.password ||
      !formDatas.avatar ||
      !formDatas.confirmPassword
    ) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }
    if (formDatas.password !== formDatas.confirmPassword) {
      setAlert({
        open: true,
        message: "Password do not match ",
        type: "error",
      });
      return;
    }
    try {
      const { data } = await api.signUp(formDatas);
      localStorage.setItem("profile", JSON.stringify(data));
      setUser(data);
      navigate("/");
      setAlert({
        open: true,
        message: `Signup In Successful.`,
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error,
        type: "error",
      });
    }
  };

  const signIn = async () => {
    if (!formDatas.email || !formDatas.password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }

    try {
      const { data } = await api.signIn(formDatas);
      localStorage.setItem("profile", JSON.stringify(data));
      setUser(data);
      navigate("/");
      setAlert({
        open: true,
        message: `Login In Successful.`,
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error,
        type: "error",
      });
    }
  };

  const uploadImage = (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "qgkvd74u");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
        formData
      )
      .then((res) => {
        setFormDatas({ ...formDatas, avatar: res.data.url.toString() });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      signUp();
    } else {
      signIn();
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) navigate("/");
  }, [navigate]);

  const handleChange = (e) => {
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
  };

  console.log(formDatas);

  return (
    <div className="auth">
      <div className="auth-gradient" />
      <video src="./videos/share.mp4" autoPlay loop muted />
      <div className="auth-form">
        <form className="auth-login" onSubmit={handleSubmit}>
          <h1>Tweko</h1>
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          )}
          {isSignUp && (
            <input
              type="file"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          )}
          <button type="submit" className="submit-btn">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <h4 className="switch-btn" onClick={() => setisSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account ? SignIn"
              : "Don't have an account ? SignUp"}
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Auth;

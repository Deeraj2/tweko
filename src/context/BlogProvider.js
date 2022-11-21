import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const socialContext = createContext();

const BlogProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [singlePost, setSinglePost] = useState();
  const [posts, setPost] = useState([]);
  const [catPost, setCatPost] = useState([]);
  const [savePost, setsavePost] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("profile"));
    setUser(userInfo);
    if (!userInfo) navigate("/auth");
  }, []);

  return (
    <socialContext.Provider
      value={{
        user,
        setUser,
        alert,
        setAlert,
        posts,
        setPost,
        singlePost,
        setSinglePost,
        catPost,
        setCatPost,
        savePost,
        setsavePost,
        currentId,
        setCurrentId,
      }}
    >
      {children}
    </socialContext.Provider>
  );
};

export default BlogProvider;

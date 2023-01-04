import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { socialContext } from "../../context/BlogProvider";
import "./Profile.css";
import axios from "axios";
import MasonryLayout from "../Post/MasonryLayout";
import Loading from "../Loading/Loading";

const Profile = () => {
  const { user, setUser, setPost, posts } = useContext(socialContext);

  const randomImage =
    "https://source.unsplash.com/1600x900/?nature,photography,technology,night,urban,europe";

  const [info, setInfo] = useState();
  const [userPosts, setuserPosts] = useState([]);
  const [text, setText] = useState("Created");
  const [savePost, setSavePost] = useState([]);
  const [activeBtn, setActiveBtn] = useState("created");
  const [isLoading, setisLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const userProfile = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/user/userInfo/${id}`
    );
    setInfo(data);
  };

  const userPost = async () => {
    setisLoading(true);
    const { data } = await axios.get(
      `http://localhost:8000/posts/profile/${id}`
    );
    setuserPosts(data);
    setisLoading(false);
  };

  const save = async () => {
    try {
      setisLoading(true);
      const { data } = await axios.get(`http://localhost:8000/save/${id}`);
      setSavePost(data);
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get("http://localhost:8000/posts", config);
      setPost(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const savedPost = (arr1, arr2) => {
    let res;
    res = arr1?.filter((el) => {
      return arr2.find((ele) => {
        return el.id == ele.PostId;
      });
    });
    return res;
  };

  const saved = savedPost(posts, savePost);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/auth");
  };

  useEffect(() => {
    userProfile();
    userPost();
    fetchPost();
    save();
  }, [id]);

  return (
    <div className="profile">
      <div className="profile-pic">
        <img src={randomImage} alt="cover-img" className="cover-img" />
        <Avatar
          sx={{ width: "7rem", height: "7rem", marginTop: "-3.7rem" }}
          src={info?.avatar}
          alt={info?.name}
        />
      </div>
      <h1 className="username">{info?.name}</h1>
      <p className="email">{info?.email}</p>
      <div className="logout-btn">
        {user?.result.id === info?.id && (
          <button onClick={logout}>Log Out</button>
        )}
      </div>

      <div className="profile-btn">
        <button
          type="button"
          onClick={(e) => {
            setText(e.target.textContent);
            setActiveBtn("created");
          }}
          className={`${
            activeBtn === "created" ? "activeBtnStyles" : "notActiveBtnStyles"
          }`}
        >
          Created
        </button>
        <button
          type="button"
          onClick={(e) => {
            setText(e.target.textContent);
            setActiveBtn("saved");
          }}
          className={`${
            activeBtn === "saved" ? "activeBtnStyles" : "notActiveBtnStyles"
          }`}
        >
          Saved
        </button>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="post">
            {text === "Created" ? (
              <MasonryLayout posts={userPosts} />
            ) : (
              <MasonryLayout posts={saved} />
            )}
          </div>
          <div className="post">
            {text === "Created" ? (
              <>{userPosts?.length <= 0 && <p>No Post Found</p>}</>
            ) : (
              <>{saved?.length <= 0 && <p>No Post Found</p>}</>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

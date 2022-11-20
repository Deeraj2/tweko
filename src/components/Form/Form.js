import React, { useContext, useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import { categories } from "../categoryData/categories";
import { socialContext } from "../../context/BlogProvider";

const Form = () => {
  const { user, currentId, setCurrentId, posts } = useContext(socialContext);

  const [postData, setPostData] = useState({
    title: "",
    postText: "",
    selectedFile: "",
    tags: "",
    category: "",
  });

  const navigate = useNavigate();

  const post = currentId ? posts.find((p) => p.id === currentId) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios
        .patch(
          `http://localhost:8000/posts/${currentId}`,
          { ...postData },
          config
        )
        .then((res) => {
          console.log("It worked");
          navigate("/");
          clear();
        });
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      await axios
        .post(
          "http://localhost:8000/posts",
          {
            ...postData,
            creator: user?.result.name,
            creatorAvatar: user?.result.avatar,
          },
          config
        )
        .then(() => {
          console.log("It worked");
          navigate("/");
          clear();
        });
    }
  };

  const clear = (e) => {
    e.preventDefault();
    setCurrentId(null);
    setPostData({
      title: "",
      postText: "",
      selectedFile: "",
      tags: "",
      category: "",
    });
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  return (
    <div className="create">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        noValidate
        className="create-content"
      >
        {!postData.selectedFile ? (
          <div className="images-content">
            <div className="images-detail">
              <p className="iamges-icon">
                <CloudDownloadIcon />
              </p>
              <p className="images-name">Upload the image</p>
              <div className="filebase">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({ ...postData, selectedFile: base64 })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="images-content image">
            <img
              src={postData?.selectedFile}
              className="uploaded-image"
              alt="uploaded"
            />
            <DeleteIcon
              sx={{
                position: "absolute",
                bottom: "0.75rem",
                right: "0.74rem",
                cursor: "pointer",
                color: "gray",
                fontSize: "28px",
              }}
              onClick={() => setPostData({ ...postData, selectedFile: "" })}
            />
          </div>
        )}
        <div className="form-content">
          <input
            type="text"
            placeholder="title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            className="content-input"
          />
          <textarea
            placeholder="message"
            value={postData.postText}
            onChange={(e) =>
              setPostData({ ...postData, postText: e.target.value })
            }
            className="content-message"
          />
          <input
            type="text"
            placeholder="Tags(Eg:dogs,cats)"
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
            className="content-input"
          />
          <select
            className="content-select"
            value={postData.category}
            onChange={(e) =>
              setPostData({ ...postData, category: e.target.value })
            }
          >
            <option className="category">Select a Category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="btn-content">
            <button type="submit">Upload</button>
            <button onClick={clear}>Clear</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;

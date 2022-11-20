import React from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Post.css";

const Post = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="pin">
        <LazyLoadImage
          src={post?.selectedFile}
          alt={post?.creator}
          className="pin-img"
          onClick={() => navigate(`/post/${post?.id}`)}
        />
        {/* <img
          src={post?.selectedFile}
          alt={post?.creator}
          className="pin-img"
          onClick={() => navigate(`/post/${post?.id}`)}
        /> */}
      </div>
    </div>
  );
};

export default Post;

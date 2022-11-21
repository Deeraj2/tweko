import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { socialContext } from "../../context/BlogProvider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DownloadIcon from "@mui/icons-material/Download";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Avatar } from "@mui/material";
import "./SinglePost.css";
import MasonryLayout from "../Post/MasonryLayout";
import Loading from "../Loading/Loading";
import Category from "../Category/Category";

const SinglePost = () => {
  const { id } = useParams();
  const {
    setCurrentId,
    user,
    singlePost,
    setSinglePost,
    catPost,
    setCatPost,
    savePost,
    setsavePost,
  } = useContext(socialContext);
  const [postComment, setpostComment] = useState([]);
  const [likedPost, setlikedPost] = useState([]);
  const [newComment, setnewComment] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const UserId = user?.result.id;
  const navigate = useNavigate();
  const tag = singlePost?.tags.split(",");

  console.log(singlePost);

  //Comments
  const comments = async () => {
    const { data } = await axios.get(`http://localhost:8000/comments/${id}`);
    setpostComment(data.reverse());
  };

  //AddComment
  const addComment = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .post(
        `http://localhost:8000/comments`,
        {
          creatorAvatar: user?.result.avatar,
          commentBody: newComment,
          creator: user?.result.name,
          PostId: id,
        },
        config
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setpostComment([response.data, ...postComment]);
          setnewComment("");
        }
      });
  };

  //DeleteComment
  const deleteComment = async (cmntid) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .delete(`http://localhost:8000/comments/${cmntid}`, config)
      .then(() => {
        setpostComment(
          postComment.filter((val) => {
            return val.id !== cmntid;
          })
        );
      });
  };

  //FetchingPost
  const singlepost = async () => {
    try {
      setisLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:8000/posts/byId/${id}`,
        config
      );
      setSinglePost(data.post);
      setlikedPost(
        data.likePost.map((like) => {
          return like.PostId;
        })
      );
      setsavePost(
        data.savePost.map((save) => {
          return save.PostId;
        })
      );
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //Like a Post
  const likeAPost = async (PostId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .post(
        "http://localhost:8000/likes",
        { PostId: PostId, UserId: UserId },
        config
      )
      .then((res) => {
        setSinglePost((prevState) => {
          if (prevState.id === PostId) {
            if (res.data.liked) {
              return {
                ...prevState,
                Likes: [...prevState.Likes, 0],
              };
            } else {
              const likeArray = prevState.Likes;
              likeArray.pop();
              return { ...prevState, Likes: likeArray };
            }
          } else {
            console.log(prevState.Likes);
            return prevState;
          }
        });
        if (likedPost.includes(PostId)) {
          setlikedPost(
            likedPost.filter((id) => {
              return id !== PostId;
            })
          );
        } else {
          setlikedPost([...likedPost, PostId]);
        }
      });
  };

  //Save a post
  const saveAPost = async (PostId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .post("http://localhost:8000/save", { PostId, UserId }, config)
      .then((res) => {
        setSinglePost((prevState) => {
          if (prevState.id === PostId) {
            if (res.data.saved) {
              return { ...prevState, Saves: [...prevState.Saves, 0] };
            } else {
              const saveArray = prevState.Saves;
              saveArray.pop();
              //In future i will fix the bug
              return { ...prevState, Saves: saveArray };
            }
          } else {
            return prevState;
          }
        });
        if (savePost.includes(PostId)) {
          setsavePost(
            savePost.filter((id) => {
              return id !== PostId;
            })
          );
        } else {
          setsavePost([...savePost, PostId]);
        }
      });
  };

  //Delete Post

  const deletePost = async (postId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await axios
      .delete(`http://localhost:8000/posts/${postId}`, config)
      .then(() => {
        navigate("/");
      });
  };

  //update the Post
  const updatePost = (id) => {
    setCurrentId(id);
    navigate("/upload");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    singlepost();
    comments();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="singlePost">
            <div className="post-img">
              <img src={singlePost?.selectedFile} alt={singlePost?.creator} />
            </div>
            <div className="post-content">
              <div className="post-creator">
                <Avatar
                  src={singlePost?.creatorAvatar}
                  alt={singlePost?.creator}
                  sx={{ width: "35px", height: "35px", cursor: "pointer" }}
                  onClick={() => navigate(`/profile/${singlePost.UserId}`)}
                />
                <p onClick={() => navigate(`/profile/${singlePost.UserId}`)}>
                  {singlePost?.creator}
                </p>
              </div>
              <h2 className="post-title">{singlePost?.title}</h2>
              <div className="post-main">
                {likedPost?.includes(singlePost?.id) ? (
                  <FavoriteIcon
                    sx={{
                      fontSize: "2rem",
                      marginRight: "4px",
                      cursor: "pointer",
                      color: "#D2042D",
                    }}
                    onClick={() => likeAPost(singlePost?.id)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{
                      fontSize: "2rem",
                      marginRight: "4px",
                      cursor: "pointer",
                      color: "gray",
                    }}
                    onClick={() => likeAPost(singlePost?.id)}
                  />
                )}
                <span>{singlePost?.Likes?.length}</span>
                {savePost?.includes(singlePost?.id) ? (
                  <BookmarkIcon
                    sx={{
                      fontSize: "2rem",
                      marginRight: "4px",
                      cursor: "pointer",
                      color: "gray",
                    }}
                    onClick={() => saveAPost(singlePost?.id)}
                  />
                ) : (
                  <BookmarkBorderIcon
                    sx={{
                      fontSize: "2rem",
                      marginRight: "4px",
                      cursor: "pointer",
                      color: "gray",
                    }}
                    onClick={() => saveAPost(singlePost?.id)}
                  />
                )}
                <span>{singlePost?.Saves.length}</span>
                <a
                  href={`${singlePost?.selectedFile}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DownloadIcon
                    sx={{
                      fontSize: "2rem",
                      marginRight: "10px",
                      cursor: "pointer",
                      color: "gray",
                    }}
                  />
                </a>
                {user?.result.name === singlePost?.creator && (
                  <EditIcon
                    sx={{
                      fontSize: "2rem",
                      marginRight: "10px",
                      cursor: "pointer",
                      color: "gray",
                    }}
                    onClick={() => updatePost(singlePost.id)}
                  />
                )}
                {user?.result.name === singlePost?.creator && (
                  <DeleteIcon
                    sx={{
                      fontSize: "2rem",
                      marginRight: "10px",
                      cursor: "pointer",
                      color: "#D22B2B",
                    }}
                    onClick={() => deletePost(id)}
                  />
                )}
              </div>
              {tag?.map((t) => (
                <div className="tags">
                  <p>{t}</p>
                </div>
              ))}
              <p className="post-desc"> {singlePost?.postText} </p>
              <div className="post-comments">
                <h3>Comments</h3>
                <input
                  type="text"
                  placeholder="Comments"
                  value={newComment}
                  onChange={(e) => setnewComment(e.target.value)}
                />
                <button onClick={addComment}>Add</button>
              </div>
              <div className="comment-body">
                {postComment?.map((c, key) => (
                  <div key={key} className=" comment-d ">
                    <div className="comment-content">
                      <Avatar
                        sx={{ width: "30px", height: "30px", marginTop: "2px" }}
                        src={c.creatorAvatar}
                        alt={c.creator}
                      >
                        {c.creator.charAt(0)}
                      </Avatar>
                      <div className="comment-detail">
                        <p className="creatorComment">{c.creator}</p>
                        <p className="commentbody">{c.commentBody}</p>
                      </div>
                    </div>
                    {user?.result.name === c.creator && (
                      <DeleteIcon
                        sx={{ color: "gray", cursor: "pointer" }}
                        onClick={() => deleteComment(c?.id)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Category />
        </>
      )}
    </>
  );
};

export default SinglePost;

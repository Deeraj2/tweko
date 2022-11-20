import React, { useContext, useEffect, useState } from "react";
import { socialContext } from "../../context/BlogProvider";
import axios from "axios";
import MasonryLayout from "../Post/MasonryLayout";
import Loading from "../Loading/Loading";

const Home = () => {
  const { user, posts, setPost } = useContext(socialContext);
  const [isLoading, setisLoading] = useState(false);

  const fetchPost = async () => {
    try {
      setisLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get("http://localhost:8000/posts", config);
      setPost(data.reverse());
      setisLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return <div>{isLoading ? <Loading /> : <MasonryLayout posts={posts} />}</div>;
};

export default Home;

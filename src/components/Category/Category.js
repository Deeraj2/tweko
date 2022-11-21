import axios from "axios";
import React, { useContext, useEffect } from "react";
import { socialContext } from "../../context/BlogProvider";
import MasonryLayout from "../Post/MasonryLayout";

const Category = () => {
  const { user, singlePost, setCatPost, catPost } = useContext(socialContext);

  useEffect(() => {
    const category = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `http://localhost:8000/posts/${singlePost?.category}`,
          config
        );
        setCatPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    return category;
  }, []);

  const recommendedPosts = catPost.filter(
    (posts) => posts?.id !== singlePost?.id
  );

  return (
    <div>
      {recommendedPosts.length > 0 && (
        <div className="category">
          <h1>Related Category</h1>
          <MasonryLayout posts={recommendedPosts} />
        </div>
      )}
    </div>
  );
};

export default Category;

import React, { Suspense, lazy } from "react";
import Masonary from "react-masonry-css";
import Loading from "../Loading/Loading";
// import Post from "./Post";
import "./Post.css";
const Post = lazy(() => import("./Post"));

const MasonryLayout = ({ posts }) => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  return (
    <div className="post-body">
      <Suspense fallback={<Loading />}>
        <Masonary
          className="masonary animate-slide-fwd"
          breakpointCols={breakpointColumnsObj}
        >
          {posts?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Masonary>
      </Suspense>
    </div>
  );
};

export default MasonryLayout;

import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AlertData from "./components/Alert/AlertData";
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import SinglePost from "./components/SinglePost/SinglePost";
import { socialContext } from "./context/BlogProvider";

function App() {
  const { user } = useContext(socialContext);

  return (
    <div className="App">
      {user ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Form />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      )}
      <AlertData />
    </div>
  );
}

export default App;

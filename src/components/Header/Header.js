import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { Avatar } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { socialContext } from "../../context/BlogProvider";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(socialContext);

  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>Tweko</h1>
      <div className="header-content">
        <AddBoxIcon
          sx={{
            fontSize: "40px",
            marginRight: "14px",
            cursor: "pointer",
            color: "rgb(255, 206, 46)",
          }}
          onClick={() => navigate("/upload")}
        />
        <Avatar
          onClick={() => navigate(`/profile/${user.result.id}`)}
          src={user?.result?.avatar}
          alt={user?.result?.name}
          sx={{ backgroundColor: "#6977c5", cursor: "pointer" }}
        >
          {user?.result.name.charAt(0)}
        </Avatar>
      </div>
    </div>
  );
};

export default Header;

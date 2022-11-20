const express = require("Express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comments");
const LikesRoutes = require("./routes/likes");
const saveRoutes = require("./routes/save");

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", LikesRoutes);
app.use("/save", saveRoutes);

const PORT = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is working on PORT ${PORT}`);
  });
});

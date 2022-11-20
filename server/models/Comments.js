module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    creatorAvatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comments;
};

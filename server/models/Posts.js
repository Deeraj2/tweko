module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creatorAvatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectedFile: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade", //Delete every comments while deleting the post
    });

    Posts.hasMany(models.Likes, {
      onDelete: "cascade", //Delete every comments while deleting the post
    });

    Posts.hasMany(models.Save, {
      onDelete: "cascade", //Delete every comments while deleting the post
    });
  };

  return Posts;
};

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade", //Delete every comments while deleting the post
    });
    Users.hasMany(models.Posts, {
      onDelete: "cascade", //Delete every comments while deleting the post
    });
    Users.hasMany(models.Save, {
      onDelete: "cascade", //Delete every comments while deleting the post
    });
  };

  return Users;
};

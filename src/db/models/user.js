"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ review, like }) {
      this.hasMany(review, { foreignKey: "reviewer_id" });
      this.hasMany(review, { foreignKey: "reviewee_id" });
      this.hasMany(like);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      company: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};

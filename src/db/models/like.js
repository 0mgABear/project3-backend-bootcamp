"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate({ user, review }) {
      this.belongsTo(user, {
        foreignKey: "user_id",
        as: "user",
      });
      this.belongsTo(review, {
        foreignKey: "review_id",
        as: "review",
      });
    }
  }
  Like.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      reviewId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "review",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      like: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "like",
      tableName: "likes",
      underscored: true,
    }
  );
  return Like;
};

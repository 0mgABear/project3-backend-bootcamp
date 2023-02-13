"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {}
  Review.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      reviewer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      reviewee_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "companies",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "review",
      tableName: "reviews",
      underscored: true,
    }
  );
  return Review;
};

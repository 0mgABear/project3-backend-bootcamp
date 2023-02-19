"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ like, user }) {
      this.hasMany(like, { foreignKey: "review_id" });
      this.belongsTo(user, {
        foreignKey: "reviewer_id",
        as: "reviewer",
      });
      this.belongsTo(user, {
        foreignKey: "reviewee_id",
        as: "reviewee",
      });
    }
  }
  Review.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      reviewerId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      revieweeId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.BIGINT,
        allowNull: true,
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

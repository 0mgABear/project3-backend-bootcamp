"use strict";

const { sequelize } = require("../models");
const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await sequelize.sync();

    return queryInterface.bulkInsert("reviews", [
      {
        reviewer_id: 2,
        reviewee_id: 1,
        description: "John is a great team member!",
        rating: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        reviewer_id: 1,
        reviewee_id: 2,
        description: "Jane is an excellent team leader!",
        rating: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("reviews", null, {});
  },
};

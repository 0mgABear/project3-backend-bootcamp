"use strict";

const { sequelize } = require("../models");
const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await sequelize.sync();

    const [jane, john] = await User.findAll({
      where: {
        [Sequelize.Op.or]: [{ first_name: "Jane" }, { first_name: "John" }],
      },
    });

    return queryInterface.bulkInsert("reviews", [
      {
        reviewer_id: jane.id,
        reviewee_id: john.id,
        description: "John is a great team member!",
        rating: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        reviewer_id: john.id,
        reviewee_id: jane.id,
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

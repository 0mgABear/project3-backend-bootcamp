"use strict";

const { User } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.bulkCreate([
      {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        company: "Acme Inc.",
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        email: "janedoe@example.com",
        company: "XYZ Ltd.",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await User.destroy({
      where: {
        email: ["johndoe@example.com", "janedoe@example.com"],
      },
    });
  },
};

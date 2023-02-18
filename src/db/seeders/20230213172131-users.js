"use strict";
const Sequelize = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        company: "Acme Inc.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        email: "janedoe@example.com",
        company: "XYZ Ltd.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};

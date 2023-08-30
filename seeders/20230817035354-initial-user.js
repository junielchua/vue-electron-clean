'use strict';
const { product, sale, sale_item, user } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await user.create({
      franchise_id: 10001,
      user_id: 'ID001',
      username: 'admin@gmail.com',
      password: 'admin',
      firstname: 'Juan',
      middlename: 'Dela',
      surname: 'Cruz',
      type: 'ADMIN',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await user.destroy({
      where: {
        username: "admin@gmail.com"
      }
    });
  }
};

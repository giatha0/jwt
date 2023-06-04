'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', // name of table
      [
        {
          email: 'John Doe',
          password: '123456',
          username: 'John Doe'
        },
        {
          email: 'John Doe2',
          password: '123456',
          username: 'John Doe2'
        },
        {
          email: 'John Doe3',
          password: '123456',
          username: 'John Doe3'
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

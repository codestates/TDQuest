'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    await queryInterface.bulkInsert('users', [{
      nickname: 'John',
      email: 'Doe',
      password: "123456",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert('characters', [{
      image: 'test.jpg',
      level: 100,
      status_phy: 150,
      status_int: 10,
      status_int: 10,
      medal: 'gold',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('characters', null, {});
  }
};
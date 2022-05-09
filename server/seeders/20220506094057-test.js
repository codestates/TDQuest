'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    const userId = await queryInterface.bulkInsert('users', [{
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
      status_spi: 10,
      medal: 'gold',
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId
    }]);

    await queryInterface.bulkInsert('todo_lists', [
    {
      content : "팔굽혀펴기 100회",
      kind : "phy",
      is_complete : true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId
    },
    {
      content : "공부 1시간",
      kind : "int",
      is_complete : true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId
    },
    {
      content : "백종원표 닭도리탕 만들기",
      kind : "spl",
      is_complete : false,
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId
    }
  ]);

  const monsterId = await queryInterface.bulkInsert('monsters', [{
    monster_image : "test.jpg",
    kind : 'phy',
    name : 'mustlemon',
    hp : 5000,
    reward : 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]);

  const raidsId = await queryInterface.bulkInsert('raids', [{
    hit_damage: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
    monster_id : monsterId
  }]);

  const damage_log_Id = await queryInterface.bulkInsert('damage_log', [{
    log: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
    raid_id : raidsId,
    user_id : userId
  }]);
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('characters', null, {});
    await queryInterface.bulkDelete('raids', null, {});
    await queryInterface.bulkDelete('todo_lists', null, {});
    await queryInterface.bulkDelete('monsters', null, {});
    await queryInterface.bulkDelete('damage_log', null, {});
  }
};
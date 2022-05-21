'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>  {
    const userId1 = await queryInterface.bulkInsert('users', [
      {
      nickname: 'LeeHyunJun',
      email: 'lucky.hyunjun@gmail.com',
      logintype : 'general',
      password: "123456",
      createdAt: new Date(),
      updatedAt: new Date()
      }]) 
     const userId2 = await queryInterface.bulkInsert('users', [
      {
        nickname: 'JiSungHyun',
        email: 'jiji6027@gmail.com',
        logintype : 'general',
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      const userId3 = await queryInterface.bulkInsert('users', [
      {
        nickname: 'CHoiChoongMan',
        email: 'tastestar91@gmail.com',
        logintype : 'general',
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      const userId4 = await queryInterface.bulkInsert('users', [
      {
        nickname: 'SinMinJun',
        logintype : 'google',
        email: 'mj.irin1260@gmail.com',
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      const userId5 = await queryInterface.bulkInsert('users', [
      {
        nickname: 'KimSangHun',
        logintype : 'kakao',
        email: 'mj.irin1260@gmail.com',
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      }])

    await queryInterface.bulkInsert('characters', [{
      image: 'test.jpg',
      totalExp: 100,
      status_phy: 150.5,
      status_int: 30.5,
      status_spi: 20.5,
      status_etc: 50,
      medal: 'gold',
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId1
    }]);

    await queryInterface.bulkInsert('characters', [{
      image: 'test.jpg',
      totalExp: 100,
      status_phy: 200.5,
      status_int: 0,
      status_spi: 0,
      status_etc: 50,
      medal: 'gold',
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId2
    }]);

    await queryInterface.bulkInsert('characters', [{
      image: 'test.jpg',
      totalExp: 100,
      status_phy: 500.5,
      status_int: 0,
      status_spi: 10,
      status_etc: 50,
      medal: 'gold',
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId3
    }]);

    await queryInterface.bulkInsert('characters', [{
      image: 'test.jpg',
      totalExp: 100,
      status_phy: 3000.5,
      status_int: 0,
      status_spi: 0,
      status_etc: 50,
      medal: 'gold',
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId4
    }]);

    await queryInterface.bulkInsert('characters', [{
      image: 'test.jpg',
      totalExp: 100,
      status_phy: 150.5,
      status_int: 10,
      status_spi: 10,
      status_etc: 50,
      medal: 'gold',
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId5
    }]);

    await queryInterface.bulkInsert('todo_lists', [
    {
      content : "팔굽혀펴기 100회",
      kind : "phy",
      is_complete : true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId1
    },
    {
      content : "윗몸일으키기 100개",
      kind : "phy",
      is_complete : true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId1
    },
    {
      content : "뜀걸음 100개",
      kind : "phy",
      is_complete : true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId1
    },
    {
      content : "공부 1시간",
      kind : "int",
      is_complete : true,
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId2
    },
    {
      content : "백종원표 닭도리탕 만들기",
      kind : "spi",
      is_complete : false,
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id : userId3
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

  const damage_log_Id1 = await queryInterface.bulkInsert('damage_logs', [{
    log: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
    raid_id : raidsId,
    user_id : userId1
  }]);
  const damage_log_Id2 = await queryInterface.bulkInsert('damage_logs', [{
    log: 40,
    createdAt: new Date(),
    updatedAt: new Date(),
    raid_id : raidsId,
    user_id : userId1
  }]);
  const damage_log_Id3 = await queryInterface.bulkInsert('damage_logs', [{
    log: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    raid_id : raidsId,
    user_id : userId1
  }]);
  const damage_log_Id4 = await queryInterface.bulkInsert('damage_logs', [{
    log: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
    raid_id : raidsId,
    user_id : userId2
  }]);
  const damage_log_Id5 = await queryInterface.bulkInsert('damage_logs', [{
    log: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
    raid_id : raidsId,
    user_id : userId3
  }]);
},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('characters', null, {});
    await queryInterface.bulkDelete('raids', null, {});
    await queryInterface.bulkDelete('todo_lists', null, {});
    await queryInterface.bulkDelete('monsters', null, {});
    await queryInterface.bulkDelete('damage_logs', null, {});
  }
};
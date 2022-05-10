import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  color_primary_green_light,
  color_secondary_beige,
} from '../../components/CommonStyle';
import {
  TodoContainer,
  TodoListPageHeader,
  SectionContainer,
  StatusContainer,
  RewardContainer,
  TitleContainer,
  ContentContainer,
  RewardInfo,
} from './TodoListPageStyle';
import Loading from '../../components/Loading';
import Status from '../../components/Status';
import HelperBear from '../../components/HelperBear';

function TodoListPage() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      {loading ? (
        <TodoContainer bgColor={color_primary_green_light}>
          <Loading customText='Loading...' />
        </TodoContainer>
      ) : (
        <TodoContainer bgColor={color_primary_green_light}>
          <TodoListPageHeader>
            <div className='headerContainer'>
              <img
                src={require('../../static/images/icons/Achievements.png')}
                alt='Achievements'
              />
              <h2>To-Do List</h2>
            </div>
          </TodoListPageHeader>
          <SectionContainer>
            <StatusContainer bgColor={color_secondary_beige}>
              <Status
                charData={dummyRes_getCharacterInfo.data.characterInfo}
                direction='row'
              ></Status>
            </StatusContainer>
            <RewardContainer bgColor={color_secondary_beige}>
              <TitleContainer>
                <img
                  src={require('../../static/images/icons/Ring.png')}
                  alt='Ring'
                />
                <h3>Today's Expected Reward</h3>
              </TitleContainer>
              <ContentContainer>
                {/* 추후 todolist 태스크별 포인트 계산하여 표시 */}
                <RewardInfo>
                  <h3>PHY + 1.5 Points</h3>
                  <h3>INT + 1.5 Points</h3>
                  <h3>SPI + 1.5 Points</h3>
                </RewardInfo>
                <HelperBear
                  width='150px'
                  height='80px'
                  text='Your completed tasks will be refreshed every midnight!
                  '
                ></HelperBear>
              </ContentContainer>
            </RewardContainer>
          </SectionContainer>
        </TodoContainer>
      )}
    </div>
  );
}

const dummyRes_getCharacterInfo = {
  data: {
    characterInfo: {
      id: 0,
      user_id: 'TEST_USER_1',
      image: 'char_default',
      level: 1250,
      status_phy: 50,
      status_int: 20,
      status_spl: 30,
      medal: 'medal',
      created_at: '2022-05-08',
      updated_at: '2022-05-08',
      // Server 측에서 추가로 계산하여 보내줄 데이터 (요청예정)
      userLevel: 13,
      userExp: 50,
    },
  },
};

export default TodoListPage;

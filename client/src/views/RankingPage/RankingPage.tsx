import React from 'react';
import {
  RankingContainer,
  RankingPageHeader,
  SectionContainer,
  StatusContainer,
  RewardContainer,
  TitleContainer,
  ContentContainer,
  RewardInfo,
} from './RankingPageStyle';
import Status from '../../components/Status';
import {
  color_primary_green_light,
  color_secondary_beige,
  color_context_beige,
} from '../../components/CommonStyle';
import RankingListContainer from './RankingListContainer';

function RankingPage() {
  return (
    <RankingContainer>
      <RankingPageHeader>
        <div className='headerContainer'>
          <img
            src={require('../../static/images/icons/Leaderboard.png')}
            alt='Leaderboard'
          />
          <h2>Ranking</h2>
        </div>
      </RankingPageHeader>
      <SectionContainer>
        <StatusContainer bgColor={color_secondary_beige}>
          <Status
            charData={dummyRes_getCharacterInfo.data.characterInfo}
            direction='row'
          ></Status>
        </StatusContainer>
        <RewardContainer bgColor={color_secondary_beige}>
          <TitleContainer>
            {/* <img
              src={require('../../static/images/icons/Ring.png')}
              alt='Ring'
            /> */}
            <h3>Top Ranking</h3>
          </TitleContainer>
          <ContentContainer>
            {/* 추후 todolist 태스크별 포인트 계산하여 표시 */}
            <RewardInfo>
              <h3>left</h3>
            </RewardInfo>
            <div>
              <h3>right</h3>
            </div>
          </ContentContainer>
        </RewardContainer>
      </SectionContainer>
      <SectionContainer>
        <RankingListContainer
          title='PHY Ranking'
          icon='Physical.png'
        ></RankingListContainer>
        <RankingListContainer
          title='INT Ranking'
          icon='Intelligence.png'
        ></RankingListContainer>
        <RankingListContainer
          title='SPI Ranking'
          icon='Spirit.png'
        ></RankingListContainer>
      </SectionContainer>
    </RankingContainer>
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
      status_spi: 30,
      medal: 'medal',
      created_at: '2022-05-08',
      updated_at: '2022-05-08',
      // Server 측에서 추가로 계산하여 보내줄 데이터 (요청예정)
      userLevel: 13,
      userExp: 50,
    },
  },
};

export default RankingPage;

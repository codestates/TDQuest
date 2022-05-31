import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import {
  getRankingListAsync,
  getTopRankerAsync,
} from '../../features/ranking/rankingSlice';
import crownIcon from '../../static/images/icons/Crown.png';

function RankingPage() {
  const dispatch: any = useDispatch();
  const phyRankingList: any = useSelector(
    (state: any) => state.ranking.rankingList.phyRank
  );
  const intRankingList: any = useSelector(
    (state: any) => state.ranking.rankingList.intRank
  );
  const spiRankingList: any = useSelector(
    (state: any) => state.ranking.rankingList.spiRank
  );
  const topRanker: any = useSelector((state: any) => state.ranking.top);
  const topRankerTotalPoint = (arg: any) => {
    return arg.status_phy + arg.status_int + arg.status_spi + arg.status_etc;
  };

  useEffect(() => {
    // 유저가 작성한 todo 목록 가져오기 (incompleted task)
    dispatch(getRankingListAsync());
    dispatch(getTopRankerAsync());
  }, []);

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
            <RewardInfo>
              <h3>left</h3>
            </RewardInfo>
            <div>
              <h3>This week's best user</h3>
              <p>
                <img src={crownIcon} alt='crown'></img>
                {topRanker.user ? topRanker.user.nickname : 'test'}
              </p>
              <p>
                Total stats:{' '}
                {topRanker.user ? topRankerTotalPoint(topRanker) : 0} points
              </p>
            </div>
          </ContentContainer>
        </RewardContainer>
      </SectionContainer>
      <SectionContainer>
        <RankingListContainer
          title='PHY Ranking'
          icon='Physical.png'
          rankingList={phyRankingList}
        ></RankingListContainer>
        <RankingListContainer
          title='INT Ranking'
          icon='Intelligence.png'
          rankingList={intRankingList}
        ></RankingListContainer>
        <RankingListContainer
          title='SPI Ranking'
          icon='Spirit.png'
          rankingList={spiRankingList}
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

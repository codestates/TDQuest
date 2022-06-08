import React, { useState } from "react";
import styled from "styled-components";
import {
  fontSize_h3_laptop,
  fontSize_h3_tablet,
  color_border_yellow,
  color_context_beige,
  color_context_brown,
  color_white,
} from "../../components/CommonStyle";
import crownIcon from "../../static/images/icons/Crown.png";

const Container = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: 100%;
  min-height: 400px;
  max-height: 550px;
  /* border: 1px solid ${color_border_yellow}; */
  display: grid;
  grid-template-rows: 40px 1fr;
  overflow: auto;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const TitleContainer = styled.div`
  width: 100%;
  background-color: ${color_context_brown};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 20px;
    margin-right: 5px;
  }
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: "Fredoka One", cursive;
    color: ${color_white};
    @media (max-width: 768px) {
      font-size: ${fontSize_h3_tablet};
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  width: 100%;
  font-family: "Fredoka One", cursive;
  .category,
  .stat_point {
    font-family: "OpenSans";
    font-weight: 650;
  }
`;

const Item = styled.div`
  width: 85%;
  border: none;
  background-color: ${color_white};
  min-height: 50px;
  margin-top: 15px;
  display: grid;
  grid-template-columns: 180px 1fr 100px;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 3px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  img {
    margin-right: 5px;
    height: 25px;
  }
  div {
    width: 100%;
    text-align: right;
  }
`;

function RankingListContainer({
  title,
  icon, // title 앞에 있는 아이콘
  rankingList,
  category,
}: {
  title: string;
  icon?: string | undefined;
  rankingList?: any | undefined;
  category: string;
}) {
  return (
    <Container bgColor={color_context_beige}>
      <TitleContainer>
        {icon ? (
          <img src={require(`../../static/images/${icon}`)} alt="icon" />
        ) : (
          ""
        )}
        <h3>{title}</h3>
      </TitleContainer>
      <ContentContainer>
        {rankingList
          ? rankingList.map((el: any, index: number) => (
              <Item key={el.id}>
                <p>
                  {index === 0 ? <img src={crownIcon} alt="icon" /> : ""}
                  {el.user.nickname}
                </p>
                <div className="category">{category}</div>
                <div className="stat_point">
                  {category === "PHY"
                    ? el.status_phy
                    : category === "INT"
                    ? el.status_int
                    : el.status_spi}
                  {"  "}
                  point
                </div>
              </Item>
            ))
          : ""}
      </ContentContainer>
    </Container>
  );
}

export default RankingListContainer;

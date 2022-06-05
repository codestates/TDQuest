import HpBar from './HpBar'
import styled from 'styled-components';
import {
  color_menu_header_purple, 
  fontSize_h2_laptop,
  fontSize_h2_mobile,
  color_context_brown,
  color_secondary_beige,
  color_border_yellow,
  fontSize_body_mobile_medium,
  fontSize_body_mobile_small,
  fontSize_h2_tablet
} from '../../components/CommonStyle';

type RaidInfo = {
  name? : string,
  hp? : string,
  reward? : string,
  image? : string,
};

export const BossInfo = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    height : ${fontSize_h2_laptop};
  }

  > div:first-child{
    padding-top : 2rem;
    display: flex;
    height: 7rem;
    line-height: 150%;
    flex-direction: column;
    align-items: center;
    font-size: ${fontSize_h2_laptop};
    color : ${color_menu_header_purple}
  }

  > div:nth-child(2) {
    padding-top : 1.5rem;
    text-align: center;
    line-height: 130%;
    font-weight: bolder;
    font-family: "OpenSans";
  }


  @media (max-width:1000px) {
    img {
      height : ${fontSize_h2_tablet};
    }
    > div:first-child{
      font-size: ${fontSize_h2_tablet};
    }
  }

  @media (max-width:768px) {
    img {
      height : ${fontSize_h2_mobile};
    }
    > div:first-child{
      padding-top: 0rem ;
      font-size: ${fontSize_h2_mobile};
    }

    > div:nth-child(2){
      padding-top: 0rem;
    }
  }
`
export const BossView = styled.div` 
  /* width: 100%; */
  display: flex;
  margin-top: 1rem;
  > img {
    background: linear-gradient(#686cd5 80%, #997a66 20%);
    width: 100%;
    object-fit: contain;
    height : 15rem;
    border-radius : 10px;
  }
  //hp 관련
  > div {
    width: 100%;
    margin-top : 2rem;
    display: flex;
    overflow: hidden;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: ${fontSize_h2_laptop};
  }

  @media (max-width:768px) {
    > div {
      margin-top: 1rem;
    }
  }
`

export const BossReward = styled.div`
  /* width : 100%; */
  div {
    border : 1px ${color_border_yellow} solid;
    width : 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }

  > div:first-child{
    height : 2.5rem;
    background-color: ${color_context_brown};
  }

  > div:nth-child(2){
    background-color: ${color_secondary_beige};
    height : 13rem;
    line-height: 140%;
  }

  @media (max-width:1000px) {
    > div:first-child{
      font-size : ${fontSize_body_mobile_medium};
    }
    > div:nth-child(2){
      font-size : ${fontSize_body_mobile_small}
    }
  }

  @media (max-width:768px) {
    > div:first-child{
      margin-top: 1rem;
    }
  }
`

  const RaidJoinContainer = styled.div<RaidInfo>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width : 100%;

  > div {
    //!
    width : 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    //!
  }

  > div:nth-child(2) {
    width : 30%;
  }

  @media (max-width:768px) {
    width: 500px;
    flex-wrap : wrap;
    > div {
      width : 150px;
    }

    > div:nth-child(2){
      width: 353px;
      order : -1;
    }
}
`

function RaidInfoBox({
  name,
  hp,
  reward,
  image,
}: RaidInfo) {
  return (
    <RaidJoinContainer name={name} hp={hp} reward={reward} image={image}>
      <BossInfo>
        <div>
          <span>
            <img src={require('../../static/images/icons/flag.png')} />
            {name}
          </span>
          <span>
            LV3
          </span>
        </div>
        <div>
          {'The dragon who live in muscle area,\nHe has beautiful muscle scale and claws...\nparticipate this raid and get awards'}
        </div>
      </BossInfo>
      <BossView>
        <img src={image? require("../../static/images/" + {image} + ".gif") : require("../../static/images/monster_phy.gif")}></img>
        <div>
          HP 
          <HpBar max={Number(hp)} current={Number(hp)}/>
        </div>
      </BossView>
      <BossReward>
        <div>
          <span>
            <img src={require("../../static/images/icons/Ring.png")}/>
            {` Expected Reward`}
          </span>
        </div>
        <div>
          <ul>
            <li>{reward}</li>
            <li>INT +1 point</li>
            <li>SPI +1 point</li>
          </ul>

          <ul>
            <li>Armor of dragon scale</li>
            <li>Sword of dragon</li>
            <li>Random Pet egg(rare)</li>
          </ul>
        </div>
      </BossReward>
    </RaidJoinContainer>
  )
}

export default RaidInfoBox
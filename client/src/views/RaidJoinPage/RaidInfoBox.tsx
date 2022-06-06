import HpBar from './HpBar'
import styled from 'styled-components';
import {
  color_menu_header_purple, 
  fontSize_h2_laptop,
  fontSize_h2_mobile,
  fontSize_h3_tablet,
  fontSize_h3_mobile,
  fontSize_body_laptop_small,
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
  kind? : string,
};

export const BossInfo = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    height : ${fontSize_h2_laptop};
    image-rendering: pixelated;
    margin-right: 0.3rem;
  }

  > div:first-child{
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
    padding-bottom : 2rem;
    text-align: center;
    line-height: 130%;
    font-weight: bolder;
    font-size : 15px;
    font-family: "OpenSans";
  }


  @media (max-width:1200px) {
    img {
      height : ${fontSize_h3_tablet};
    }
    > div:first-child{
      padding-top: 1.5rem;
      font-size: ${fontSize_h3_tablet};
    }

    > div:nth-child(2) {
      padding-top : 0rem;
    }
  }

  @media (max-width:768px) {
    img {
      height : ${fontSize_h3_mobile};
    }
    > div:first-child{
      font-size: ${fontSize_h3_mobile};
      height: 6rem;
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
  kind
}: RaidInfo) {
  return (
    <RaidJoinContainer name={name} hp={hp} reward={reward} image={image} kind={kind}>
      <BossInfo>
        <div>
          <span>
            <img src={
              kind? require("../../static/images/" + `${kind}` + ".png") : require('../../static/images/icons/flag.png')} />
            {name?.split(" ").length === 2 ? name?.split(" ")[0] : name?.split(" ").slice(0,2).join(" ")}
          </span>
          <span>
          {name?.split(" ").length === 2 ? name?.split(" ")[1] : name?.split(" ")[2]}
          </span>
        </div>
        <div>
          <p>The dragon who live in muscle area,</p>
          <p>He has beautiful muscle scale and claws...</p>
          <p>participate this raid and get awards</p>
        </div>
      </BossInfo>
      <BossView>
        <img src={image? require("../../static/images/" + `${image}` + ".gif") : require("../../static/images/monster_phy.gif")}></img>
        <div>
          HP 
          <HpBar max={5000} current={Number(hp)}/>
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
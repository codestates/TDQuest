import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button'
import {
  RaidJoinContainer,
  ParticipateContainer,
  Header,
  Body,
  Foot,
  NavDot,
  SlideContainer,
  RaidInfoBoxContainer,
  BossInfo,
  BossView,
  BossReward,
} from './RaidJoinStyle'
import HpBar from './HpBar'
import { useNavigate } from 'react-router-dom';
//!
import {TDQuestAPI} from '../../API/tdquestAPI'

function RaidJoinPage() {
  const [currentPage, setCurrentPage] = useState({
    page : "PHY",
    id : 8,
  });
  let initialTime = new Date()
  const [leftTime, setLeftTime] = useState(
    getLeftTime(initialTime.getDay() === 6 || initialTime.getDay() === 0, initialTime)
    );
  const [canRaid, setCanRaid] = useState(initialTime.getDay() === 6 || initialTime.getDay() === 0);
  
  const slidePage = useRef<any>(null);
  let isLogin = window.localStorage.getItem("isLogin")? JSON.parse(window.localStorage.getItem("isLogin") || "") : false;
  const navigate = useNavigate();
  
  const handleSlide = (direction : string) => {
    if (direction === "left"){
      if (currentPage.page === "PHY" && slidePage.current){
        slidePage.current.style.transform = "translate(calc(100%/3))"
        setCurrentPage({
          page : "INT", 
          id : 7
        })
      } else if (currentPage.page === "SPI" && slidePage.current){
        slidePage.current.style.transform = ""
        setCurrentPage({
          page : "PHY",
          id : 8
        }
          
        )
      }
    } else {
      if (currentPage.page === "PHY" && slidePage.current){
        slidePage.current.style.transform = "translate(calc(-100%/3))"
        setCurrentPage({
          page :"SPI",
          id : 9
        })
      } else if (currentPage.page === "INT" && slidePage.current){
        slidePage.current.style.transform = ""
        setCurrentPage({
          page :"PHY",
          id : 8
        })
      }
    }
  };

  const handleDot= (location : string) => {
    if (location === "left"){
      slidePage.current.style.transform = "translate(calc(100%/3))"
      setCurrentPage({
        page : "INT" ,
        id : 7
      })
    } 
    
    if (location === "center"){
      slidePage.current.style.transform = ""
      setCurrentPage({
        page : "PHY",
        id : 8
      })
    } 
    
    if (location === "right"){
      slidePage.current.style.transform = "translate(calc(-100%/3))"
      setCurrentPage({
        page : "SPI",
        id : 9
      })
    } 
  };

  function getLeftTime(weekend : boolean, currentTime : Date){
    type LeftTime = {
      days : number,
      hours : number,
      mins : number
    }
    
    let tomarrowMidNight : Date = new Date();
    tomarrowMidNight.setHours(0);
    tomarrowMidNight.setMinutes(0);
    tomarrowMidNight.setSeconds(0);
    tomarrowMidNight.setDate(tomarrowMidNight.getDate() + 1)

    let diff : number = tomarrowMidNight.getTime() - currentTime.getTime();
    const left : LeftTime = {
      days : currentTime.getDay() === 6 ? 1 : 0,
      hours : Math.floor(diff / (1000 * 60 * 60)),
      mins : Math.floor(diff / (1000 * 60) % 60)
    }

    if (!weekend) {
      left.days =  5 - currentTime.getDay()
    }
    return left;
  }

  const handleTime = (currentTime : Date) => {
    if (currentTime.getDay() === 6 || currentTime.getDay() === 0){
      setLeftTime(getLeftTime(true, currentTime));
      setCanRaid(true)
    } else {
      setLeftTime(getLeftTime(false, currentTime));
      setCanRaid(false)
    } 
  };

  const handleParticipate = () => {
    canRaid? navigate("/raid") : alert("you can raid only weekend")
  }

  const participate = async(monsterId : number) => {
    try{
      const paricipateFunc = await TDQuestAPI.post(`/raids/invite?user_id=${isLogin.userInfo.id}&raid_id=${monsterId}`)
      console.log(paricipateFunc)
      const damage_logInfo = await TDQuestAPI.get(`/raids/damage_logs?raid_id=${monsterId}`)
      const newIsLogin = {...isLogin, damage_logInfo}
      localStorage.setItem('isLogin', JSON.stringify(newIsLogin));
      navigate("/raid")
    } catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    initialTime = new Date();
    let newisLogin = window.localStorage.getItem("isLogin")? JSON.parse(window.localStorage.getItem("isLogin") || "") : false;
    console.log('etst',newisLogin)
    setTimeout(()=>handleTime(initialTime), 30000)
  }, [leftTime]);

  return (
  <RaidJoinContainer>
    //!
    <button onClick={()=>participate(currentPage.id)}>참가버튼 테스트</button>
    <ParticipateContainer>
      <Header>
        <div>
          <span onClick={()=>handleSlide("left")}>{` < `}</span>
          <span>
            <img src={require('../../static/images/icons/RaidPageHeader.png')}/>
            {` This Week's Boss Raid (${currentPage.page})`}
          </span>
          <span onClick={()=>handleSlide("right")}>{` > `}</span>
        </div>

        <div>
          <NavDot thisDot='INT' state={currentPage.page} onClick={()=>handleDot("left")}>●</NavDot>
          <NavDot thisDot='PHY' state={currentPage.page} onClick={()=>handleDot("center")}>●</NavDot>
          <NavDot thisDot='SPI' state={currentPage.page} onClick={()=>handleDot("right")}>●</NavDot>
        </div>
      </Header>

      <Body>
        <SlideContainer ref={slidePage}>
          <RaidInfoBoxContainer>
            <BossInfo>
              <div>
                <span>
                  <img src={require('../../static/images/icons/flag.png')}/>
                  Fire Dragon
                </span>
                <span>
                  LV3
                </span>
              </div>
              <div>
                {'The dragon who live in muscle areas,\nHe has beautiful muscle scale and claws...\nparticipate this raid and get awards'}
              </div>
            </BossInfo>
            <BossView>
              <img src={require("../../static/images/monster_int.gif")}></img>
              <div>
                HP 
                <HpBar max={12345} current={12340}/>
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
                  <li>PHY +5 point</li>
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
          </RaidInfoBoxContainer>

          <RaidInfoBoxContainer>
            <BossInfo>
              <div>
                <span>
                  <img src={require('../../static/images/icons/flag.png')}/>
                  Fire Dragon
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
              <img src={require("../../static/images/monster_phy.gif")}></img>
              <div>
                HP 
                <HpBar max={10} current={9}/>
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
                  <li>PHY +5 point</li>
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
          </RaidInfoBoxContainer>

          <RaidInfoBoxContainer>
            <BossInfo>
              <div>
                <span>
                  <img src={require('../../static/images/icons/flag.png')}/>
                  Fire Dragon
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
              <img src={require("../../static/images/monster_spi.gif")}></img>
              <div>
                HP 
                <HpBar max={20} current={5}/>
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
                  <li>PHY +5 point</li>
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
          </RaidInfoBoxContainer>
        </SlideContainer>
      </Body>
      
      <Foot>
        <span>
          <Button text={"Participate !"} width={"270px"} height={"60px"} fontSize={"32px"} onClick={handleParticipate}/>
          <img src={require("../../static/images/HelperBear.png")}/>
        </span>
        {canRaid? `Raid Start Time Left` : `Until Raid Time`} : {`${leftTime.days}d ${leftTime.hours}h ${leftTime.mins}min`}
      </Foot>
    </ParticipateContainer> 
  </RaidJoinContainer>
  )
}

export default RaidJoinPage
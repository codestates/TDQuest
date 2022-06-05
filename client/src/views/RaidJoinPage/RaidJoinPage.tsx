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
} from './RaidJoinStyle'
import Loading from '../../components/Loading';
import RaidInfoBox from './RaidInfoBox';
import { useNavigate } from 'react-router-dom';
//!
import { TDQuestAPI } from '../../API/tdquestAPI'
import { getMonsterInfo, MonstersInfo } from '../../features/raidjoin/raidjoinSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Toast } from "../../components/Toast"

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
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const slidePage = useRef<any>(null);
  let isLogin = window.localStorage.getItem("isLogin")? JSON.parse(window.localStorage.getItem("isLogin") || "") : false;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const monsterInfo : MonstersInfo = useAppSelector((store)=>store.raidjoin) 

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

  const handleParticipate = (monsterId : number) => {
    let local = window.localStorage.getItem("isLogin")? JSON.parse(window.localStorage.getItem("isLogin") || "") : false;
    if (canRaid){
      setShowToast(true)
      if (local.damage_logInfo){
        setToastText("you are already participated!")
      } else {
        participate(monsterId);
        setToastText("participate in raid on weekend!")
      }
    } else {
      setToastText("you can raid only weekend")
    }
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  }

  const participate = async(monsterId : number) => {
    try{
      const paricipateFunc = await TDQuestAPI.post(`/raids/invite?user_id=${isLogin.userInfo.id}&raid_id=${monsterId}`)
      console.log(paricipateFunc)
      const damage_logInfo = await TDQuestAPI.get(`/raids/damage_logs?raid_id=${monsterId}`)
      console.log("damage_loginfo" , damage_logInfo)
      const newIsLogin = {...isLogin, damage_logInfo : damage_logInfo.data}
      localStorage.setItem('isLogin', JSON.stringify(newIsLogin));
    } catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(loading){
      initialTime = new Date();
      dispatch(getMonsterInfo());
      setTimeout(()=>setLoading(false), 1000);
    }
    let newisLogin = window.localStorage.getItem("isLogin")? JSON.parse(window.localStorage.getItem("isLogin") || "") : false;
    console.log('storage:', newisLogin)
    setTimeout(()=>handleTime(initialTime), 30000);
  }, [leftTime]);
  
  return (
  <RaidJoinContainer>
    {loading? (<Loading customText="Loading..." />):
    (
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
        {monsterInfo.monsterInfo.map((el: any) => (
          <RaidInfoBox name={el.monsterInfo.name} hp={el.monsterInfo.hp} reward={el.monsterInfo.reward} image={el.monsterInfo.monster_image} kind={el.monsterInfo.kind} ></RaidInfoBox>
        ))}
          {/* <RaidInfoBox name="test" hp="10" reward="test" ></RaidInfoBox>
          <RaidInfoBox name="test" hp="10" reward="test" ></RaidInfoBox>
          <RaidInfoBox name="test" hp="10" reward="test" ></RaidInfoBox> */}
        </SlideContainer>
      </Body>
      
      <Foot>
        <span>
          <Button text={"Participate !"} width={"270px"} height={"60px"} fontSize={"32px"} onClick={()=>handleParticipate(currentPage.id)}/>
          <img src={require("../../static/images/HelperBear.png")}/>
        </span>
        {canRaid? `Raid Start Time Left` : `Until Raid Time`} : {`${leftTime.days}d ${leftTime.hours}h ${leftTime.mins}min`}
      </Foot>
      {showToast ? <Toast text={toastText}></Toast> : ''}
    </ParticipateContainer> 
    )}
  </RaidJoinContainer>
  )
}

export default RaidJoinPage


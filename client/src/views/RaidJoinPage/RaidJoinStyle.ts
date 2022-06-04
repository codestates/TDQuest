import styled from 'styled-components';
import {
  color_menu_header_purple, 
  color_primary_green_light, 
  fontSize_h1_laptop,
  fontSize_h2_laptop,
  fontSize_h1_mobile,
  fontSize_h2_mobile,
  fontSize_h3_mobile,
  fontSize_body_laptop,
  color_context_brown,
  color_secondary_beige,
  color_border_yellow,
  color_primary_green_medium,
  fontSize_body_mobile_medium,
  fontSize_body_mobile_small,
  fontSize_h2_tablet
} from '../../components/CommonStyle';

export const RaidJoinContainer = styled.div`
  background-color: ${color_primary_green_light};
  height: 100%;
  padding-top : 80px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family : 'Fredoka One', cursive;
`;

export const ParticipateContainer = styled.div`
  height: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`
export const Header = styled.div`
  width : 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div:first-child{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom:1rem;
    font-size : ${fontSize_h1_laptop};
    @media (max-width:768px) {
      font-size : ${fontSize_h1_mobile};
    }

    @media (max-width:500px) {
      font-size : ${fontSize_h3_mobile};
    }
    > span:first-child, >span:last-child {
      &:hover{
        color: gray;
        cursor: pointer;
      }
    }
  
    span:nth-child(2) {
      padding-left: 2rem;
      padding-right: 2rem;
      @media (max-width:400px) {
        padding-left: 1rem;
        padding-right: 1rem;
      }
      > img {
        height: ${fontSize_h1_laptop};
        @media (max-width:768px) {
          height: ${fontSize_h1_mobile};
        }

        @media (max-width:400px) {
          height : ${fontSize_h3_mobile};
        }
        image-rendering: pixelated;
      }
    }
  }
  //dot
  > div:last-child{
    margin-top: 1rem;
    color : #d1d1d1;
    font-size: ${fontSize_h2_laptop};
    @media (max-width:768px) {
      margin-top : 0.5rem;
      font-size : ${fontSize_h2_mobile};
    }
    > span {
      margin : 2rem;
      @media (max-width:768px) {
      margin: 1rem;
    }
    }
  }
`
export const NavDot = styled.span<{state? : string, thisDot? : string}>`
  color : ${(props)=> props.state === props.thisDot? "#abababdf" : "#dddddd"};
  transition-duration: 0.5s;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  align-items: center;
  justify-content: space-around;
  //!
  width : 1000px;
  @media (max-width:1200px) {
    width : 700px;
  }

  @media (max-width:768px) {
    width : 400px;
  }
  //!
`

export const SlideContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  //!
  width : 300%;
  /* height: 30%; */
  //!
  transition-duration: 0.5s;

  @media (max-width:768px) {
    width: 1500px;
  }
`
export const Foot = styled.div`
  display: flex;
  flex-direction: column;
  align-items : center;
  width : 100%;
  margin : 1rem;
  margin-bottom: 4rem;

  > span {
    display: flex;
    align-items: center;
    margin : 1rem;
    margin-bottom : 2rem;
    > img {
      margin-left: 1rem;
      image-rendering: pixelated;
      height: 50px;
    }
  }
`

export const StandByContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    width : 500px;
    > img {
      width : 100%;
      image-rendering: pixelated;
    }
  }
`



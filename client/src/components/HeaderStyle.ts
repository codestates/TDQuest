import styled from 'styled-components';

export const HeaderContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 80px;
  font-family: 'Fredoka One', cursive;
  font-size: 35px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  a {
    display: flex;
    align-items: center;
    padding-left: 3vw;
    height: 40px;
    color: white;
  }
`;

export const LogoImage = styled.img`
  height: 40px;
`;

export const MenuBarContainer = styled.div`
  width: 60%;
  height: 50px;
  /* display: flex; */
  /* justify-content: space-between; */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 30px;
  /* padding-left: 2vw;
  padding-right: 2vw; */
  @media (max-width: 768px) {
    display: none;
  }
`;

interface IMenuBar {
  active: boolean;
  bodyColor: string;
}

export const MenuBar = styled.div<IMenuBar>`
  /* display: flex; */
  /* align-items: flex-end; */
  font-size: 25px;
  color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: ${(props) => (props.active ? props.bodyColor : '')};
  text-align: center;
  padding-top: 10px;
  width: 100%;
  font-family: 'Fredoka One', cursive;
  a {
    &:hover {
      color: #194795;
    }
  }
`;

export const SignHandler = styled.div`
  background-color: #509b67;
  padding-right: 3vw;
  border: none;
  font-family: 'Fredoka One', cursive;
  font-size: 30px;
  color: white;
`;

export const ToggleMenu = styled.div`
  padding-right: 3vw;
  border: none;
  z-index: 10;
`;

export const ToggleIcon = styled.img`
  width: 40px;
  cursor: pointer;
`;

export const DropDownContainer = styled.div`
  /* this is how we cover the entire page */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

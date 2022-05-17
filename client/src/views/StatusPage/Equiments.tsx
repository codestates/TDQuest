import styled from "styled-components";
import {
  fontSize_h1_laptop,
  fontSize_h2_laptop,
  fontSize_h3_laptop,
  fontSize_body_mobile_medium,
  fontSize_body_mobile_small,
  fontSize_body_laptop,
  color_menu_header_purple,
  color_border_yellow,
  color_border_underbar_brown,
  color_secondary_beige,
  color_context_gray,
} from "../../components/CommonStyle";


const MyEquipmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 48%;
  h3 {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: "Fredoka One", cursive;
    color: ${color_menu_header_purple};
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 3px solid ${color_border_underbar_brown};
  }
`;


function Equipment () {
  return (
    <MyEquipmentsWrapper>
      <h3>My Equipments</h3>
    </MyEquipmentsWrapper>
  )
}

export default Equipment;
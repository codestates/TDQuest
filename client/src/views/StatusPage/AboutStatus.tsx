import React from "react";
import styled from "styled-components";
import {
  fontSize_h3_laptop,
  color_context_gray,
  color_menu_header_purple,
  color_border_yellow,
  color_secondary_beige,
} from "../../components/CommonStyle";

const AboutStatusContainer = styled.div`
  display: flex;
  width: 90%;
  height: 20%;
  min-height: 150px;
  border: 1px solid ${color_border_yellow};
  background-color: ${color_secondary_beige};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    min-height: auto;
    align-items: center;
  }
  .imageContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 160px;
    min-width: 160px;
    margin-left: 20px;
    img {
      width: 70px;
      @media (max-width: 768px) {
        width: 70px;
      }
    }
    h3 {
      font-size: ${fontSize_h3_laptop};
      font-family: "Fredoka One", cursive;
      color: ${color_menu_header_purple};
      margin-bottom: 10px;
    }
    @media (max-width: 768px) {
      flex-direction: row;
      margin: 15px 0;
      width: 100%;
    }
  }
  .about_title {
    color: ${color_context_gray};
  }
  .about_description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 50px;
    padding: 5px;
    font-family: "Fredoka One", cursive;
    .about_container {
      display: flex;
      @media (max-width: 912px) {
        margin-top: 10px;
        flex-direction: column;
      }
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
    div {
      margin-bottom: 5px;
    }
    p {
      width: 100%;
      margin-left: 3px;
      margin-bottom: 5px;
      color: ${color_context_gray};
    }
    @media (max-width: 768px) {
      margin: 10px;
      flex-direction: column;
    }
  }
`;

function AboutStatus(): JSX.Element {
  return (
    <AboutStatusContainer>
      <div className="imageContainer">
        <h3>About Status</h3>
        <img
          src={require("../../static/images/AboutStatus.png")}
          alt="AboutStatus_image"
        ></img>
      </div>
      <div className="about_description">
        <div className="about_physical about_container">
          <div className="about_title">Physical:</div>
          <p>
            Stats that rise when you do physical things (ex : exercise, dance
            sports...)
          </p>
        </div>
        <div className="about_intelligence about_container">
          <div className="about_title">Intelligence:</div>
          <p>
            Stats that go up when you're doing intellectual activities (ex :
            study, reading books...){" "}
          </p>
        </div>
        <div className="about_spirit about_container">
          <div className="about_title">Sprit:</div>
          <p> Stats that rise when you do need patience activities</p>
        </div>
      </div>
    </AboutStatusContainer>
  );
}

export default AboutStatus;

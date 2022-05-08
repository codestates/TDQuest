import React from "react";
import styled from "styled-components";

const AboutStatusContainer = styled.div`
  display: flex;
  width: 90%;
  height: 20%;
  min-height: 150px;
  border: 1px solid #dbae0d;
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
      width: 90px;
    }
    h1 {
      font-size: 1.2rem;
      font-family: "Fredoka One", cursive;
      color: #414693;
      margin-bottom: 10px;
    }
    @media (max-width: 768px) {
      flex-direction: row;
      margin: 20px 0;
      width: 100%;
    }
  }
  .about_title {
    color: #515151;
  }
  .about_description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 50px;
    padding: 5px;
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
      color: #515151;
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
        <h1>About Status</h1>
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

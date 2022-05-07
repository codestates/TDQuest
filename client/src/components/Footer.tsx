import React from 'react';
import {
  FooterContainer,
  Description,
  DescWrapper,
  LogoWrapper,
} from './FooterStyle';

function Footer() {
  return (
    <FooterContainer>
      <Description>
        <DescWrapper>
          <p>Contact</p>
          <br />
          <p>About Us</p>
          <br />
          <p>Terms & Conditions</p>
          <br />
        </DescWrapper>

        <DescWrapper>
          <p>Change country</p>
          <br />
          <p>FAQ</p>
          <br />
        </DescWrapper>
      </Description>

      <LogoWrapper>
        <h1>TDQuest</h1>
        <br />
        <p>Copyright © 2022 5B's</p>
      </LogoWrapper>
    </FooterContainer>
  );
}

export default Footer;

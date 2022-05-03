import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 150px;
  display: ;
`;

const Description = styled.section`
  height: 100px;
`;

const Logo = styled.div`
  height: 100px;
`;

function Footer({ bgColor }: { bgColor: string }) {
  return <FooterContainer bgColor={bgColor}></FooterContainer>;
}

export default Footer;

import styled from "styled-components";
import {
  fontSize_h1_laptop,
  fontSize_body_laptop_small,
  color_primary_green_light,
  fontSize_h1_mobile,
  fontSize_h2_mobile,
  fontSize_body_mobile_small
} from "./CommonStyle";

export const InputBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin : 3rem;
  `;

export const Headline = styled.div<{font?: string}>`
  display: flex;
  font-family: ${(props)=>props.font || "Fredoka One"}, cursive;
  flex-direction: row;
  margin-bottom: 2rem;


  > h1 {
    font-size : 57px;
  }

  > img {
    image-rendering:pixelated;
    width: 57px;
    object-fit: contain;
    margin-right : 1rem;
  }


  @media (max-width: 768px) {
    margin-bottom: 1rem;
    > h1 {
      font-size: ${fontSize_h2_mobile};
    }
    > img {
      width: ${fontSize_h1_mobile};
      margin-right: 0.5rem;
    }
  }
`

export const FormContainer = styled.form`
  width: 25rem;
  padding : 4rem;
  background : ${color_primary_green_light};
  box-shadow: 0 0 10px gray;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width : 12rem;
    padding : 2rem;
  }
`

export const InputContainer = styled.div<{
  font? : string;
  display? : boolean;
  }>`

  width: 100%;
  display : ${(props)=> props.display? "none" : "flex"};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: ${(props)=> props.font || "Fredoka One"}, cursive;
  font-size: ${fontSize_h1_laptop};

  > span:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;

    > span {
      height: ${fontSize_h1_laptop};
    }
  }


  > span:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;

    > input {
      :focus {
        outline: none;
      }
      height: ${fontSize_h1_laptop};
      width: 15rem;
      border : 2px #37dcee solid;
      border-radius: 3px;
    }

    > span {
      font-size: ${fontSize_body_laptop_small};
      font-family: sans-serif ;
      padding-top: 0.3rem;
      height: ${fontSize_h1_laptop};
      width: 15rem;
    }
  }


  @media (max-width: 768px) {
    font-size: ${fontSize_h2_mobile};
    > span:first-child {
      > span {
        height: ${fontSize_h2_mobile};
      }
    }

    > span:last-child {
      > input {
        height: ${fontSize_h2_mobile};
        width: 7rem;
      }

      > span {
        visibility: hidden;
        font-size: ${fontSize_body_mobile_small};
        padding-top: 0;
        height: ${fontSize_h2_mobile};
        width: 7rem;
      }
    }
  }

`;

export const DontYouSign = styled.div`
  margin-top: 1rem;
  font-family: sans-serif;
  flex-direction : column;
  text-align: center;

  p:last-child{
    color: #0077ff;
    text-decoration: underline;
    margin-top : 1rem;
    :hover {
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    p:last-child{
      margin-top:0;
    }
  }
`;

export const ButtonContainer = styled.div`
  margin-top : 1rem;

`
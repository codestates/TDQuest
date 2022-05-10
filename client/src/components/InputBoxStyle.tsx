import styled from "styled-components";

export const InputBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Fredoka One", cursive;

  h1 {
    font-size : 57px;
    margin: 2rem;
  }
`;

export const FormContainer = styled.form`
  // 반응형에 맞게 수정
  padding : 1.5rem;
  // 반응형에 맞게 수정

  // 현준님거에 맞게 import 수정
  background : #f2ffec;
  // 현준님거에 맞게 import 수정
  box-shadow: 0 0 10px gray;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 36px;

    > input {
      margin-left: 3rem;
      height: 36px;
      width: 15rem;
      border : 1px #37dcee solid;
      border-radius: 3px;
    }

    > span {
      font-size: 15px;
      font-family: sans-serif ;
      color : #37dcee;
      margin-left: 3rem;
      height: 36px;
      width: 15rem;
    }
  }

  > div {
    margin : 1.3rem;
    display: flex;
    justify-content: center;
    
    > div:first-child{
      display: flex;
      justify-content: center;
      padding : 2rem;

      > img {
        image-rendering:pixelated;
        width: 4rem;
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
`
export const DontYouSign = styled.div`
  font-family: sans-serif;
  flex-direction : column;
  text-align: center;

  p:last-child{
    color: #0077ff;
    text-decoration: underline;
  }
`;
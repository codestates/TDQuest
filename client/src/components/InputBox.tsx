import { useState, ChangeEvent, FormEvent } from "react";
import Button from "./Button";
import {InputBoxContainer, FormContainer, DontYouSign, Headline, InputContainer, ButtonContainer} from "./InputBoxStyle"
import {signIn, signUp, SignUserInfo} from "../features/sign/signSlice"
import { useAppDispatch, useAppSelector  } from "../app/hooks";
import { RootState } from "../app/store";

// import axios from "axios";

function InputBox({state, handler}: { state : boolean, handler : any }) {
  const emailRule : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [emailResult, setEmailResult] = useState(false);
  const [psw1, setPsw1] = useState("")
  const [pswResult, setPswResult] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email : "",
    password : "",
    nickname : ""
  })

  const emailTest = (e : ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      email : e.target.value
    })
    setEmailResult(emailRule.test(e.target.value));
  }

  const pswTest = (e : ChangeEvent<HTMLInputElement>) => {
    if (psw1 === e.target.value && e.target.value.length > 0){
      setPswResult(true);
    } else {
      setPswResult(false);
    }
  }

  const myUser : SignUserInfo  = useAppSelector((state : RootState)=> state.sign)
  const dispatch = useAppDispatch()

  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state){
      dispatch(signIn(userInfo))
    } else {
      if (emailResult && pswResult){
        dispatch(signUp(userInfo));
      } else {
        alert("이메일 또는 비밀번호를 확인하세요")
      }
    }
  }

  return (
    <InputBoxContainer>
    {JSON.stringify(myUser)}
      <Headline>
        <img src={require('../static/images/HelperBear.png')} alt="logo"/>
        <h1>{state? "Sign in" : "Sign up"} to TD-Quest</h1>
      </Headline>

      <FormContainer onSubmit={(value)=>handleSubmit(value)}>

        <InputContainer>
          <span>
            ID<span/>
          </span>

          <span>
            <input type="email" placeholder="ID (e-mail)" style={!state && !emailResult? {border : "2px red solid"} : {}} onChange={emailTest}/>
            {!state? <span>{emailResult? <span></span> : <span style={{color : "#f56864"}}>ID must be e-mail format</span>}</span> : <span></span>}
          </span>
        </InputContainer>

        <InputContainer display={state}>
          <span>
            Name <span/>
          </span>

          <span>
            <input type="text" placeholder="NickName" style={!state && !userInfo.nickname? {border : "2px red solid"} : {}} onChange={(e : ChangeEvent<HTMLInputElement>)=>setUserInfo({...userInfo, nickname:e.target.value})}/>
            {!state? <span>{userInfo.nickname? <span></span> : <span style={{color : "#f56864"}}>Nickname must be filled up</span>}</span> : <span></span>}
          </span>
        </InputContainer>

        <InputContainer>
          <span>
            PW<span/>
          </span>

          <span>
            <input type="password" placeholder="Password" style={!state && !pswResult? {border : "2px red solid"} : {}} onChange={(e : ChangeEvent<HTMLInputElement>)=>{setPsw1(e.target.value); setUserInfo({...userInfo, password : e.target.value})}}/>
            {!state? <input style={pswResult? {marginTop : "0.5rem"} : {marginTop : "0.5rem", border : "2px red solid"}} type="password" placeholder="Password Check" onChange={pswTest} />: null}
            {!state? <span>{pswResult? <span></span> : <span style={{color : "#f56864"}}>Password must be same</span>}</span> : <span/>}
          </span>
        </InputContainer>

        <ButtonContainer>
          <Button text={state? "Sign In" : "Sign Up"} height="40px"/>
        </ButtonContainer>

        <DontYouSign>
            {state? <div><p>Don't you have account yet?</p><p onClick={handler}>Go to Sign Up</p></div> : null}
        </DontYouSign>

      </FormContainer>
    </InputBoxContainer>
  )
}

export default InputBox;
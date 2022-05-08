import { useState, ChangeEvent, MouseEventHandler, FormEvent } from "react";
import Button from "./Button";
import {InputBoxContainer, FormContainer, DontYouSign} from "./InputBoxStyle"
import axios from "axios";




function InputBox({state, handler}: { state : boolean, handler : MouseEventHandler<HTMLParagraphElement> }) {
  const emailRule : RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [emailResult, setEmailResult] = useState(false);

  const [psw1, setPsw1] = useState("")
  const [pswResult, setPswResult] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email : "",
    password : ""
  })

  const emailTest = (e : ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      email : e.target.value
    })
    setEmailResult(emailRule.test(e.target.value));
  }

  const pswTest = (e : ChangeEvent<HTMLInputElement>) => {
    console.log(`psw1:${psw1}`)
    console.log(`psw2:${e.target.value}`)
    if (psw1 === e.target.value && e.target.value.length > 0){
      setPswResult(true);
    } else {
      setPswResult(false);
    }
  }

  // axios
  const url = ""
  const signUp = async () => {
    try {
      const response = await axios({
        method : "post",
        url : `${url}/sign/in`,
        data : {
          userInfo :{
            nickname :'',
            email : userInfo.email,
            password : userInfo.password
          }
        }
      }
    )

      console.log("response : ", response)
    }

    catch(err) {
      console.log("Error (signUp) : ", err)
    }
  }
  const signIn = async () => {
    try {
      // const response = await axios({
      //   method : "post",
      //   url : `${url}/log/in`,
      //   data : {
      //     email : userInfo.email,
      //     password : userInfo.password
      //   }
      // })
      // console.log("response : ", response)
      window.location.href = "/todo";
    }
    catch(err) {
      console.log("Error (signIn): ", err)
    }
  }

  const handleSubmit = (e : FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state){
      signIn();
    } else {
      if (emailResult && pswResult){
        signUp();
      } else {
        alert("이메일 또는 비밀번호를 확인하세요")
      }
    }
  }




  return (
    <InputBoxContainer>
      <h1>{state? "Sign in" : "Sign up"} to TD-Quest</h1>
      <FormContainer>
        <div>
          <div>
            <img src={require('../static/images/HelperBear.png')}></img>
          </div>

          <div>
            <span>
              ID <input type="email" placeholder="ID (e-mail)" onChange={emailTest}/>
            </span>
            {/* valid */}
            {!state? <span>&nbsp;&nbsp;   {emailResult? <span>✔︎</span> : <span style={{color : "#f56864"}}>✘ ID must be e-mail format</span>}</span> : null}
            {/* valid */}


            <span>
              PW <input type="password" placeholder="Password" onChange={(e : ChangeEvent<HTMLInputElement>)=>{setPsw1(e.target.value); setUserInfo({...userInfo, password : e.target.value})}}/>
            </span>
            {!state? <span>&nbsp;&nbsp;   <input style={{marginTop : "1rem"}} type="password" placeholder="Password Check" onChange={pswTest} /></span> : null}
            {/* valid */}
            {!state? <span>&nbsp;&nbsp;   {pswResult? <span>✔︎</span> : <span style={{color : "#f56864"}}>✘ Password must be same</span>}</span> : null}
            {/* valid */}

          </div>
        </div>
        
        <Button text={state? "Sign In" : "Sign Up"} height="40px"/>

        <DontYouSign>
            {state? <div><p>Don't you have account yet?</p><br/><p onClick={handler}>Go to Sign Up</p></div> : null}
        </DontYouSign>

      </FormContainer>
      <button onClick={handleSubmit}>{state? "Sign In" : "Sign Up"}</button>

    </InputBoxContainer>
  )
}

export default InputBox;
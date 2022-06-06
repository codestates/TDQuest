import { useState, ChangeEvent, FormEvent } from "react";
import Button from "./Button";
import {
  InputBoxContainer,
  FormContainer,
  DontYouSign,
  Headline,
  InputContainer,
  ButtonBox,
  OauthContainer,
} from "./InputBoxStyle";
import { signIn, signUp, SignUserInfo } from "../features/sign/signSlice";
import { getCharacterAsync } from "../features/character/characterSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";

function InputBox({ state, handler }: { state: boolean; handler: any }) {
  const emailRule: RegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [emailResult, setEmailResult] = useState(false);
  const [psw1, setPsw1] = useState("");
  const [pswResult, setPswResult] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    nickname: "",
    logintype : "general"
  });
  const [oauthState, setOauthState] = useState(true);

  const emailTest = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      email: e.target.value,
    });
    setEmailResult(emailRule.test(e.target.value));
  };

  const pswTest = (e: ChangeEvent<HTMLInputElement>) => {
    if (psw1 === e.target.value && e.target.value.length > 0) {
      setPswResult(true);
    } else {
      setPswResult(false);
    }
  };

  const signedUser: SignUserInfo = useAppSelector((store) => store.sign);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state) {
      dispatch(signIn(userInfo)).then((res) => {
      if (res.payload.status === "loggedIn") {
        dispatch(getCharacterAsync(res.payload.userInfo.id));
        navigate("/todo");
      } else {
        alert("입력하신 정보가 올바르지 않습니다");
      }
      });
    } else {
      if (emailResult && pswResult) {
        dispatch(signUp(userInfo));
      } else {
        alert("이메일 또는 비밀번호를 확인하세요");
      }
    }
  };
  //const kakao_url = 'http://localhost:3001/kakao'
  //const google_url = 'http://localhost:3001/google'
  const kakao_url = 'https://kauth.kakao.com/oauth/authorize?client_id=51ff7cb7b6a28cd0aae21b4069e991dc&redirect_uri=http://localhost:3000&response_type=code';
  const google_url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=271860095349-9ir71s2ve6k3l9ts7r4mnis7lu211575.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.profile'
  return (
    <InputBoxContainer>
      <Headline>
        <img src={require("../static/images/HelperBear.png")} alt="logo" />
        <h1>{state ? "Sign in" : "Sign up"} to TD-Quest</h1>
      </Headline>

      <FormContainer onSubmit={(value) => handleSubmit(value)}>
        {oauthState ? (
          <OauthContainer>
            {/* <Button bgColor="#f9e000" text="Sign in with kakao" type="button" img={<img src={require("../static/images/kakao.png")}/>} onClick={()=>{dispatch(signOauth('KaKao'))}} /> */}
            <Button
              bgColor="#f9e000"
              text="Sign in with kakao"
              type="button"
              img={<img src={require("../static/images/kakao.png")} />}
              onClick={() => {
                window.open(kakao_url);
              }}
            />
            {/* <Button bgColor="#fa6c67" text="Sign in with google" type="button" img={<img src={require("../static/images/google.png")}/>} onClick={()=>{dispatch(signOauth('google'))}} /> */}
            <Button
              bgColor="#fa6c67"
              text="Sign in with google"
              type="button"
              img={<img src={require("../static/images/google.png")} />}
              onClick={() => {
                window.open(google_url);
              }}
            />
            <span>OR</span>
            <Button
              text="Sign In"
              type="button"
              img={<img src={require("../static/images/Logo.png")} />}
              onClick={() => {
                setOauthState(false);
              }}
            />
          </OauthContainer>
        ) : (
          <div>
            <InputContainer>
              <span>
                ID
                <span />
              </span>

              <span>
                <input
                  type="email"
                  placeholder="ID (e-mail)"
                  style={
                    !state && !emailResult ? { border: "2px red solid" } : {}
                  }
                  onChange={emailTest}
                />
                {!state ? (
                  <span>
                    {emailResult ? (
                      <span></span>
                    ) : (
                      <span style={{ color: "#f56864" }}>
                        ID must be e-mail format
                      </span>
                    )}
                  </span>
                ) : (
                  <span></span>
                )}
              </span>
            </InputContainer>

            <InputContainer display={state}>
              <span>
                Name <span />
              </span>

              <span>
                <input
                  type="text"
                  placeholder="NickName"
                  style={
                    !state && !userInfo.nickname
                      ? { border: "2px red solid" }
                      : {}
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserInfo({ ...userInfo, nickname: e.target.value })
                  }
                />
                {!state ? (
                  <span>
                    {userInfo.nickname ? (
                      <span></span>
                    ) : (
                      <span style={{ color: "#f56864" }}>
                        Nickname must be filled up
                      </span>
                    )}
                  </span>
                ) : (
                  <span></span>
                )}
              </span>
            </InputContainer>

            <InputContainer>
              <span>
                PW
                <span />
              </span>

              <span>
                <input
                  type="password"
                  placeholder="Password"
                  style={
                    !state && !pswResult ? { border: "2px red solid" } : {}
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setPsw1(e.target.value);
                    setUserInfo({ ...userInfo, password: e.target.value });
                  }}
                />
                {!state ? (
                  <input
                    style={
                      pswResult
                        ? { marginTop: "0.5rem" }
                        : { marginTop: "0.5rem", border: "2px red solid" }
                    }
                    type="password"
                    placeholder="Password Check"
                    onChange={pswTest}
                  />
                ) : null}
                {!state ? (
                  <span>
                    {pswResult ? (
                      <span></span>
                    ) : (
                      <span style={{ color: "#f56864" }}>
                        Password must be same
                      </span>
                    )}
                  </span>
                ) : (
                  <span />
                )}
              </span>
            </InputContainer>

            <ButtonBox>
              <Button text={state ? "Sign In" : "Sign Up"} height="40px" />
            </ButtonBox>

            <DontYouSign>
              {state ? (
                <div>
                  <p>Don't you have account yet?</p>
                  <p onClick={handler}>Go to Sign Up</p>
                </div>
              ) : null}
            </DontYouSign>
          </div>
        )}
      </FormContainer>
    </InputBoxContainer>
  );
}

export default InputBox;

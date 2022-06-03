import React from "react";
import styled, { keyframes } from "styled-components";
import { color_primary_green_dark } from "./CommonStyle";

const BgFade = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const ModalFade = keyframes`
  from {
    opacity: 0;
    margin-top: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`;

const ModalBackground = styled.div`
  background-color: #515151;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  animation: ${BgFade} 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 90%;
  position: fixed;
  max-width: 450px;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
  border-radius: 5px;
  animation: ${ModalFade} 0.3s;
  @media (max-width: 767px){
    width: 90vw;
    left: 5%;
  }
`;

const Header = styled.div`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const HeaderBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  width: 30px;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
  border: none;
  color: red;
  &:hover {
    cursor: pointer;
  }
`;

const ModalMain = styled.div`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`;

const Footer = styled.div`
  padding: 12px 16px;
  text-align: right;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterBtn = styled.div<{ isConfirmed?: boolean }>`
  padding: 6px 12px;
  color: #fff;
  background-color: ${(props) =>
    props.isConfirmed ? color_primary_green_dark : "#ccc"};
  border-radius: 5px;
  font-size: 15px;
  width: 200px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

// 필수입력값 : open, close관련 로직 -> Mypage.tsx 참고 및 header에 원하는 텍스트 입력, children
// children : React.Node(Html 태그 집합 또는 JSX Element)
// 옵션입력값 : footer, footerClick, isConfirmed
// footer: string
// footerClick: footer 부분의 버튼 클릭 시 실행 될 함수
// isConfirmed : 해당 값에 true 전달 시 색상이 초록색으로 변경됨
function MsgModal({
  open,
  close,
  header,
  children,
  footer,
  footer2,
  noFooter,
  footerClick,
  footerClick2,
  isConfirmed,
  secondFooterBtn,
}: {
  open: boolean;
  close: () => void;
  header: string;
  children: JSX.Element | React.ReactNode;
  footer?: string;
  footer2?: string;
  noFooter?: boolean;
  footerClick?: any;
  footerClick2?: () => void;
  isConfirmed?: boolean;
  secondFooterBtn?: boolean;
}) {
  return (
    <div className={open ? "open_modal" : "close_modal"}>
      {open ? (
        <ModalBackground onClick={close}>
          <ModalContainer
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Header>{header}</Header>
            <HeaderBtn onClick={close}>&times;</HeaderBtn>
            <ModalMain>{children}</ModalMain>
            {noFooter ? null : (
              <Footer>
                <FooterBtn onClick={footerClick}>
                  {footer ? footer : "Confirm"}
                </FooterBtn>
                {secondFooterBtn ? (
                  <FooterBtn onClick={footerClick2} isConfirmed={true}>
                    {footer2 ? footer2 : "Confirm"}
                  </FooterBtn>
                ) : (
                  ""
                )}
              </Footer>
            )}
          </ModalContainer>
        </ModalBackground>
      ) : null}
    </div>
  );
}

export default MsgModal;

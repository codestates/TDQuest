import React from 'react';
import './App.css';
import MainRouter from './views/Router/Router';

function App() {
  // 각 페이지마다의 색상을 props로 넘겨 지정해줄 수 있게 구성함
  // Main Page와 다른 Page들의 배경 색상이 다르기 때문에 작성된 코드임
  // 색상 변경이 필요할 경우, 아래의 color 코드만 수정하여도 가능
  const HeaderColor = '#509B67';
  const bodyColor = '#f2ffec';
  const mainPageColor = '#FBFBFB';

  return (
    <div className='App'>
      <MainRouter
        headerColor={HeaderColor}
        bgColor={bodyColor}
        mainPageColor={mainPageColor}
      />
    </div>
  );
}

export default App;

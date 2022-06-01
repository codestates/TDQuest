import React, { useState } from 'react';
import InputBox from '../../components/InputBox';

function SignPage() {
  // footer 위치 수정? or height 100vh

  // 1. 일단은 useState
  // 2. useEffect

  const [inOrUp, setInOrUp] = useState(true);
  const handleInOrUp = () => {
    if (inOrUp) {
      setInOrUp(false);
    } else {
      setInOrUp(true);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        alignContent: 'center',
      }}
    >
      <InputBox state={inOrUp} handler={handleInOrUp}></InputBox>
    </div>
  );
}

export default SignPage;

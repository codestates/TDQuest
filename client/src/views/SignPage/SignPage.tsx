import React, { useState } from 'react';
import InputBox from '../../components/InputBox';

function SignPage() {

  const [inOrUp, setInOrUp] = useState(true);
  const handleInOrUp = () => {
    if (inOrUp){
      setInOrUp(false)
    } else {
      setInOrUp(true)
    }
  }


  return (
  <div style={{display: "flex", justifyContent : "center", height: "100%", minHeight : "90vh", alignContent: "center", paddingTop : "80px"}}>
    <InputBox state={inOrUp} handler={handleInOrUp}></InputBox>
  </div>
  )
}

export default SignPage;
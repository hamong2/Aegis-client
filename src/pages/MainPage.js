import React from 'react';
import styled from 'styled-components';
import {v4 as uuidV4 } from 'uuid';

const StyledMain = styled.div`
h1 {
  color: #EB5374;
}

.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #202633;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat_link {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #606fe4;
  width: 25vw;
  height: 20vh;
  margin: 10vh 5vw 0 15vw;
  font-size: 1.5em;
  border-radius: 5%;
}

.upload_video {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #606fe4;
  width: 25vw;
  height: 20vh;
  margin: 10vh 15vw 0 5vw;
  font-size: 1.5em;
  border-radius: 5%;
}
`

export default function Main() {

  const moveVideoChatPage = () => {
    const roomId = uuidV4().toString();
    window.location.href = `/join/${roomId}`;
  }
  const moveVideoUploadPage = () => {
    window.location.href = '/upload';
  }
  return (
      <StyledMain>
          <div className="main">  
              <h1>Aegis Video Chat</h1>
              <div className="content">
                <div className="chat_link" onClick={ moveVideoChatPage }>
                  Enter room
                </div>
                <div className="upload_video" onClick={ moveVideoUploadPage }>
                  upload video
                </div>
              </div>
          </div>
      </StyledMain>
  )
}
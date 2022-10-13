import React from 'react';
import styled from 'styled-components';
import {v4 as uuidV4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faVideo } from '@fortawesome/free-solid-svg-icons';

const StyledMain = styled.div`
h1 {
  color: #000000;
  margin: 0;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
}

.shadow_box {
  display: flex;
  box-shadow: 0px 0.1px 0.5px 0.5px gray;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  height: 100%;
  width: 50%;
  font-weight: bold;
  font-size: 150%;
  color: #555555;
  margin: 0 0 0 5%;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  vertical-align: baseline;
  white-space: pre-wrap;
  margin-top: 1vh;
}

.chat_link {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 12, 30, 0.8);
  color: white;
  font-weight: 600;
  line-height: 1.6;
  height: 56px;
  margin: 1px 0 0;
  margin-right: 4px;
  font-size: 17px;
  text-align: center;
  border: 0 solid transparent;
  border-radius: 16px;
  user-select: none;
  padding: 15px 28px;
  box-sizing: border-box;
  transition: background, .2s, ease, color, .1s, ease;
}

.upload_video {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 12, 30, 0.8);
  color: white;
  font-weight: 600;
  line-height: 1.6;
  height: 56px;
  margin: 1px 0 0;
  font-size: 17px;
  text-align: center;
  border: 0 solid transparent;
  border-radius: 16px;
  user-select: none;
  padding: 15px 28px;
  box-sizing: border-box;
  transition: background, .2s, ease, color, .1s, ease;
}
.btn:hover {
  background-color: rgb(78, 89, 104);  
}

.icon {
  width: 40;
  height: 40;
  color: #AAAAAA;
}

.blank {
  height: 90vh;
  width: 100vw;
  background-image: url('./background-main.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.85;
}

.footer {
  height: 10vh;
}

.fadein {
  display: flex;
  flex-direction: row;
  color: black;
  justify-content: center;
  align-items: flex-start;
  vertical-align: baseline;
  white-space: pre-wrap;
  position: absolute;
  font-size: 5vh;
  overflow: hidden;
  animation: fadein 3s ease-in-out;
}

@keyframes fadein {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: none;
  }
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
          <div className="header">
            <div className="shadow_box">
              <div className="title">A e g i s</div>
            </div>
          </div>
          <div className="main">  
            <div className="fadein">
              <h1>A e g i s</h1>
            </div>
            <div className="blank">
            </div>
            <div className="content">
              <div className="chat_link btn" onClick={ moveVideoChatPage }>
              <FontAwesomeIcon icon={faDoorOpen} className="icon"/>
                <p>  Enter Room</p>
              </div>
              <div className="upload_video btn" onClick={ moveVideoUploadPage }>
              <FontAwesomeIcon icon={faVideo} className="icon"/>
                <p>  Upload Video</p>
              </div>
            </div>
            <div className="footer">

            </div>
          </div>
      </StyledMain>
  )
}
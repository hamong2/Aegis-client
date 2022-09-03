import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Btn from '../components/button';
import styled from 'styled-components';
import { io } from "socket.io-client";
import Peer from "peerjs";

const StyledVideoChat = styled.div`
* {
    margin: 0;
    padding: 0;
  }
  
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8vh;
    position: relative;
    width: 100%;
    background-color: #1d2635;
  }
  
  .logo > h3 {
    color: #EB5374;
  }
  
  .main {
    overflow: hidden;
    height: 92vh;
    display: flex;
  }
  
  .videos__group {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #161d29;
  }
  
  Video {
    height: 300px;
    border-radius: 1rem;
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
    width: 400px;
    object-fit: cover;
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
  }
  
  .options {
    padding: 1rem;
    display: flex;
    background-color: #1d2635;
  }
  
  .background__red {
    background-color: #f6484a;
  }
  
  #video-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .header__back {
    display: none;
    position: absolute;
    font-size: 1.3rem;
    top: 17px;
    left: 28px;
    color: #fff;
  }
  
  @media (max-width: 700px) {
    .main__right {
      display: none;
    }
  
    video {
      height: auto;
      width: 100%;
    }
  }
  .options {
    padding: 1rem;
    display: flex;
    background-color: #202633;
    flex-direction: column;
    height: 95.5%;
  }
  
.options__top {
display: flex;
flex-direction: column;
}
  
.options__bottom {
display: flex;
margin-top: auto;
flex-direction: column;
}
`


export default function VideoChat() {
  
  const roomId = useLocation().state.roomId;

  let myStream = null;

  const videoGrid = useRef();
  const myVideo = useRef();
  const opponentVideo = useRef();
  const myCanvas = useRef();
  const opponentCanvas = useRef();


  const peer = new Peer(); 
  const socket = io("https://pangyo-dev01.kro.kr:7070", {
  path: '/socket.io'
  });

  const handleCamera = () => {
    const enabled = myStream.getVideoTracks()[0].enabled;
    if (enabled) {
      myStream.getVideoTracks()[0].enabled = false;
    } else {
      myStream.getVideoTracks()[0].enabled = true;
    }
  }

  const handleAudio = () => {
    const enabled = myStream.getAudioTracks()[0].enabled;
    if (enabled) {
      myStream.getAudioTracks()[0].enabled = false;
    } else {
      myStream.getAudioTracks()[0].enabled = true;
    }
  }

  const copyLink = async () => {
    const roomLink = `https://pangyo-dev01.kro.kr:7070/join/${roomId}`;
    console.log("copy");
    try {
      await navigator.clipboard.writeText(roomLink);
      alert("링크가 클립보드에 복사되었습니다.");
    }
    catch {
      alert("복사 실패");
    }
  } 
  console.log(roomId);
  peer.on("open", (id) => {
    socket.emit("join-room", roomId, id);
    console.log(id);
  });

  useEffect(() => {
    navigator.mediaDevices
    .getUserMedia({ 
      video: true,
      audio: true,
    })
    .then((stream) => {
      myStream = stream;
      addVideoStream(myVideo.current, stream);
      const ctx = myCanvas.current.getContext("2d");

      const renderMyVideo = () => {
        var sx=70, sy=60, ex=240, ey=200;
        mosaic(ctx, myVideo.current, sx, sy, ex, ey);
        requestAnimationFrame(renderMyVideo);
      }
      
      peer.on("call", (call) => {
        call.answer(stream);
        call.on("stream", (userVideoStream) => {
          addVideoStream(opponentVideo.current, userVideoStream);
          const opctx = opponentCanvas.current.getContext("2d");
          const renderOpponentVideo = () => {
            var sx=70, sy=60, ex=240, ey=200;
            mosaic(opctx, opponentVideo.current, sx, sy, ex, ey);
            requestAnimationFrame(renderOpponentVideo);
          }
          console.log("ack");
          opponentVideo.current.addEventListener('canplaythrough', () => {
            renderOpponentVideo();
          });
          console.log("connect");
        });

      });
      
      socket.on("user-connected", (userId) => {
        const call = peer.call(userId, stream);
        call.answer(stream);
        call.on("stream", (userVideoStream) => {
          addVideoStream(opponentVideo.current, userVideoStream);
          console.log("video");
        });
        const opctx = opponentCanvas.current.getContext("2d");
        const renderOpponentVideo = () => {
          var sx=70, sy=60, ex=240, ey=200;
          mosaic(opctx, opponentVideo.current, sx, sy, ex, ey);
          requestAnimationFrame(renderOpponentVideo);
        }
        opponentVideo.current.addEventListener('canplaythrough', () => {
          renderOpponentVideo();
        });
        console.log("join!");
      }); 
      myVideo.current.addEventListener('canplaythrough', () => {
        renderMyVideo();
      });      
    });
  });

  const mosaic = (ctx, video, sx, sy, ex, ey) => {
    ctx.drawImage(video, 0 , 0, video.width, video.height);
    if(ex - sx === 0) ex = sx + 30;
    if(ey - sy === 0) ey = sy + 30;
    var imageData = ctx.getImageData(sx, sy, ex-sx, ey-sy);
    for(var i=0;i<imageData.data.length;i=i+4){
      var r = imageData.data[i];
      var g = imageData.data[i+1];
      var b = imageData.data[i+2];
      var a = imageData.data[i+3];
        for(var j=1;j<=9;j++){
        imageData.data[i+4] = r;
        imageData.data[i+5] = g;
        imageData.data[i+6] = b;
        imageData.data[i+7] = a;
        i=i+4;
      }
    }
    ctx.putImageData(imageData, sx, sy);
  }
  

  return (
      <StyledVideoChat>
          <div className="header">
              <div className="logo">
                  <div className="header__back">
                      <i className="fas fa-angle-left"></i>
                  </div>
                  <h3>Aegis Video Chat</h3>
              </div>
          </div>  
          <div className="main">  
            <div className="options">
                <div className="options__top">
                    <Btn btnAction="startRecord"/>
                    <Btn btnAction="Invite" invite={ copyLink }/>
                    <Btn btnAction="Exit" />
                </div>
                <div className="options__bottom">
                    <Btn btnAction="startVideo" handleCamera={ handleCamera }/>
                    <Btn btnAction="startAudio" handleAudio={ handleAudio }/>
                </div>
            </div>
            <div className="videos__group">
                <div ref={videoGrid} id="video-grid">
                    <video id="myVideo" ref={myVideo} autoPlay playsInline width="400" height="300" hidden={true}/>
                    <canvas ref={myCanvas} width="400" height="300"></canvas>
                    <video id="opponentVideo" ref={opponentVideo} autoPlay playsInline width="400" height="300" hidden={true}/>
                    <canvas ref={opponentCanvas} width="400" height="300"></ canvas>
                </div>
            </div>
          </div>
      </StyledVideoChat>
  )
}

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
};


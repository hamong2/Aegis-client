import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Btn from '../components/button';
import styled from 'styled-components';
import Peer from "peerjs";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const StyledVideoChat = styled.div`
* {
    margin: 0;
    padding: 0;
  }
  .header {
    display: flex;
    background-color: #EDEDED;
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
    height: 95vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blank {
    position: absolute;
    height: 95vh;
    width: 100vw;
    background-image: url('./background-main.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.85;
    z-index: 1;
  }

  .videos__group {
    display: flex;
    flex-direction: column;
    height: 85vh;
    width: 75vw;
    align-items: center;
    justify-content: center;
    background-color: #EDEDED;
    border-radius: 45px;
    margin-right: 2vw;
    z-index: 2;
  }
  
  .side__bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh;
    width: 20vw;
  }

  .recording__time {
    position: absolute;
    top: 7.5vh;
    background-color: #000000;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    width: 20vw;
    height: 5vh;
    z-index: 4;
  }
  
  .user__list {
    display: flex;
    height: 85vh;
    width: 20vw;
    background-color: #EDEDED;
    border-radius: 30px;
    z-index: 3;
  }

  video {
    height: 300px;
    border-radius: 30px;
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
    width: 400px;
    object-fit: cover;
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
  }
  
  .options {
    position: absolute;
    top: 85vh;
    width: 40vw;
    display: flex;
    justify-content: center;
    background-color: #FFFFFF;
    border-radius: 30px;
    padding: 10px;
    z-index: 3;
  }
  
  .btn {
    margin: 2px;
  }
  
  #video-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .view {
    margin: 0 1vw 0 1vw;
    border-radius: 30px;
  }

  .recording__time {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.5vw;
  }

  .user__list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2vh 0 1vh 0;
    width: 20vw;
  }

  .first__user {
    margin-top: 4vh;
  }

  .name {
    margin-left: 1.5vw;
    font-weight: bold;
    font-size: 1.5vw;
  }
`


export default function VideoChat() {
  
  const roomId = useLocation().state.roomId;

  let myStream = null;
  let fpsInterval;
  let myFpsInterval;
  let myThen;
  let then;
  let cnt=5;
  let box1=[0,0,0,0], box2=[0,0,0,0];
  let cal=0;
  let verb="null";
  let harmful=['fuck_you', 'violence', 'stab', 'strangle', 'smoke']

  const videoGrid = useRef();
  const myVideo = useRef();
  const opponentVideo = useRef();
  const myCanvas = useRef();
  const opponentCanvas = useRef();
  const myView = useRef();
  const opponentView = useRef();
  const recordTime = useRef();
  const invited = useRef();
  const peer = new Peer(); 

  const [withFriend, isWithFriend] = useState(false);

  const socket = io("https://sktaegis.com", {
  path: '/socket.io'
  });
  const pysocket = io("https://ec2-43-200-8-249.ap-northeast-2.compute.amazonaws.com", 
  {transports: ['websocket', 'polling', 'flashsocket']}
  );
  pysocket.on('connect', () => {
    console.log(`connect ${socket.id}`);
  });

  pysocket.on('disconnect', () => {
      console.log(`disconnect ${socket.id}`);
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
    const roomLink = `https://sktaegis.com/join/${roomId}`;
    try {
      await navigator.clipboard.writeText(roomLink);
      alert("링크가 클립보드에 복사되었습니다.");
    }
    catch {
      alert("복사 실패");
    }
  } 
  peer.on("open", (id) => {
    socket.emit("join-room", roomId, id);
  });

  useEffect(() => {
    navigator.mediaDevices
    .getUserMedia({ 
      video: {width: 500, height: 400, frameRate: {ideal: 10, max: 15}},
      audio: false,
    })
    .then((stream) => {
      
      myStream = stream;
      addVideoStream(myVideo.current, stream);
      const myCtx = myView.current.getContext("2d",{
        alpha: false,
        willReadFrequently: true
      });
      const opctx = opponentCanvas.current.getContext("2d", {
        alpha: false,
        willReadFrequently: true
      });
      const opView = opponentView.current.getContext("2d", {
        alpha: false,
        willReadFrequently: true
      });

      const mosaic = (img) => {
        var sx=box1[0], sy=box1[1], ex=box1[2], ey=box1[3];
        for(var i=sy; i<ey; i++) {
          for(var j=sx; j<ex; j++) {
            var h = i*400*4;
            var r = img.data[h+4*j];
            var g = img.data[h+4*j+1];
            var b = img.data[h+4*j+2];
            for(var k=0; k<9; k++) {
              img.data[h+4*j+4] = r;
              img.data[h+4*j+5] = g;
              img.data[h+4*j+6] = b;
              j++;
              if(j >= ex) break;
            }
          }
        }
        var sx=box2[0], sy=box2[1], ex=box2[2], ey=box2[3];
        for(var i=sy; i<ey; i++) {
          for(var j=sx; j<ex; j++) {
            var h = i*400*4;
            var r = img.data[h+4*j];
            var g = img.data[h+4*j+1];
            var b = img.data[h+4*j+2];
            for(var k=0; k<9; k++) {
              img.data[h+4*j+4] = r;
              img.data[h+4*j+5] = g;
              img.data[h+4*j+6] = b;
              j++;
              if(j >= ex) break;
            }
          }
        }
        return img;
      }
      pysocket.on('filter', (data) => {
        cal++;
        var iData = opctx.getImageData(0,0,500,400);
        if (data.count == 5) {
          for(var i=0; i<data.bbox.length; i++) {
            if(i == 0) {
              box1[0] = Math.trunc(data.bbox[i][0]);
              box1[1] = Math.trunc(data.bbox[i][1]);
              box1[2] = Math.trunc(data.bbox[i][2]);
              box1[3] = Math.trunc(data.bbox[i][3]);
            }
            else {
              box2[0] = Math.trunc(data.bbox[i][0]);
              box2[1] = Math.trunc(data.bbox[i][1]);
              box2[2] = Math.trunc(data.bbox[i][2]);
              box2[3] = Math.trunc(data.bbox[i][3]);
            }
          }
        }
        if(data.verb > 0) verb = data.verb;
        else if(data.verb == 0) verb = 0;
        if(verb >= 118) iData = mosaic(iData);
        console.log(Date.now() - data.time);
        opView.putImageData(iData, 0, 0);
      });
      const startAnimating = (fps) => {
        fpsInterval = 1000 / fps;
        then = Date.now();
        renderOpponentVideo();
      }
      const startMyAnimating = (fps) => {
        myFpsInterval = 1000 / fps;
        myThen = Date.now();
        renderMyVideo();
      }
      const renderMyVideo = () => {  
        var now = Date.now();
        var elapsed = now - myThen;
        if(elapsed > myFpsInterval) {
          myThen = now - (elapsed % myFpsInterval);
          myCtx.drawImage(myVideo.current, 0, 0, myVideo.current.width, myVideo.current.height);
        }
        requestAnimationFrame(renderMyVideo);
      }
      const renderOpponentVideo = () => {
        var now = Date.now();
        var elapsed = now - then;
        if(elapsed > fpsInterval) {
          then = now - (elapsed % fpsInterval);
          sendImage(opctx, opponentVideo.current);
        }
        requestAnimationFrame(renderOpponentVideo);
      }
      
      peer.on("call", (call) => {
        call.answer(stream);
        call.on("stream", (userVideoStream) => {
          addVideoStream(opponentVideo.current, userVideoStream);
        });
      });
      
      socket.on("user-connected", (userId) => {
        isWithFriend(true);
        const call = peer.call(userId, stream);
        call.answer(stream);
        call.on("stream", (userVideoStream) => {
          addVideoStream(opponentVideo.current, userVideoStream);
        });
      });
      opponentVideo.current.addEventListener('canplaythrough', () => {
        startAnimating(15);
      }); 
      myVideo.current.addEventListener('canplaythrough', () => {
        startMyAnimating(10); 
      });      
    }); 
  });

  const sendImage = (ctx, video) => {
    ctx.drawImage(video, 0, 0, video.width, video.height);
    var imageData = ctx.getImageData(0, 0, video.width, video.height);
    var rgbArray = new Uint8Array((imageData.data.length / 4) * 3);
    var i = 0;
    var j = 0;
    while( i < imageData.data.length){
        rgbArray[j++] = imageData.data[i++];
        rgbArray[j++] = imageData.data[i++];
        rgbArray[j++] = imageData.data[i++];
        i++;
    }
    pysocket.emit("filtering", {rgb: rgbArray, time: Date.now(),
    count: cnt});
    if(cnt == 5) cnt = 0;
    else cnt++;
  }
  

  return (
      <StyledVideoChat>
        <div className="header">
          <div className="shadow_box">
            <div className="title">A e g i s</div>
          </div>
        </div>
          <div className="main">  
            <div className="blank"/>
            
            <div className="videos__group">
              <div ref={videoGrid} id="video-grid">
                  <video id="myVideo" ref={myVideo} autoPlay playsInline width="500" height="400" hidden={true}/>
                  <canvas ref={myCanvas} width="400" height="300" hidden={true}></canvas>
                  <canvas ref={myView} width="500" height="400" className="view"></canvas>
                  <video id="opponentVideo" ref={opponentVideo} autoPlay playsInline width="500" height="400" hidden={true}/>
                  <canvas ref={opponentCanvas} width="500" height="400" hidden={true}></ canvas>
                  <canvas ref={opponentView} width="500" height="400" className="view"></canvas>
              </div>
              <div className="options">
                <Btn className="btn" btnAction="startAudio" handleAudio={ handleAudio }/>
                <Btn className="btn" btnAction="startVideo" handleCamera={ handleCamera }/>
                <Btn ref={recordTime} className="btn" btnAction="startRecord"/>
                <Btn className="btn" btnAction="Invite" invite={ copyLink }/>
                <Btn className="btn" btnAction="Exit" />  
              </div>
            </div>
            <div className="side__bar">
              <div className="recording__time">
                  {withFriend? <p>Chatting in Progress</p>:<p>Invite Friends!</p> }
              </div>
              <div className="user__list">
                <div className="user first__user">
                  <FontAwesomeIcon icon={ faUsers }/>
                  <div className="name">
                     주재원
                  </div>
                </div>
                {withFriend ? <div ref={invited} className="user" hidden={true}>
                  <FontAwesomeIcon icon={ faUsers } />
                    <div className="name">
                      안희윤
                    </div>
                </div>: <div></div>}
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


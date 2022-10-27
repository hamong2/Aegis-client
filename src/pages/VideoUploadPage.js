import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Btn from '../components/button';
import axios from 'axios';
import IterLog from '../components/IterLog';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faDownload, faForward, faBackward, faPause } from '@fortawesome/free-solid-svg-icons';
import Loading from '../components/Loading';

const StyledVideoUpload = styled.div`

.btn {
    margin: 5px;
    z-index: 10;
}
  

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5vh;
    position: relative;
    width: 100%;
    background-color: #EDEDED;
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
    overflow: hidden;
    height: 95vh;
    display: flex;
    background-color: #161d29;
    justify-content: center;
    align-items: center;
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

.uploadVideo {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 800px;
    margin-right: 10vw
}

.container {
    height: 500px;
    width: 800px;
    align-items: center;
    justify-content: center;
    background-color: #646262;
    border-radius: 30px;
    z-index:5
}

.adjust {
    display: flex;
    height: 10px;
    margin: 0;
  }

#dropzone {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    width: 800px;
    border-radius: 15px;
    background-color: #D9D9D9;
    z-index:6;
}

.side__bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30vh;
    width: 15vw;
    background-color: #FFFFFF
    z-index: 10;

  }

.sentence {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-weight: bold;
    font-size: 100%;
    color: #FFFFFF;
    margin: 0 0 0 0%;
  }

.recording__time {
    position: absolute;
    top: 10vh;
    background-color: #000000;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    width: 13vw;
    height: 7vh;
    z-index: 10;
  }

.user__list {
    display: flex;
    height: 75vh;
    width: 13vw;
    background-color: #D9D9D9;
    border-radius: 30px;
    z-index: 3;
  }

video {
    z-index: 3;
    width: 800px;
    height: 480px;
}

.options {
    width: 600px;
    display: flex;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    height: 5vh;
    z-index: 3;
    background-color: #D9D9D9;
    margin-top: 5vh;
    color: #646262;
}

.btn {
    z-index: 4;
    margin-right: 3vw;
    margin-left: 3vw;
}

img{
    z-index:999;
}
`



export default function VideoUpload() {
    const [existVideo, setExistVideo] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");
    const [log, setLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");
    const file = useRef();
    const uploadVideo = useRef();

    const onDrop = (files) => {
        setLoading(true);
        console.log("upload");
        const formData = new FormData();
        formData.append("file", files[0]);
        console.log(files[0]);
        console.log("서버로 전송 코드 구현해야함!");
        axios.post("https://ec2-43-200-8-249.ap-northeast-2.compute.amazonaws.com/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    withCredential: true
                },
                timeout: 3600000
            })
            .then((res) => {
                console.log("success");
                const fileURL = window.URL.createObjectURL(files[0]);
                setLog(res.data.log);
                setVideoSrc(fileURL);
                setLoading(false);
                setExistVideo(true);
            })
            .catch((err) => {
                alert("fail!");
                setLoading(false);
            })
    };

    useEffect(() => {
        if(existVideo && uploadVideo.current != undefined) {
            console.log(uploadVideo.current.src);
        }
    })
          
    const download = () => {
        console.log("download!");
        axios({
                url: "https://ec2-43-200-8-249.ap-northeast-2.compute.amazonaws.com/upload", // 파일 다운로드 요청 URL
                method: "GET", // 혹은 'POST'
                responseType: "blob", // 응답 데이터 타입 정의
            }).then((response) => {
                console.log("a");
                const blob = new Blob([response.data]);
                const fileObjectUrl = window.URL.createObjectURL(blob);
                file.current.download = "filter.mp4";
                console.log(fileObjectUrl);
                setUrl(fileObjectUrl);
                file.current.click();
            })
            .catch((err) => {
                console.log("er");
            });
}

    return ( 
        <StyledVideoUpload>
            {loading ? <Loading/> : null }
            <div className="header">
              <div className="shadow_box">
                <div className="title">A e g i s</div>
              </div>
            </div>
            <div className="blank"/>
            <div className="main">
                <a ref={file} href={url} hidden={false}></a>
                <div className="uploadVideo">
                    {!existVideo ? <Dropzone onDrop={onDrop}>
                    {({getRootProps, getInputProps}) => (
                    <section className="container">
                        <div className='adjust'></div>
                        <div id="dropzone" {...getRootProps()}>
                            <Btn className="btn" btnAction="plus"/>
                        <input {...getInputProps()} />
                        </div>
                    </section>
                    )}
                    </Dropzone> : 
                    <video src={ videoSrc } ref={ uploadVideo } controls/>}
                    <div className="options">
                        <FontAwesomeIcon className="btn" icon={faDownload} size="2x" onClick={ download }/>
                        <FontAwesomeIcon className="btn" icon={faBackward} size="2x"/>
                        <FontAwesomeIcon className="btn" icon={faPause} size="2x"/>
                        <FontAwesomeIcon className="btn" icon={faForward} size="2x"/>
                    </div>
                </div>
                <div className="side__bar">
                    <div className="recording__time">
                        <div className="sentence">Time log</div>
                    </div>
                    <div className="user__list">
                        <IterLog log={ log } ></IterLog>
                    </div>
                </div>
            </div> 
        </StyledVideoUpload>
    );
}
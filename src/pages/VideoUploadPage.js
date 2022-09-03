import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';

const StyledVideoUpload = styled.div`

.logo > h3 {
    color: #EB5374;
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

.main {
    overflow: hidden;
    height: 92vh;
    display: flex;
    background-color: #161d29;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.uploadVideo {
    display: flex;
    justify-content: center;
    height: 50vh;
    width: 100vw;
}

.container {
    height: 100%;
    width: 40%;
    background-color: #606fe4;
    margin-rigth: 3vw;
    border: 1px solid black;
}

#dropzone {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.filtering {
    height: 100%;
    width: 40%;
    margin-left: 3vw;
    border: 1px solid black;
}
`

export default function VideoUpload() {
    const [existVideo, setExistVideo] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");
    const uploadVideo = useRef();
    const myCanvas = useRef();

    const onDrop = (files) => {
        console.log("upload");
        const formData = new FormData();
        formData.append("file", files[0]);
        console.log(files[0]);
        console.log("서버로 전송 코드 구현해야함!");
        
        setExistVideo(true);
        const fileURL = window.URL.createObjectURL(files[0]);
        console.log(fileURL);
        setVideoSrc(fileURL);
    };

    const renderMyVideo = () => {
        const ctx = myCanvas.current.getContext("2d");
        ctx.drawImage(uploadVideo.current, 0, 0, uploadVideo.current.width, uploadVideo.current.height);
        console.log("render");
        requestAnimationFrame(renderMyVideo);
    }

    useEffect(() => {
        if(existVideo && uploadVideo.current != undefined) {
            console.log(uploadVideo.current.src);
            uploadVideo.current.addEventListener('canplaythrough', () => {
                renderMyVideo();
            });
        }
    })
          

    return ( 
        <StyledVideoUpload>
            <div className="header">
              <div className="logo">
                  <h3>Aegis Video Filtering</h3>
              </div>
            </div>
            <div className="main">
                <div className="uploadVideo">
                {!existVideo ? <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                <section className="container">
                    <div id="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>업로드할 영상을 드롭해주세요!</p>
                    </div>
                </section>
                )}
                </Dropzone> : 
                <video src={ videoSrc } ref={ uploadVideo } controls onCanPlayThrough={ renderMyVideo }/>}
                <div className="filtering">
                    <canvas ref={ myCanvas } width={ uploadVideo.width } height={ uploadVideo.height }></canvas>
                </div>
                </div>
            </div> 
        </StyledVideoUpload>
    );
}
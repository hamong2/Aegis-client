import React from "react";
import Btn from "../components/button";
import styled from "styled-components";

const StyledOpt = styled.div`
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


export default function Opt({handleCamera}) {

    const handleClickCamera = () => {
        handleCamera();
    }

    return(
        <StyledOpt>
            <div className="options">
                <div className="options__top">
                    <Btn btnAction="startRecord"/>
                    <Btn btnAction="Invite"/>
                    <Btn btnAction="Exit" />
                </div>
                <div className="options__bottom">
                    <Btn btnAction="startVideo"/>
                    <Btn btnAction="startAudio"/>
                </div>
            </div>
        </StyledOpt>
    )
}
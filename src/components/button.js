import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from './icons';
const StyledBtn = styled.div`
#stopRecord {
    background-color: red;
}
.button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #606fe4;
    height: 50px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.2rem;
    width: 50px;
    margin: 0.5rem 0;
  }
`

export default function Btn(props) {

    const [btnState, setbtnState] = useState(props.btnAction);

    const changeState = () => {
        switch(btnState){
            case "startVideo":
                props.handleCamera();
                setbtnState("stopVideo");
                break;
            case "stopVideo":
                props.handleCamera();
                setbtnState("startVideo");
                break;
            case "muteAudio":
                props.handleAudio();
                setbtnState("startAudio");
                break;
            case "startAudio":
                props.handleAudio();
                setbtnState("muteAudio");
                break;
            case "startRecord":
                setbtnState("stopRecord");
                break;
            case "stopRecord":
                setbtnState("startRecord");
                break;
            case "Invite":
                props.invite();
                break;
            default:
                break;
        }
    }

    return(
        <StyledBtn>
            <div id={btnState} className="button" onClick={changeState}>
                <Icon iconName={btnState} />
            </div>
        </StyledBtn>
    )
}
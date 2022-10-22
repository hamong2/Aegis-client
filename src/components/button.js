import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from './icons';
const StyledBtn = styled.div`
#stopRecord {
    background-color: red;
}
#plus {
    background-color: #D9D9D9
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF; 
    height: 80px;
    border-radius: 10px;
    color: #646262; 
    font-size: 2rem;
    width: 80px;
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
            case "forward":
                setbtnState("forward");
                break;
            case "backward":
                setbtnState("backward");
                break;    
            case "Upload":
                setbtnState("Upload");
                break
            case "plus":
                setbtnState("plus");
                break
            
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
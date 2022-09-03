import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDoorOpen ,faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, faCircleDot, faStop, faUser} from '@fortawesome/free-solid-svg-icons';

export default function Icon(props) {

    switch(props.iconName){
        case "stopVideo":
            return <FontAwesomeIcon icon={faVideoSlash} />;
        case "startVideo":
            return <FontAwesomeIcon icon={faVideo} />;
        case "muteAudio":
            return <FontAwesomeIcon icon={faMicrophoneSlash} />;
        case "startAudio":
            return <FontAwesomeIcon icon={faMicrophone} />;
        case "startRecord":
            return <FontAwesomeIcon icon={faCircleDot} />;
        case "stopRecord":
            return <FontAwesomeIcon icon={faStop} />;
        case "Exit":
            return <FontAwesomeIcon icon={faDoorOpen} />;
        case "Invite":
            return <FontAwesomeIcon icon={faUser} />;
        default:
            return <image />
    }
}
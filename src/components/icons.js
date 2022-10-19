import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDoorOpen ,faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, faCircleDot, faStop, faUser} from '@fortawesome/free-solid-svg-icons';

export default function Icon(props) {

    switch(props.iconName){
        case "stopVideo":
            return <FontAwesomeIcon icon={faVideoSlash} size="xs"/>;
        case "startVideo":
            return <FontAwesomeIcon icon={faVideo} size="xs"/>;
        case "muteAudio":
            return <FontAwesomeIcon icon={faMicrophoneSlash} size="xs"/>;
        case "startAudio":
            return <FontAwesomeIcon icon={faMicrophone} size="xs"/>;
        case "startRecord":
            return <FontAwesomeIcon icon={faCircleDot} size="xs"/>;
        case "stopRecord":
            return <FontAwesomeIcon icon={faStop} size="xs"/>;
        case "Exit":
            return <FontAwesomeIcon icon={faDoorOpen} size="xs"/>;
        case "Invite":
            return <FontAwesomeIcon icon={faUser} size="xs"/>;
        default:
            return <image />
    }
}
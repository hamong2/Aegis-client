import React from 'react';
import styled from 'styled-components';

const StyledLog = styled.div`

.iter__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.top__blank {
    height: 3vh;
    margin-top: 3vh;
}

.log {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1vh 0 1vh 0;
    width: 13vw;
}
`

export default function IterLog(props) {
    const rendering = () => {
        console.log("real");
        const result = [];
        for(var i = 0; i < props.log.length; i++) {
            var verb = props.log[i][1] 
            var time = props.log[i][0];
            var strTime = ""
            var tmp = time - parseInt(time);
            time = parseInt(time);
            if(tmp==0) strTime += ".00"
            else strTime = strTime + "." + tmp.toString().slice(2,4); 
            for(var j = 0; j < 3; j++) {
                if(j==2) strTime = (time%60).toString() + strTime; 
                else strTime =  ":" + (time%60).toString() + strTime;
                time /= 60;
                time = Math.floor(time);
            }
            result.push(<div className="log">{verb} {strTime}</div>)
        }
        return result
    }
    return (
    <StyledLog>
        <div className="iter__main">
            <div className="top__blank"></div>
            {rendering()}
            </div>
        </StyledLog>);
}
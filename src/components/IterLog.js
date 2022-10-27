import React from 'react';
import styled from 'styled-components';

const StyledLog = styled.div`

.iter__main {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.top__blank {
    height: 2vh;
    margin-top: 1vh;
}

.log {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1vh 0 1vh 0;
    width: 13vw;
}

img {
    margin-right: 0.5vw;
}
`
const fil_12 = ["fuck you"];
const fil_15 = ["smoke", "strangle", "violence"];
const fil_19 = ["stab"];

export default function IterLog(props) {
    const rendering = () => {
        console.log("real");
        const result = [];
        for(var i = 0; i < props.log.length; i++) {
            var verb = props.log[i][1];
            if(verb == "stab") continue; 
            var time = props.log[i][0];
            var strTime = ""
            var tmp = time - parseInt(time);
            time = parseInt(time);
            if(tmp == 0) strTime = ".00"
            else {
                var tmp = parseInt(tmp.toString().slice(2,4));
                if(tmp<10) strTime = ".0" + tmp.toString();
                else strTime = "." + tmp.toString(); 
            }
            for(var j = 0; j < 3; j++) {
                var ins = time % 60;
                if(ins < 10) strTime = "0" + ins.toString() + strTime;
                else strTime = ins.toString() + strTime;
                if(j<2) strTime = ":" + strTime; 
                time /= 60;
                time = Math.floor(time);
            }
            console.log(verb);
            if(fil_12.includes(verb)) result.push(<div className="log"><img width="20px" src="./12.svg"/> {strTime}</div>);
            else if(fil_15.includes(verb)) result.push(<div className="log"><img width="20px" src="./15.svg"/> {strTime}</div>);
            else if(fil_19.includes(verb)) result.push(<div className="log"><img width="20px" src = "./19.svg"/> {strTime}</div>);
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
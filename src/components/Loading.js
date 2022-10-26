import React from 'react';
import styled from 'styled-components';

const StyledLoading = styled.div`

.background {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #FFFFFFB7;
    z-index:999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
`

export default function Loading() {
    return( 
    <StyledLoading>
        <div className="background">
            <img src="./spinner-loading.gif" width="5%"/>
        </div>
    </StyledLoading>
    );
}
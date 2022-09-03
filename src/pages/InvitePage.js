import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Invite() { 
    const roomId = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/join', {state: roomId});
    })
}
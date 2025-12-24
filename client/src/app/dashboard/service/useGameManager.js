"use client";

import { useEffect , useState} from "react";
import useHostSocket from "./useHostSocket";

export default function useGameManager(roomCode){
    const { ws , ready} = useHostSocket();
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [status, setStatus] = useState(null);

    useEffect(()=>{
        if(!ws || !ready) return;
        
        ws.current.on("game-status",(payload)=>{
            payload.team1 && setTeam1(payload.team1);
            payload.team2 && setTeam2(payload.team2);
            payload.score1 !== undefined && setScore1(payload.score1);
            payload.score2 !== undefined && setScore2(payload.score2);
            payload.status && setStatus(payload.status);
        });

        ws.current.emit("init-game",{roomCode});
    }, [ready]);


    const startGame = (gameType)=>{
        if(!ws || !ready) return;
        ws.current.emit("start-game",{roomCode : roomCode, gameType: gameType});
    }

    return { team1, team2, score1, score2, status ,startGame};
};
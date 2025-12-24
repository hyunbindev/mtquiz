"use client"

import { useState , useEffect } from "react";
import useHostSocket from "./useHostSocket";
export default function usePlayer(){
    const [player, setPlayer] = useState([]);
    const { ws , ready } = useHostSocket();

    useEffect(()=>{
        if(!ready || !ws.current)  return;
        ws.current.on("player-list", (playload)=>{
            setPlayer(playload.players);
        });
    },[ready]);
    return { player };
}
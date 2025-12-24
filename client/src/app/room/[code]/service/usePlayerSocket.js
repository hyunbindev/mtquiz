"use client"

import { useContext } from "react";
import { PlayerSocketContext } from "./PlayerSocketContext";

export default function usePlayerSocket(){
    const playerSocket = useContext(PlayerSocketContext);

    if(!playerSocket){
        throw new Error("웹소켓 초기화 실패");
    }

    return playerSocket;
}
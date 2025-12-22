"use client"
import { useState ,useEffect } from "react";
import useHostSocket from "./useHostSocket";

export default function useCreateRoom(){
    const[roomCode, setRoomCode]=useState(null);
    
    //context에서 웹소켓 참조
    const { ws ,ready} = useHostSocket();

    useEffect(()=>{
        //웹소켓 null 방어로직 
        if(!ready) return;
        
        //방 코드 수신
        ws.current.on("room-code", (code)=>{
            setRoomCode(code);
        });

        //방 생성 요청
        ws.current.emit("create-room");
        
    }, [ready]);

    return { roomCode };
}
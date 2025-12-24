"use client"

import { useState } from "react"
import usePlayerSocket from "./usePlayerSocket"

export default function useJoinRoom(code){
    const [name, setName] = useState("");
    const { ws } = usePlayerSocket();

    const joinRoom = () => {
        //공백이름 방어 로직
        if(name.trim().length === 0){
            alert("이름을 입력해 주세요");
            return;
        }
        //방 참가 성공 이벤트 수신
        ws.current.on("join-room-success", ()=>{
            console.log("방 참가 성공");
        });
        
        //방 참가 요청
        ws.current.emit("join-player", { code, name });
    }

    return { joinRoom , setName , name };
};
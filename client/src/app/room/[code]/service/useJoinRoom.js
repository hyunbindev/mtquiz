"use client"

import { useState } from "react"
import usePlayerSocket from "./usePlayerSocket"
import axios from 'axios'
import { io } from "socket.io-client";
export default function useJoinRoom(code){
    const [name, setName] = useState("");
    const { ws } = usePlayerSocket();

    const initSocket = ()=>{
        //소켓 연결
        const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL,{
            transports: ["websocket"],
            withCredentials: true,
        });

        
        //소켓 참조 저장
        ws.current = socket;

        //방 참가 성공 이벤트 수신
        ws.current.on("join-room-success", ()=>{
            console.log("방 참가 성공");
        });

        socket.on("connect", () => {
            //setReady(true);
            console.log(socket);
        });
        //방 참가 요청
        ws.current.emit("join-player", { code });
    }

    const joinRoom = () => {
        //공백이름 방어 로직
        if(name.trim().length === 0){
            alert("이름을 입력해 주세요");
            return;
        }

        axios.post("/api/auth/login/host",{"nickName":name},{ withCredentials : true})
        .then(()=>{initSocket()})
        .catch((e)=>console.error(e));
    }

    return { joinRoom , setName , name };
};
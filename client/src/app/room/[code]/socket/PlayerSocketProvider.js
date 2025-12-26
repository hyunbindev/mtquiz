"use client";
import { useEffect, useRef , useState} from 'react';
import { io } from "socket.io-client";
import { PlayerSocketContext } from "../service/PlayerSocketContext";

export default function PlayerSocketProvider({children}) {
    const playerSocket = useRef(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (playerSocket.current) return;

        const initSocket = ()=>{
            //소켓 연결
            const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL,{
                transports: ["websocket"],
                withCredentials: true,
            });
            //소켓 참조 저장
            playerSocket.current = socket;

            socket.on("connect", () => {
                setReady(true);
            });
        }



        //컴포넌트 종료시 소켓 연결 해제(방 종료시)
        return () => {
            if (playerSocket.current) {
                playerSocket.current.disconnect();
            }
        };
    },[]);
    //호스트 소켓 반환
    return (
        <PlayerSocketContext.Provider value={{ws: playerSocket, ready: ready}}>
            {children}
        </PlayerSocketContext.Provider>
    );
}
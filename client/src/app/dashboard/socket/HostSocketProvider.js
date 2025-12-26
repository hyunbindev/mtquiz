"use client";
import { useEffect, useRef , useState} from 'react';
import { io } from "socket.io-client";
import { HostSocketContext } from "../service/HostSocketContext";
import axios from 'axios';

export default function HostSocketProvider({children}) {
    const hostSocket = useRef(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (hostSocket.current) return;


        const initSocket = ()=>{
            //소켓 연결
            const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL,{
                transports: ["websocket"],
                withCredentials: true,
            });
            //소켓 참조 저장
            hostSocket.current = socket;

            socket.on("connect", () => {
                setReady(true);
            });
        }

        axios.post(`/api/auth/login/host`,{},{ withCredentials: true })
        .then(()=>{initSocket()})
        .catch((e)=>console.error(e));

        //컴포넌트 종료시 소켓 연결 해제(방 종료시)
        return () => {
            if (hostSocket.current) {
                hostSocket.current.disconnect();
                hostSocket.current = null;
            }
        };
    },[]);
    //호스트 소켓 반환
    return (
        <HostSocketContext.Provider value={{ws: hostSocket, ready: ready, hostSocket}}>
            {children}
        </HostSocketContext.Provider>
    );
}
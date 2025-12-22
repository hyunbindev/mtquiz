"use client";
import { useEffect, useRef , useState} from 'react';
import { io } from "socket.io-client";
import { HostSocketContext } from "../service/HostSocketContext";
export default function HostSocketProvider({children}) {
    const hostSocket = useRef(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (hostSocket.current) return;
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

        //컴포넌트 종료시 소켓 연결 해제(방 종료시)
        return () => {
            if (hostSocket.current) {
                hostSocket.current.disconnect();
            }
        };
    },[]);
    //호스트 소켓 반환
    return (
        <HostSocketContext.Provider value={{ws: hostSocket, ready: ready}}>
            {children}
        </HostSocketContext.Provider>
    );
}
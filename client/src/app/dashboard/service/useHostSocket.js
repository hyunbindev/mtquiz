"use client";

import { useContext } from "react";
import { HostSocketContext } from "./HostSocketContext";

export default function useHostSocket(){
    const hostSocket = useContext(HostSocketContext);

    if(!hostSocket){
        throw new Error("웹소켓 초기화 실패");
    }

    return hostSocket;
}
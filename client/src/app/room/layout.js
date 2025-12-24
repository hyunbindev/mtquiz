"use client";
import PlayerSocketProvider from "./[code]/socket/PlayerSocketProvider";
export default function Layout({children}){
    return(
        <PlayerSocketProvider>
            {children}
        </PlayerSocketProvider>
    )
}
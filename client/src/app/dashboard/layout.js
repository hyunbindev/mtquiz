"use client";
import HostSocketProvider from "./socket/HostSocketProvider";
export default function Layout({children}){
    return(
        <HostSocketProvider>
            {children}
        </HostSocketProvider>
    )
}
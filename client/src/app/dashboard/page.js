"use client";
import { QRCodeSVG } from "qrcode.react";
import useCreateRoom from "./service/useCreateRoom";
import style from './style.module.css'
export default function DashBoard(){
    const { roomCode } = useCreateRoom();
    return(
        <div id={style.page}>
            <div id={style.qr_container}>
                {roomCode && <QRCodeSVG size={"20rem"} value={`${process.env.NEXT_PUBLIC_API_URL}/room/${roomCode}`} />}
            </div>
            <div id={style.user_list}>
                <div>총 참여 인원 : 5</div>
                <div>user</div>
                <div>user</div>
                <div>user</div>
                <div>user</div>
            </div>
            <button id={style.start}>시작하기</button>
        </div>
    )
}
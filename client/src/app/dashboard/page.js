"use client";
import { QRCodeSVG } from "qrcode.react";
import useCreateRoom from "./service/useCreateRoom";
import usePlayer from "./service/usePlayer";
import { useRouter } from "next/navigation";
import style from './style.module.css';
export default function DashBoard(){
    const { roomCode } = useCreateRoom();
    const { player } = usePlayer();

    const router = new useRouter();

    const startGame = ()=>{
        router.push(`/dashboard/${roomCode}`);
    };


    return(
        <div id={style.page}>
            <div id={style.qr_container}>
                {roomCode && <QRCodeSVG size={"20rem"} value={`${process.env.NEXT_PUBLIC_API_URL}/room/${roomCode}`} />}
            </div>
            <div id={style.user_list}>
                <div>총 참여 인원 : {player.length}</div>
                {
                    player.map((p, index)=>(
                        <div key={index}>{p.name}</div>
                    ))
                }
            </div>
            <button id={style.start} onClick={startGame}>시작하기</button>
        </div>
    )
}
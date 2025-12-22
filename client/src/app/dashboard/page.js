"use client";
import { QRCodeSVG } from "qrcode.react";
import style from './style.module.css'
export default function DashBoard(){
    return(
        <div id={style.page}>
            <div id={style.qr_container}>
                <QRCodeSVG size={"20rem"} value="https://mtquiz.wuwan.dev" />
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
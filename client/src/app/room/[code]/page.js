"use client"

import React, { useState } from "react"

import useJoinRoom from "./service/useJoinRoom"

export default function playerPage({ params }){
    const { code } = React.use(params);
    const {joinRoom , setName , name} = useJoinRoom(code);
    return(
        <div>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="이름을 입력해 주세요"/>
            <button onClick={joinRoom}>방 참가</button>
        </div>
    )
}
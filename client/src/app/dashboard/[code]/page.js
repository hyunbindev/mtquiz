"use client"
import style from './style.module.css'

import React from 'react';
import useGameManager from '../service/useGameManager';
import SenseQuiz from '../component/SenseQuiz';

export default function DashBoardPlay({params}){
    const { code } = React.use(params);
    const { team1, team2, score1, score2, status, startGame } = useGameManager(code);

    const gamerender = ()=>{
        if(status === "sense") return <SenseQuiz/>;
    }

    return(
        <div id={style.dashboard}>
            <div id={style.score}>
                <div>
                    <div>{score1}</div>
                </div>
                <div>
                    <div>{score2}</div>
                </div>
            </div>
            <div id={style.content}>
                {status !== "ready" && <div id={style.game_container}>
                    <div id={style.game_frame}>
                        {gamerender()}
                    </div>
                </div>}
                <div className={style.team_list}>
                    {team1.map((member)=>(
                        <div key={member.id}>{member.name}</div>
                    ))}
                </div>

                <div className={style.game_list}>
                    <div onClick={()=>startGame("sense")}>상식 퀴즈</div>
                    <div>노래 맞추기</div>
                    <div>연타</div>

                </div>

                <div className={style.team_list}>
                    {team2.map((member)=>(
                        <div key={member.id}>{member.name}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}
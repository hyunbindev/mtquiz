import style from './style.module.css'
export default function DashBoardPlay(){
    return(
        <div>
            <div id={style.score}>
                <div>
                    <div>1000</div>
                </div>
                <div>
                    <div>1000</div>
                </div>
            </div>
            <div>
                <div>상식 퀴즈</div>
                <div>손가락</div>
            </div>
        </div>
    )
}
import {v4} from 'uuid';
import redisClient from '#loader/redisClient';
import logger from '#loader/logger';

//player session 생성
const loginPlayer = async (nickname)=>{
    //세션 객체 생성
    const session = {
        nickname:nickname,
        role: "player",
        createdAt: new Date(),
    };
    return session;
}

//host session 생성
const loginHost = async ()=>{
    const session = {
        role:"host",
        createdAt: new Date(),
    };
    return session;
}
export default { loginPlayer, loginHost };
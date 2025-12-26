
export default class Player{
    constructor(nickName, sessionId){
        this.sessionId = sessionId;
        this.nickName = nickName;
    }
    setTeam(teamNo){
        this.team = teamNo;
    }
}
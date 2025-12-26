import { v4 } from 'uuid';
import SenseQuizManager from '#service/game/sense/SenseQuizManager'
import Player from '#model/Player'
export default class Room{
    constructor( hostSocket , io){
        this.roomId = v4();
        this.hostSocket = hostSocket;
        this.players = new Map();
        this.io = io;
        this.status = "wait";
        this.team1 = [];
        this.team2 = [];
        this.score1 = 0;
        this.score2 = 0;

        hostSocket.join(this.roomId);

        this.senseQuizManager = new SenseQuizManager(this.io, this);

        io.to(this.roomId).emit("room-code",this.roomId);
    }
    
    addPlayer(socket){
        socket.join(this.roomId);
        const sessionId = socket.request.session.sessionID;
        const nickname = socket.request.session.user.nickname;
        this.players.set(sessionId, new Player(nickname,sessionId));
        this.io.to(this.roomId).emit("player-list",{playerList : Array.from(this.players.values(), (p)=> p.nickName)});
    }
    
    startRoom(hostSocket){
        if(hostSocket.request.session.sessionID !== this.hostSocket.request.session.sessionID) return;
        if(this.status !== "wait") return;
        this.status = "ready";
        const playerArr = Array.from(this.players.values());
        for(let i=0; i<playerArr.length; i++){
            if(i%2 === 0){
                this.team1.push(playerArr[i].nickName);
                this.players.get(playerArr[i].sessionId).setTeam(1);
            }else{
                this.team2.push(playerArr[i].nickName);
                this.players.get(playerArr[i].sessionId).setTeam(2);
            }
        }
        this.emitStatus();
    }

    startGame(hostSocket, type){
        if(hostSocket.request.session.sessionID !== this.hostSocket.request.session.sessionID) return;
        switch (type) {
            //상식 퀴즈 시작
            case "sense":
                this.senseQuizManager.gameStart();
                break;
            default:
                break;
        }
    }

    removePlayer(session){
        if(session.role !== 'player') return;
        this.players.delete(session.id);
    }

    emitNotification(payLoad){
        this.io.to(this.roomId).emit("notification", payLoad);
    }

    emitUpdate(payLoad){
        this.io.to(this.roomId).emit("update", payLoad);
    }

    emitChat(payLoad){
        this.io.to(this.roomId).emit("chat",payLoad);
    }

    emitStatus(){
        const status = {
            playerList : Array.from(this.players.values()),
            status : this.status,
            team1 : this.team1,
            team2 : this.team2,
            score1 : this.score1,
            score2 : this.score2,
        }
        this.io.to(this.roomId).emit("status",status);
    }

    destroy(){
        this.io.in(this.roomId).disconnectSockets(true);
    }
}
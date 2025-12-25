import { v4 } from 'uuid';
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

        io.to(this.roomId).emit("room-code",this.roomId);
    }
    
    addPlayer(session, socket){
        socket.join(roomId);
        this.players.set(session.id, session.nickName);
        this.emitStatus();
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
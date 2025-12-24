import { v4 } from 'uuid';

class RoomManager {
    constructor() {
        this.rooms = new Map();
    }

    initIo(io){
        this.io = io;
    }

    //방생성
    createRoom(socket){
        const roomCode = v4();
        const room = new Room(roomCode, socket);
        this.rooms.set(roomCode, room);
        socket.join(roomCode);
        return roomCode;
    }
    
    //게임 시작
    initGame(socket, roomCode){
        const room = this.rooms.get(roomCode);
        if(room && room.hostSocket.id === socket.id){
            room.initGame();
        }
        //방상태 전파
        this.emitRoomStatus(roomCode);
    }

    //방 상태
    emitRoomStatus(roomCode){
        const room = this.rooms.get(roomCode);
        if(!room) return;
        this.io.to(roomCode).emit("game-status",
            {
                status: room.status,
                team1: Array.from(room.team1.values()).map(p=>({id: p.socket.id, name: p.name})),
                team2: Array.from(room.team2.values()).map(p=>({id: p.socket.id, name: p.name})),
                score1: room.score1,
                score2: room.score2,
            }
        );
    }

    //방 참가
    joinRoom(socket, roomCode, name){
        const room = this.rooms.get(roomCode);
        if(room){
            room.addParticipant(socket, name);
            socket.join(roomCode);
            room.hostSocket.emit("player-list", {players : Array.from(room.participants.values()).map(p=>({id: p.socket.id, name: p.name}))} );
        }
    }

    startGame(roomCode, gameType){
        const room = this.rooms.get(roomCode);
        if(!room || room.status !== "ready") return;
        room.startGame(gameType);
    }
}

class Room{
    team1 = [];
    team2 = [];
    constructor(roomCode, hostSocket){
        this.status = "waiting";
        this.score1 = 0;
        this.score2 = 0;
        this.roomCode = roomCode;
        this.hostSocket = hostSocket;
        this.participants = new Map();
    }

    addParticipant(socket,name){
        const player = new Player(socket, name);
        this.participants.set(socket.id, player);
    }

    initGame(){
        if(this.status !== "waiting") return;
        //팀 배열화
        const playersArray = [...this.participants.values()];
        //팀 나누기
        for(let i=0; i<playersArray.length; i++){
            if(i%2===0){
                this.team1.push(playersArray[i]);
            } else {
                this.team2.push(playersArray[i]);
            }
        }
        this.status = "ready";
    }
    startGame(gameType){
        if(this.status !== "ready") return;
        this.status = gameType;
    }
}

class Player{
    constructor(socket, name){
        this.socket = socket;
        this.name = name;
    }
}

export default new RoomManager();
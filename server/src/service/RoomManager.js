import { v4 } from 'uuid';

class RoomManager {
    constructor() {
        this.rooms = new Map();
    }
    //방생성
    createRoom(socket){
        const roomCode = v4();
        const room = new Room(roomCode, socket.id);
        this.rooms.set(roomCode, room);
        socket.join(roomCode);
        return roomCode;
    }
    
    //게임 시작
    startGame(socket, roomCode){
        const room = this.rooms.get(roomCode);
        if(room && room.hostSocketId === socket.id){
            room.startGame();
        }
        //방상태 전파
        socket.to(roomCode)
            .emit("game-started",
                {
                    status: room.status,
                    team1: room.team1,
                    team2: room.team2
                }
            );
    }
    //방 참가
    joinRoom(socket, roomCode, playerName){
        const room = this.rooms.get(roomCode);
        if(room){
            room.addParticipant(socket, playerName);
            socket.join(roomCode);
        }
    }
}

class Room{
    team1 = [];
    team2 = [];
    constructor(roomCode, hostSocketId){
        this.status = "waiting";
        this.score1 = 0;
        this.score2 = 0;
        this.roomCode = roomCode;
        this.hostSocketId = hostSocketId;
        this.participants = new Set();
    }

    addParticipant(socket,name){
        const player = new Player(socket.id, name);
        this.participants.add(player);
    }

    startGame(){
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
}

class Player{
    constructor(socketId, name){
        this.socketId = socketId;
        this.name = name;
    }
}

export default new RoomManager();
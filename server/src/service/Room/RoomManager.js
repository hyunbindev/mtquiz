import Room from '#model/Room';
export default class RoomManager{
    constructor(io){
        this.rooms = new Map();
        this.io = io;
    }

    //방생성
    createRoom(hostSocket){
        //host session check
        if(hostSocket.request.session.user.role !== 'host') return;
        const room = new Room(hostSocket, this.io);
        this.rooms.set(room.roomId, room);
    }

    startRoom(hostSocket, roomId){
        if(hostSocket.request.session.user.role !== 'host') return;
        const room = this.rooms.get(roomId);
        room.startRoom(hostSocket);
    }

    startGame(hostSocket, roomId, type){
        const room = this.rooms.get(roomId);
        room.startGame(hostSocket,type);
    }

    joinRoom(playerSocket ,roomId){
        //player session check
        if(playerSocket.request.session.user.role !== 'player') return;

        const room = this.rooms.get(roomId);

        //대기 상태 아닐경우 신규 참가 불가
        if(!room || room.status !== 'wait') return;
        
        room.addPlayer(playerSocket);

        return room.roomId;
    }

    destroyRoom(session){
        this.rooms.get(session.id)
    }
}
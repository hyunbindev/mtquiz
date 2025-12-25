import Room from '#model/room';
export default class RoomManager{
    constructor(io){
        this.rooms = new Map();
        this.io = io;
    }

    //방생성
    createRoom(hostSocket){
        //host session check
        
        const room = new Room(hostSocket, this.io);
        this.rooms.set(room.roomId, room);

    }

    joinRoom(session, playerSocket ,roomId){
        //player session check
        if(session.role !== 'player') return;
        const room = this.rooms.get(roomId);
        room.addPlayer(session, playerSocket);
    }

    destroyRoom(session){
        this.rooms.get(session.id)
    }
}
import logger from '#loader/logger'
import RoomManager from '#service/room/RoomManager'
export default function socketHandler(io) {
    const roomManager = new RoomManager(io);
    io.on("connection", (socket) => {
        const role = socket.request.session.user.role;
        //방생성
        socket.on("create-room",()=>{
            if(role !== 'host') return;
            roomManager.createRoom(socket,io);
        });
        //방 준비상태
        socket.on("room-start",(payload)=>{
            if(role !== 'host') return;
            roomManager.startRoom(socket,payload.code);
        });

        socket.on("join-player",(payload)=>{
            if(role !== 'player') return;
            const roomId = roomManager.joinRoom(socket,payload.code);
            if(roomId) socket.emit("join-room-success");
        });

        socket.on("start-game",(payload)=>{
            if(role !== 'host') return;
            
            roomManager.startGame(socket, payload.code, payload.type);
        });

        socket.on("disconnect",()=>{logger.info('user disconnected')});
    });
}
import logger from '#loader/logger'
import RoomManager from '#service/room/RoomManager'
export default function socketHandler(io) {
    const roomManager = new RoomManager(io);
    io.on("connection", (socket) => {
        //방생성
        socket.on("create-room",()=>{
            if(socket.request.session.user.role !== 'host') return;
            roomManager.createRoom(socket,io);
        });
        

        socket.on("disconnect",()=>{logger.info('user disconnected')});
    });
}
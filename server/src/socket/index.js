import logger from '#loader/logger'
import RoomManager from '#service/room/RoomManager'
export default function socketHandler(io) {
    const roomManager = new RoomManager(io);
    io.on("connection", (socket) => {
        console.log(socket.request.session);
        //방생성
        socket.on("create-room",()=>{
            if(socket.request.session.user.role !== 'host') return;
            roomManager.createRoom(socket,io);
        });
        
        socket.on("join-player",(code)=>{
            if(socket.request.session.user.role !== 'player') return;
            console.log(socket.request.session);
            roomManager.joinRoom(socket.request.session, socket,code);
        });

        socket.on("disconnect",()=>{logger.info('user disconnected')});
    });
}
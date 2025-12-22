import RoomManager from "../service/RoomManager.js";
export default function socketHandler(io) {
    io.on("connection", (socket) => {

        socket.on("create-room", ()=>{
            const roomCode = RoomManager.createRoom(socket);
        });

        socket.on("join-room", (roomCode) => {
            socket.join(roomCode);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected:", socket.id);
        });
    });
}
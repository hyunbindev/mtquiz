import { log } from "console";
import RoomManager from "../service/RoomManager.js";
export default function socketHandler(io) {
    io.on("connection", (socket) => {
        log("a user connected:", socket.id);
        
        //방생성
        socket.on("create-room", ()=>{
            const roomCode = RoomManager.createRoom(socket);
            socket.emit("room-code", roomCode);
        });

        socket.on("join-room", (roomCode) => {
            socket.join(roomCode);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected:", socket.id);
        });
    });
}
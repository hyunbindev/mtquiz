import { log } from "console";
import RoomManager from "../service/RoomManager.js";
export default function socketHandler(io) {
    RoomManager.initIo(io);
    io.on("connection", (socket) => {
        log("a user connected:", socket.id);
        
        //방생성
        socket.on("create-room", ()=>{
            const roomCode = RoomManager.createRoom(socket);
            socket.emit("room-code", roomCode);
        });
        
        //방 참여
        socket.on("join-room", (roomCode) => {
            socket.join(roomCode);
        });

        //플레이어 방 참가
        socket.on("join-player", ({ code, name }) => {
            RoomManager.joinRoom(socket, code, name);
            
            console.log("Player joined:", name, "to room:", code);

            socket.emit("join-room-success");

        });

        //게임 시작 초기화
        socket.on("init-game", ({roomCode}) => {
            RoomManager.initGame(socket, roomCode);
        });

        socket.on("start-game", ({roomCode, gameType}) => {
            RoomManager.startGame(socket, roomCode, gameType);
            console.log("Game started in room:", roomCode, "with type:", gameType);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected:", socket.id);
        }); 
    });
}
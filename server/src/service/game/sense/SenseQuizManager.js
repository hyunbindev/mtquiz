import SenseQuizGenerator from "#service/game/sense/SenseQuizGenerator";
import logger from "#loader/logger";
import session from "express-session";
export default class SenseQuizManager {
    waiting = false;
    context = [];
    tryCount = 0;
    pendig = false;
    constructor(io,room){
        this.io=io;
        this.generator = SenseQuizGenerator;
        this.room =room;
    }

    async gameStart(){
        this.room.status = "sens";
        this.room.emitStatus();
        
        this.room.hostSocket.on("pass",()=>this.questionPass());

        const sockets = await this.io.in(this.room.roomId).fetchSockets();

        for(const socket of sockets){
            if(socket.request.session.user.role === 'host') continue;

            socket.on("answer",(payload)=>{this.answer(socket,payload.answer)});
        }

        await this.getQuestion();
    }

    answer(socket,answer){
        const sessionId = socket.request.session.sessionID;
        const qas = this.question.answers;
        for(const a of qas){
            if(a.trim() === answer.trim()){
                const player = this.room.players.get(sessionId);
                if(player.team == 1){
                    this.room.score1+=100;
                }else{
                    this.room.score2+=100;
                }
                this.io.to(this.room.Id).emit("sens-game",{
                    type : "correct",
                    player : player.nickName
                });
                this.room.emitStatus();
                this.correct();
                return;
            }
        }
        tryCount++;
        return;
    }

    questionPass(){
        if(!this.question) return;
        this.context.push({q : this.question, try : this.tryCount, correct : 'fail'});
        this.tryCount = 0;
        this.getQuestion();
    }

    correct(){
        this.context.push({q : this.question, try : this.tryCount, correct : 'success'});
        this.tryCount = 0;
        this.getQuestion();
    }

    gameExit(){
        this.room.status = "ready";
        this.room.emitStatus();
    }

    async getQuestion(){
        if(this.pendig) return;

        this.pendig = true;
        this.question = await this.generator.getQuestion(this.context);
        this.io.to(this.room.roomId).emit("sens-game",{
            type : "question",
            question : this.question.question,
            comment : this.question.comment,
        });
        this.pendig = false;
        
        return this.question;
    }
}
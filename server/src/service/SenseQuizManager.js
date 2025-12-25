import SenseQuizGenerator from "./SenseQuizGenerator.js";

export default class SenseQuizManager {
    waiting = false;
    context = [];
    currentQuiz = null;
    tryCount = 0;
    constructor(io,room){
        this.io=io;
        this.generator = SenseQuizGenerator;
        this.room =room;
    }

    async gameStart(){
        this.room.status = "sens";
        this.room.emitRoomStatus();
    }

    listenEvent(){
        const hostSocket = this.room.hostSocket;
        hostSocket.on("answer",(answer)=>{
            
        });
        this.getQuiz(this.context);
    }

    

    async getQuiz(context){
        const quiz = await this.generator.getQuestion(context);
        this.currentQuiz = quiz;
        const question = await this.getQuiz(this.context);
        this.io.to(this.room.codeCode).emit("sens-question",{question: question});
    }

    async answer(answer){
        this.currentQuiz.answers.forEach((ans)=>{
            if(ans.trim() === answer.trim()){
                this.context.push({q : this.currentQuiz, retryCount: this.tryCount, correct: true});
                this.tryCount = 0;

                return true;
            }
        });
        tryCount++;
        return false;
    }

    async pass(){
        this.context.push({q : this.currentQuiz, retryCount: this.tryCount, correct: false});
        this.tryCount = 0;
        return this.getQuiz(this.context);
    }
}
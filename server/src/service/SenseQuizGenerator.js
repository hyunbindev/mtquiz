import {GoogleGenerativeAI} from "@google/generative-ai"

class SenseQuizGenerator {
    constructor() {
        //api key env로 옮겨야함
        this.genAI = new GoogleGenerativeAI("gemini api key");
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    }
    async getQuestion(historyContext){
        try{
            const context = `${historyContext}는 지난 퀴즈 정보야 이 정보에 중복되지 않으며, 정확도와 시도 횟수를 고려하여`
            const prompt = `고등학생 졸업 에서 대학생 수준으로 상식 퀴즈 하나 내줘 반듯이 아래 JSON구조를 지키며 단답으로 응답해줘 난이도는 중간에서 어려움으로 랜덤으로 섞어줘 답의 표현이 여러개일 수 있으니 답변은 배열로 줘`
                           +`question: "string,`
                           +`answers: ["string","string", "string"]`
            const result = await this.model.generateContent(context+prompt);
            const text = result.response.text();
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const jsonString = jsonMatch[0];
                const quiz = JSON.parse(jsonString);
                return quiz;
            }
        }catch(e){
            throw e;
        } 
    }
}
export default new SenseQuizGenerator();
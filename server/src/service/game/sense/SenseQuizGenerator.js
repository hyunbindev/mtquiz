import {GoogleGenerativeAI} from "@google/generative-ai"
import logger from "#loader/logger";
class SenseQuizGenerator {
    constructor() {
        //api key env로 옮겨야함
        this.genAI = new GoogleGenerativeAI("gemini api key");
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" ,generationConfig: {responseMimeType: "application/json"}});
    }
    async getQuestion(context){
        const historyString = JSON.stringify(context);
        try{
            const context = `사용자들의 최근 퀴즈 기록 : ${historyString}`
            const prompt = `[지침]`
                           +`1.위 기록과 중복되지 않는 새로운 상식 퀴즈를 한문제만 생성하고 주관식으로 생성하세요 `
                           +`2. 유저의 수준(정답률, 시도횟수)을 분석하여 난이도를 조절하세요.`
                           +`- 정답률이 낮고 시도가 많으면 다음 문제들의 난이도를 낮추세요. 식같은 긴 정답의 문제는 내지 말고, 단답식,주관식으로 생성하세요`
                           +`- 정답률이 높으면 난이도를 중간에서 어려움으로 상향하세요.`
                           +`- question 필드는 질문만 넣으세요.`
                           +`3. **중요: 'comment' 필드는 문제에 대해 유저에게 직접 말을 거는 대화체로 도발하세요.**`
                           +`- 첫 문제라면: 가볍게 도발하며 시작하세요.`
                           +`4. 반드시 아래 JSON 배열 구조로만 응답하세요. (다른 설명 금지)`
                           +`5. **이 문제는 보기가 없는 '주관식 단답형' 문제입니다.** 유저가 직접 타이핑해서 맞춰야 합니다.`
                           +`- **'answers' 배열에는 유저가 입력했을 때 정답으로 인정될 수 있는 모든 단어(동의어, 외래어 등)만 넣으세요.** 절대 객관식 보기를 넣지 마세요.`
                           +`[json 구조]`
                           +`{`
                            +`question: "질문 문자열",`
                            +`answers: ["정답1","정답2"]`
                            +`comment : "유저에게 날릴 코멘트"`
                           +`}`
            const result = await this.model.generateContent(context+prompt);
            const text = result.response.text();
            const jsonMatch = text.match(/\{[\s\S]*\}/);

            if (jsonMatch) {
                const jsonString = jsonMatch[0];
                const quiz = JSON.parse(jsonString);
                return quiz;
            }
            return null;
        }catch(e){
            logger.error("gemini error : ",e)
        } 
    }
}
export default new SenseQuizGenerator();
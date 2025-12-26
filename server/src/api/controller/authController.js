import logger from '#loader/logger'
import authService from '#service/AuthService'
export const loginPlayer = async(req,res)=>{
    try{
        const { nickName } = req.body;
        logger.debug("nickname");
        if(!nickName || nickName.trim().length < 1){
            return res.status(400).json({
                message: "이름을 입력해 주세요.",
            });
        }
        const session = await authService.loginPlayer(nickName);
        req.session.user = session;
        req.session.save((err)=>{
            if(err) throw err;
            return res.status(200).end();
        })
        return res.status(200).end();
    }catch(e){
        logger.error(`fail to player session issue: ${e}`);
    }
}

export const loginHost = async(req,res)=>{
    try {
        const session = await authService.loginHost();

        req.session.user = session;

        //session save
        req.session.save((err)=>{
            if(err) throw err;
            return res.status(200).end();
        });
    } catch (e) {
        logger.error(`fail to host session issue: ${e}`)
    }
}
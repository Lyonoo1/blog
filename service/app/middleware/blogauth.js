
module.exports = (option)=>{
    return async function jwt(ctx,next){
        const token = ctx.request.header.authorization.split('===')
        let decode = ''
        if(token[0]){
            try{
            decode=ctx.app.jwt.verify(token,option.secret)
            await next()
            console.log('decode======='+decode)
        }catch(error){
            ctx.status=401;
            ctx.body={
                message:error.message
            }
            return;
        }
    }else{
        ctx.status=401;
        ctx.body={
            message:'No  token'
        }
        return
    }
    }
}
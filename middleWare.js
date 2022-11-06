const bodyParse = ()=>{
    return  async (ctx,next)=>{
        ctx.request.body = await new Promise((resolve)=>{
            let arr = []
            ctx.req.on('data',(chunk)=>{
                arr.push(chunk)
            })

            ctx.req.on('end',()=>{
                resolve(Buffer.concat(arr).toString())
            })
        })

        await next()
    }
}

module.exports = bodyParse
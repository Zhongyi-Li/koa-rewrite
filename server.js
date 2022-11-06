// const Koa = require('koa')
const Koa = require('./koa/lib/application')
const app = new Koa()

function sleep(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },1200)
    })
}

app.use(async(ctx,next)=>{
    console.log('1');
    ctx.body = 'body1'
    await next()
    console.log(2);
})

app.use(async(ctx,next)=>{
    console.log('3');
    ctx.body = 'body2'
    await sleep()
    await next()
})

app.use(async(ctx,next)=>{
    console.log('5');
    ctx.body = 'body3'
    await next()
})

app.on('error',(err)=>{
    console.log('error---',err);
})

app.listen(3100,()=>{
    console.log('监听在3100');
})
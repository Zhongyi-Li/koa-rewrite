const Koa = require('koa')
const { createReadStream } = require('fs')
const path = require('path')
const bodyParse = require('./middleWare')
const { resolve } = require('path')
const app = new Koa()

app.use(bodyParse())

app.use( (ctx,next)=>{
    console.log('qqq---');
    if(ctx.path  === '/login' && ctx.method === 'GET'){
        ctx.set('Content-Type','text/html')
        // ctx.type = 'text/html;charset=utf-8'
        ctx.body = createReadStream(path.resolve(__dirname,'index.html'))
    }else{
       return next()
    }
})

app.use(async (ctx,next)=>{
    if(ctx.path  === '/login' && ctx.method === 'POST'){
        ctx.body = ctx.request.body
    }
})

app.listen(3001,function(){
    console.log('监听在3000端口');
})
// const Koa = require('koa')
const Koa = require('./koa/lib/application')
const app = new Koa()

app.use((ctx,next)=>{
    console.log('ctx-path',ctx.request.path);
    console.log('ctx-query',ctx.request.query);
})
app.listen(3100,()=>{
    console.log('监听在3100');
})
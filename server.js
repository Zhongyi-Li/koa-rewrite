// const Koa = require('koa')
const Koa = require('./koa/lib/application')
const app = new Koa()

app.use((ctx)=>{
    ctx.body = 'Hello World!'
})
app.listen(3100,()=>{
    console.log('监听aaa');
})
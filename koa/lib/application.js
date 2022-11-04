const context= require('./context')
const response = require('./response')
const request = require('./request')

const http = require('node:http');

class Koa {
    constructor(){
        //每次都基于原有的对象创建一个新的对象(将现有的对象作为新对象的prototype) 修改新的对象时不会影响到原对象
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
    }

    use(callback){
        this.middleWare = callback
    }

    createContext(req,res){
        //隔离请求 每一次的请求都是独立的对象 下次的请求不会拿到上次请求对象的属性
        const ctx = Object.create(this.context)
        const request = Object.create(this.request)
        const response = Object.create(this.response)
        
        //原生对象
        ctx.req = req
        ctx.res = res

        //koa扩展对象
        ctx.request = request
        ctx.request.req = req
        ctx.response = response
        return ctx
    }

    handleRequest=(req,res)=>{
        const ctx = this.createContext(req,res)
        this.middleWare(ctx)
    }

    listen(...args){
        const server = http.createServer(this.handleRequest)
        server.listen(...args)
    }
}

module.exports = Koa
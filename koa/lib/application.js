const context = require('./context')
const response = require('./response')
const request = require('./request')

const http = require('node:http');   
const EventEmitter = require('events')

class Koa extends EventEmitter{
    constructor() {
        super()
        //每次都基于原有的对象创建一个新的对象(将现有的对象作为新对象的prototype) 修改新的对象时不会影响到原对象
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middleWares = []
    }

    use(callback) {
        // this.middleWare = callback
        this.middleWares.push(callback)
    }

    createContext(req, res) {
        //隔离请求 每一次的请求都是独立的对象 下次的请求不会拿到上次请求对象的属性
        const ctx = Object.create(this.context)
        const request = Object.create(this.request)
        const response = Object.create(this.response)

        //扩展
        ctx.request = request
        ctx.response = response

        //原生
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }

    compose(ctx) {
        const middleWares = this.middleWares
        let idx = -1;
        function dispatch(i) {
            if(i <= idx) return Promise.reject(new Error('next() call multiple'))
            if ( i=== middleWares.length) return Promise.resolve()
            const fn = middleWares[i]
            idx= i 
            try {
                return Promise.resolve(fn(ctx, ()=> dispatch(i+1) ))
            } catch (error) {
                return Promise.reject('system error')
            }
           
        }
        return dispatch(0)
    }

    handleRequest = (req, res) => {
        const ctx = this.createContext(req, res)
        this.compose(ctx).then(() => {
            ctx.res.statusCode = 404
            if (ctx.body) {
                res.end(ctx.body)
            } else {
                res.end('Not found ')
            }
        }).catch(err=>{
            this.emit('error',err)
        })
        // this.middleWare(ctx)

    }

    listen(...args) {
        const server = http.createServer(this.handleRequest)
        server.listen(...args)
    }
}

module.exports = Koa
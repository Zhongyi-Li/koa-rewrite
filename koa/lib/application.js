const http = require('node:http');

class Koa {
    constructor(){
        
    }

    use(){

    }

    listen(port,callback){
        const server = http.createServer()
        server.listen(port,callback)
    }
}

module.exports = Koa
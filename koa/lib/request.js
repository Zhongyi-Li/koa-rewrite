const url = require('url')
const request = {
    get path(){
        return url.parse(this.req.url).pathname
    },
    get query(){
        return url.parse(this.req.url).query
    }
}

module.exports = request
const response = {
    _body:'',
    set body(val){
        this.res.codeStatus = 200
        this._body = val
    },

    get body(){
        return this._body
    }
}

module.exports = response
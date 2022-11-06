const context = {
    // get path(){
    //     return this.request.path
    // }
}

function defineGetter(targert,key){
     context.__defineGetter__(key,function(){
        return this[targert][key]
    })
}
function defineSetter(targert,key){
    context.__defineSetter__(key,function(val){
        this[targert][key] = val
    })
}
defineGetter('request','path')
defineGetter('request','query')
defineGetter('request','header')
defineGetter('request','headers')

defineGetter('response','body')
defineSetter('response','body')
module.exports = context
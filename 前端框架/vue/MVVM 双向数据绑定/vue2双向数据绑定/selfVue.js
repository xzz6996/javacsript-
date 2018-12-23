function SelfVue(options){
    this.data=options.data;
    this.el=options.el;
    Observer(this.data);
    var _this=this;
    Object.keys(this.data).forEach(function(key){
        _this.proxyPath(key);
    })
    new Compile(options.el, this.vm);
    return this;
}
SelfVue.prototype={
    proxyPath:function(key){
        var _this=this;
        Object.defineProperty(this,key,{
            enumerable: false,
            configurable: true,
            get:function getter(){
                return this.data[key]
            },
            set:function setter(newVal){
                this.data[key]=newVal;
            }
        })
    }
}
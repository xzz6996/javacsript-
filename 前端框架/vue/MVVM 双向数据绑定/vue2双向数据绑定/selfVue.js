function SelfVue(options){
    this.data=options.data;
    this.el=options.el;
    Observer(this.data);
    var _this=this;
    Object.keys(this.data).forEach(function(val){
        _this.proxyPath(val);
    })
}
SelfVue.prototype={
    proxyPath:function(val){
        
        Object.defineProperty(this,val,{
            configurable:true,
            enumerable:false,
            get:function(){

            },
            set:function(){

            }
        })
    }
}
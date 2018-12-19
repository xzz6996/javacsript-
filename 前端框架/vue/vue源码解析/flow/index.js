// npm i -g flow-bin
//flow init 新建一个 .flowconfig
//Flow 是facebook出品的javascript静态类型检查工具
// Flow 通常类型检查分成2种方式  1类型推断:通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。2类型注释:事先注释好我们期待的类型，Flow会基于这些注释来判断

/*@flow*/
function split(str){
    return str.split('');
}
split(11) //Cannot call `str.split` because property `split` is missing in `Number` [1].

/*@flow*/
function add(x: number,y: number): number{
    return x+y;
}
add(5,6)
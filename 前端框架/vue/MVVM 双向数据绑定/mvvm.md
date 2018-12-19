什么是mvvm,mvvm是一种设计思想。
    view <-->viewModel<--> model
 1  m model 数据层,v view 视图层,vm viewModel是同步model和view的对象。 
 2  在mvvm架构下,model和view没有直接的关系。而是通过viewModel进行交互。view和viewModel之间的交互是双向的,model和viewModel之间的交互也是双向的,因此view的变换会更新到model上，同样model数据的变换也会同步到view上。
 3  viewModel通过双向数据的绑定把view层和model层连接起来了,view和model之间的关系就变成同步的,开发者只需要关注业务逻辑,不需要关注数据同步问题,复杂的数据状态维护由mvvm来同意管理。


 实现一个简单的mvvm
  1 思路分析
    view变化更新data, data变化更新view
    view变化更新data,我们可以通过input的监听事件就可以实现。
    重点在于data变化更新到view, 我们可以通过Object.defineProperty()的set函数，当函数变化的时候就会触发这个函数，所以我们可以写一些更新的方法放在里面就行
  2 实现过程
    数据劫持和发布者订阅者模式。我们需要一个observer，用来监听所有的属性。如果属性发生变化，就应该通知订阅者watcher看是否更新。因为订阅者有多个，所以我们也需要一个Dep来专门收集订阅者，然后在监听器observer和watcher之间进行统一管理。接着，我们还需要一个解析器compile，对每个节点进行扫描和解析，将相关指令转化为一个订阅者watcher，并替换模版数据或者绑定相关的函数。此时watcher接收到相应属性的变化，就是执行对应的相关函数。
    a 实现一个监听器observer，用来劫持并监听所有的属性，如果有变动就通知订阅者
    b 实现一个watcher，可以收到属性的变化并执行相应的函数，并跟新函数
    c 实现一个解析器compilce，对每个节点进行扫描和解析，并初始化模版数据以及初始化相应的订阅器。

    http://www.cnblogs.com/canfoo/p/6891868.html
    

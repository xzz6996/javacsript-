https://www.w3cplus.com/javascript/Virtual-DOM-diff.html


这就是所谓的 Virtual DOM 算法。包括几个步骤：

用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了

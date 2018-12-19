var _ = require('./util')
var patch = require('./patch')
var listDiff = require('list-diff2')

//diff函数 对比2棵树
function diff (oldTree, newTree) {
  var index = 0 //当前节点的标志
  var patches = {} //用来记录每个节点差异的对象
  dfsWalk(oldTree, newTree, index, patches)
  return patches
}

//对2棵树进行深度优先遍历
function dfsWalk (oldNode, newNode, index, patches) {
  var currentPatch = []

  // Node is removed.  node 被删除了
  if (newNode === null) {
    // Real DOM node will be removed when perform reordering, so has no needs to do anthings in here
  // TextNode content replacing 文本内容替换
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    if (newNode !== oldNode) {
      currentPatch.push({ type: patch.TEXT, content: newNode })
    }
  // Nodes are the same, diff old node's props and children   //节点相同 查看属性和子节点
  } else if (
      oldNode.tagName === newNode.tagName &&
      oldNode.key === newNode.key
    ) {
    // Diff props
    var propsPatches = diffProps(oldNode, newNode)
    if (propsPatches) {
      currentPatch.push({ type: patch.PROPS, props: propsPatches })
    }
    // Diff children. If the node has a `ignore` property, do not diff children
    // 如果节点具有“.”属性，则不要diff 子节点
    if (!isIgnoreChildren(newNode)) {
      diffChildren(  //增加或者删除操作，利用 list-diff2
        oldNode.children,
        newNode.children,
        index,
        patches,
        currentPatch
      )
    }
  // Nodes are not the same, replace the old node with new node  节点不相同 用新节点替换旧的节点
  } else {
    currentPatch.push({ type: patch.REPLACE, node: newNode })
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
    //对比oldNode和newNode的不同 记录下来
  }
}
// 遍历子节点
function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren, 'key') //增加或者删除操作，利用 list-diff2
  newChildren = diffs.children

  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
    currentPatch.push(reorderPatch)
  }

  var leftNode = null
  var currentNodeIndex = index
  _.each(oldChildren, function (child, i) {
    var newChild = newChildren[i]
    currentNodeIndex = (leftNode && leftNode.count)  // 计算节点的标识
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1    
    dfsWalk(child, newChild, currentNodeIndex, patches) //深度遍历子节点
    leftNode = child
  })
}

//子节点属性
function diffProps (oldNode, newNode) {
  var count = 0
  var oldProps = oldNode.props
  var newProps = newNode.props

  var key, value
  var propsPatches = {}

  // Find out different properties
  for (key in oldProps) {
    value = oldProps[key]
    if (newProps[key] !== value) {
      count++
      propsPatches[key] = newProps[key]
    }
  }

  // Find out new property
  for (key in newProps) {
    value = newProps[key]
    if (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = newProps[key]
    }
  }

  // If properties all are identical
  if (count === 0) {
    return null
  }

  return propsPatches
}

// 节点
function isIgnoreChildren (node) {
  return (node.props && node.props.hasOwnProperty('ignore'))
}

module.exports = diff

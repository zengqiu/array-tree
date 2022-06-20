export function arrayToTree(array, options={}) {
    const { idKey, parentKey, childrenKey, excludeParent, excludeEmptyChildren } = Object.assign({
        idKey: 'id',
        parentKey: 'parent',
        childrenKey: 'children',
        excludeParent: true,
        excludeEmptyChildren: false,
    }, options)

    const arrayCopy = array.map(item => ({ ...item }))
    let tree = [], map = {}
    arrayCopy.forEach(function(obj) {
        map[obj[idKey]] = obj
        obj[childrenKey] = []
    });
    arrayCopy.forEach(function(obj) {
        if (obj[parentKey]) {
            map[obj[parentKey]][childrenKey].push(obj)
        } else {
            tree.push(obj)
        }
    })

    excludeEmptyChildren && Object.keys(map).forEach(key => {map[key][childrenKey].length === 0 && delete map[key][childrenKey]})
    excludeParent && Object.keys(map).forEach(key => {delete map[key][parentKey]})

    return tree
}

export function treeToArray(tree, options={}) {
    const { childrenKey, parentKey, excludeParent, excludeBranchNodes } = Object.assign({
        childrenKey: 'children',
        parentKey: 'parent',
        excludeParent: false,
        excludeBranchNodes: false,
    }, options)
    // excludeBranchNodes 排除分支节点（只获取叶子节点）
    return tree.reduce(function (previous, current) {
        if (Object.keys(current).includes(childrenKey)) {
            previous = previous.concat(treeToArray(current[childrenKey], childrenKey, excludeBranchNodes))
            if (!excludeBranchNodes) {
                const {[childrenKey]: children, ...rest} = current
                previous = previous.concat(rest)
            }
        } else {
            previous = previous.concat(current)
        }
        return previous
    }, [])
}
    // return tree.reduce((previous, current) => (Object.keys(current).includes(childrenKey)
    //         ? excludeBranchNodes
    //             ? previous.concat(treeToArray(current[childrenKey], childrenKey, excludeBranchNodes))
    //             : previous.concat(treeToArray(current[childrenKey], childrenKey, excludeBranchNodes),
    //                 delete current[childrenKey] && current)
    //         : previous.concat(current))
    //     , [])
// }



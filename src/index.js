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
    const { idKey, childrenKey, excludeChildren, parentKey, excludeParent, excludeBranchNodes } = Object.assign({
        idKey: 'id',
        childrenKey: 'children',
        excludeChildren: true,
        parentKey: 'parent',
        excludeParent: false,
        excludeBranchNodes: false,
    }, options)
    // excludeBranchNodes 排除分支节点（只获取叶子节点）
    const treeCopy = JSON.parse(JSON.stringify(tree))
    return treeCopy.reduce(function (previous, current) {
        if (current[childrenKey]) {
            current[childrenKey].forEach(child => {excludeParent ? delete child[parentKey] : child[parentKey] = current[idKey]})
            previous = previous.concat(treeToArray(current[childrenKey], { idKey, childrenKey, excludeChildren, parentKey, excludeParent, excludeBranchNodes }))
        }

        if (!excludeBranchNodes || (excludeBranchNodes && !current[childrenKey])) {
            excludeParent ? delete current[parentKey] : (!current[parentKey] ? current[parentKey] = null : undefined)
            if (excludeChildren) delete current[childrenKey]
            previous = previous.concat(current)
        }

        return previous
    }, [])
}

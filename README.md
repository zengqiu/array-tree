# Array Tree

> A library for converting array and tree mutually

## 数组转树型结构

```
arrayToTree(list, {
  idKey,
  parentKey
  // ...
})
```

### Options

| Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| idKey | The node's attribute to save node's unique identifier. | string | id |
| parentKey | The node's attribute to save its parent node's unique identifier. | string | parent |
| childrenKey | Specify which node attribute is used as the node's subtree. | string | children |
| excludeParent | Don't add parent to node. | boolean | true |
| excludeEmptyChildren | Remove node's empty children | boolean | false |

## 树形结构转数组

```
treeToArray(tree, {
  parentKey,
  childrenKey
  // ...
})
```

### Options

| Name | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| idKey | The node's attribute to save node's unique identifier. | string | id |
| childrenKey | The node's children attribute. | string  | children |
| excludeChildren | Remove node's children | boolean | true |
| parentKey | The attribute used for the node's parent. | string  | parent |
| excludeParent | Don't add parent to node. | boolean | false |
| excludeBranchNodes | Exclude branch nodes, leave only leaf nodes. | boolean  | false |

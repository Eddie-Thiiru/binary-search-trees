const Node = (value = null) => {
  let data = value;
  let left = null;
  let right = null;

  return { data, left, right };
};

const Tree = (arr) => {
  let n = arr.length;

  let root = buildTree(arr, 0, n - 1);

  return root;
};

const buildTree = (arr, start, end) => {
  if (start > end) {
    return null;
  }

  const mid = parseInt((start + end) / 2);

  let node = Node(arr[mid]);

  /* Recursively construct the left subtree and make it
     left child of root */
  node.left = buildTree(arr, start, mid - 1);

  /* Recursively construct the right subtree and make it
     right child of root */
  node.right = buildTree(arr, mid + 1, end);

  return node;
};

// Merge sort algorithm to obtain a sorted array
const mergeSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }

  const mid = arr.length / 2;

  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  // Recursively divide left array, and right array then merge
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  let mergedArr = [];

  // Sorts and merges both left and right arrays
  while (left.length > 0 && right.length > 0) {
    if (left[0] < right[0]) {
      mergedArr.push(left[0]);
      left.shift();
    } else if (left[0] > right[0]) {
      mergedArr.push(right[0]);
      right.shift();
    } else {
      mergedArr.push(left[0]);
      left.shift();
      right.shift();
    }
  }

  if (left.length === 0 && right.length !== 0) {
    mergedArr = mergedArr.concat(right);
  } else if (left.length !== 0 && right.length === 0) {
    mergedArr = mergedArr.concat(left);
  }

  return mergedArr;
};

const insert = (key) => {
  let rootNode = tree;

  insertKey(rootNode, key);
};

// A recursive function to insert a new key
const insertKey = (node, key) => {
  if (node === null) {
    node = Node(key);

    return node;
  }

  if (key < node.data) {
    node.left = insertKey(node.left, key);
  } else if (key > node.data) {
    node.right = insertKey(node.right, key);
  }

  return node;
};

const deleteKey = (key) => {
  let rootNode = tree;

  deleteValue(rootNode, key);
};

const deleteValue = (node, key) => {
  if (node === null) {
    return node;
  }

  if (key < node.data) {
    node.left = deleteValue(node.left, key);
  } else if (key > node.data) {
    node.right = deleteValue(node.right, key);
  } else {
    if (node.left === null && node.right === null) {
      return null;
    } else if (node.left !== null && node.right !== null) {
      let parent = node;
      let successor = node.right;

      while (successor.left !== null) {
        parent = successor;
        successor = successor.left;
      }

      /* Assign successor-left to parent-left. Otherwise, if there is 
         no successor-left, then assign successor-right to parent-right. */
      if (parent != node) {
        parent.left = successor.right;
      } else {
        parent.right = successor.right;
      }

      node.data = successor.data;
    } else if (node.left === null) {
      return node.left;
    } else if (node.right === null) {
      return node.right;
    }
  }

  return node;
};

// Returns the node with the given value.
const find = (value) => {
  let node = tree;

  while (node) {
    if (node.data === value) {
      return node;
    }

    if (value < node.data) {
      node = node.left;
    } else if (value > node.data) {
      node = node.right;
    }
  }
  return null;
};

const levelOrderData = (node) => {
  let value = node.data;
};

const levelOrder = (callback, node = tree) => {
  if (node === null) {
    return node;
  }

  let dataArr = [];
  let queueArr = [];

  // Inserts root node to queue
  queueArr.push(node);

  while (queueArr.length > 0) {
    let node = queueArr[0];

    /* If callback is defined, pass the node to callback as a parameter,
     else node data is added to an array */
    if (callback !== undefined) {
      callback(node);
    } else {
      dataArr.push(node.data);
    }

    if (node.left !== null) {
      queueArr.push(node.left);
    }

    if (node.right !== null) {
      queueArr.push(node.right);
    }

    queueArr.splice(0, 1);
  }

  // Returns array of values if callback function is not provided
  if (callback === undefined) {
    return dataArr;
  }
};

const preorder = (callback, node = tree) => {
  let dataArr = [];

  const getNodes = (node) => {
    if (node === null) {
      return node;
    } else {
      /* If callback is defined, pass the node to callback as a parameter,
     else node data is added to an array */
      if (callback !== undefined) {
        callback(node);
      } else {
        dataArr.push(node.data);
      }

      getNodes(node.left);
      getNodes(node.right);
    }
  };
  getNodes(node);

  // Returns array of values if callback function is not provided
  if (callback === undefined) {
    return dataArr;
  }
};

const inorder = (callback, node = tree) => {
  let dataArr = [];

  const getNodes = (node) => {
    if (node === null) {
      return node;
    } else {
      getNodes(node.left);

      /* If callback is defined, pass the node to callback as a parameter,
     else node data is added to an array */
      if (callback !== undefined) {
        callback(node);
      } else {
        dataArr.push(node.data);
      }

      getNodes(node.right);
    }
  };
  getNodes(node);

  // Returns array of values if callback function is not provided
  if (callback === undefined) {
    return dataArr;
  }
};

const postorder = (callback, node = tree) => {
  let dataArr = [];

  const getNodes = (node) => {
    if (node === null) {
      return node;
    } else {
      getNodes(node.left);
      getNodes(node.right);

      /* If callback is defined, pass the node to callback as a parameter,
     else node data is added to an array */
      if (callback !== undefined) {
        callback(node);
      } else {
        dataArr.push(node.data);
      }
    }
  };
  getNodes(node);

  // Returns array of values if callback function is not provided
  if (callback === undefined) {
    return dataArr;
  }
};

const height = () => {
  let nodeHeight = -1;

  const getNodeHeight = (n, node = tree) => {
    findHeight(node, n);

    return nodeHeight;
  };

  const findHeight = (node = tree, n) => {
    if (node === null) {
      return -1;
    }

    let leftHeight = findHeight(node.left, n);
    let rightHeight = findHeight(node.right, n);
    let answer = Math.max(leftHeight, rightHeight) + 1;

    if (node.data === n) {
      nodeHeight = answer;
    }

    return answer;
  };

  return { getNodeHeight, findHeight };
};

const depth = (n, node = tree, level = 0) => {
  if (node === null) {
    return null;
  }

  if (node.data === n) {
    return level;
  } else {
    if (n < node.data) {
      return depth(n, node.left, (level += 1));
    } else if (n > node.data) {
      return depth(n, node.right, (level += 1));
    }
  }
};

const isBalanced = (node = tree) => {
  if (node === null) {
    return true;
  }

  let leftHeight = height().findHeight(node.left);
  let rightHeight = height().findHeight(node.right);

  let heightDiff = Math.abs(leftHeight - rightHeight);

  return heightDiff < 2 ? true : false;
};

const rebalance = () => {
  let array = inorder();

  tree = Tree(array);
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const randomNumbers = (num) => {
  let array = [];

  for (let i = 0; i < num; i++) {
    let number = Math.floor(Math.random() * 100);
    array.push(number);
  }

  return array;
};

let randomArray = randomNumbers(10);
let sortArray = mergeSort(randomArray);
let tree = Tree(sortArray);

// Check if the tree is balanced
console.log("Balanced:", isBalanced());

// Print out elements in their respective traversal methods
console.log("Level order: ", levelOrder());
console.log("Preorder: ", preorder());
console.log("Postorder: ", postorder());
console.log("Inorder: ", inorder());

console.log("Tree unbalanced!");

// Unbalances tree
insert(999);
insert(120);

// Visualize binary search tree
prettyPrint(tree);

// Check if the tree is unbalanced
console.log("Balanced:", isBalanced());

// Balances the unbalanced tree
rebalance();

console.log("Tree rebalanced!");

// Visualize binary search tree
prettyPrint(tree);

// Check if the tree is balanced
console.log("Balanced:", isBalanced());

// Print out elements in their respective traversal methods
console.log("Level order: ", levelOrder());
console.log("Preorder: ", preorder());
console.log("Postorder: ", postorder());
console.log("Inorder: ", inorder());

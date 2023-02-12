/**
 *
 * @param arr 数组
 * @param pid 根节点的pid
 * @param pidKey 父节点id属性名
 * @returns tree
 */
const arr2Tree = (arr: any[], pid: any = null, pidKey = "parentId") => {
  return arr.reduce((prev, cur) => {
    if (cur[pidKey] === pid) {
      const children = arr2Tree(arr, cur.id, pidKey);
      if (children.length) {
        cur.children = children;
      }
      prev.push(cur);
    }
    return prev;
  }, []);
};

// const tree = arrToTree(arrs); // 需要定义arrs
// console.log(tree);
export { arr2Tree };

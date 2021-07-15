const typeObj = {
    0: [{}],
    1: [{}, { row: 1, col: 0 }],
    2: [{}, { row: 0, col: -1 }],
    3: [{}, { row: -1, col: 0 }, { row: 1, col: 0 }],
    4: [{}, { row: 0, col: -1 }, { row: 0, col: 1 }],
    5: [{}, { row: 0, col: -1 }, { row: -1, col: 0 }, { row: 1, col: 0 }],
    6: [{}, { row: -1, col: -1 }, { row: -1, col: 0 }, { row: 1, col: 0 }],
    7: [{}, { row: 0, col: -1 }, { row: 0, col: 1 }, { row: 1, col: 1 }],
    8: [{}, { row: -1, col: 0 }, { row: 1, col: 1 }, { row: 0, col: 1 }],
    9: [{}, { row: 1, col: 0 }, { row: 1, col: -1 }, { row: 0, col: 1 }],
    10: [{}, { row: -1, col: 0 }, { row: -1, col: -1 }, { row: 0, col: -1 }],
}
const groupNodeClass = (type: number, blockWidth: number = 50, bgBlock: cc.Prefab, groupNode: cc.Prefab, moveBox: cc.Node, index: number) => {
    let typeArr = typeObj[type];
    // creater
    let node = cc.instantiate(groupNode);
    node.parent = moveBox;
    node.width = blockWidth * 3;
    node.height = blockWidth * 3;
    node.scale = 0.7;
    let x = index*blockWidth*3-blockWidth*3;
    let y = -350;
    node.position = cc.v3(x, y);
    node.getComponent('groupNode').pos = {x:x, y:y};
    node.getComponent('groupNode').type = 1;
    node.getComponent('groupNode').typeArr = typeArr;
    let groupMid = node.getChildByName('groupMid');
    for (let i = 0; i < typeArr.length; i++) {
        let groupBlock = cc.instantiate(bgBlock);
        groupBlock.parent = groupMid;
        groupBlock.getChildByName("2").active = true;
        let obj = typeArr[i];
        if (i == 0) {
            groupBlock.position = cc.v3(0, 0);
        } else {
            groupBlock.position = cc.v3(groupBlock.width * obj.row, -groupBlock.width * obj.col);
        }

    }
    return node;
}
export default groupNodeClass;

const typeObj = {
    1:[{},{col:0,row:1}],
    2:[{},{col:0,row:1}]
}
const groupNodeClass = (type:number,blockWidth: number = 50,bgBlock: cc.Prefab,groupNode: cc.Prefab,moveBox: cc.Node) => {
    let typeArr = typeObj[type];
    // creater
    let node = cc.instantiate(groupNode);
    node.parent = moveBox;
    if(type == 1) {
        node.width = blockWidth * 2;
        node.height = blockWidth;
        node.position = cc.v3(0, -300);
        node.getComponent('groupNode').type = 1;
        node.getComponent('groupNode').typeArr = typeArr;
        for (let i = 0; i < typeArr.length; i++) {
            let groupBlock = cc.instantiate(bgBlock);
            groupBlock.parent = node;
            groupBlock.getChildByName("2").active = true;
            switch (i) {
                case 0:
                    groupBlock.position = cc.v3(0, 0);
                    break;
                case 1:
                    groupBlock.position = cc.v3(groupBlock.width, 0);
                    break;
            }
        }
        return node;
    }
}
export default groupNodeClass;

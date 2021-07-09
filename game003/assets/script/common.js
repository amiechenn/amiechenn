const common = {
    pi: 3.1415926535897,
    // 创造新的随机球 是否和附近相同，相同则改成不同的
    createBlockCheckIsSame: (num) => {
        switch (num) {
            case 1:
                return num + 1;
                break;
            case 2:
            case 3:
            case 4:
                return num - 1;
                break;
            default:
                return num - 1;
        }
    },
    //随机球1-4 
    randomNum: (canCtrlBlcokLevel) => {
        // 1-3 都是3次概率
        let num = Math.ceil(Math.random() * ((canCtrlBlcokLevel - 3) * 2 + 9));
        // 未完善，先写死最多4
        if (1 <= num && num <= 3) {
            return 1;
        }
        if (4 <= num && num <= 6) {
            return 2;
        }
        if (7 <= num && num <= 9) {
            return 3;
        }
        if (10 <= num && num <= 11) {
            return 4;
        }
        return 1
    },

    // 获取球的占位角度数
    getBlcokArc: (blockRadius) => { //blockRadius:球半径
        let arc = Math.asin(blockRadius / 2 / window.circleRadius) * 2;
        return arc * 2;
    },

    // 获取点击的角度(xy坐标转角坐标)
    getArcAndRadius: (x, y) => {
        let pos = {};
        pos.r = Math.sqrt(x * x + y * y);
        pos.arc = Math.atan(y / x);
        // II +180
        if (y > 0 && x < 0) {
            pos.arc = pos.arc + common.pi;
        }
        // III +180
        else if (y < 0 && x < 0) {
            pos.arc = pos.arc + common.pi;

        }
        // VI +360
        else if (y < 0 && x >= 0) {
            pos.arc = pos.arc + 2 * common.pi;
        }
        return pos;
    },
    
    // 获取点击后对应圆圈上的点（角坐标转xy坐标）
    getPosition: (arc, radius) => {
        let newPos = {};
        newPos.x = radius * Math.cos(arc);
        newPos.y = radius * Math.sin(arc);
        return newPos
    },

    // 转成角坐标存在的值
    changeArc:(arc) => {
        let pi2 = common.pi * 2;
        if (arc < 0) arc = pi2 + arc;
        if (arc > pi2) arc = arc - pi2;
        return arc;
    },

    //从小到大排序
    sortMinToMax:(arr) => {
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                var item = arr[i];
                item.arc = common.getArcAndRadius(item.x, item.y).arc;
                item.selfArcHarf = common.getBlcokArc(item.width / 2) / 2; // 固定球占位角度数的一半
            }
            arr = arr.sort((a, b) => a.arc - b.arc);
        }
        // // test
        // for (let j = 0; j < arr.length; j++) {
        //     let node1 = arr[j];
        //     let node2 = null;
        //     if(j == arr.length-1){
        //         node2 = arr[0];
        //     }else{
        //         node2 = arr[j+1];
        //     }
        //     if(common.checkBlackIsOverlap(node1,node2)){
        //         console.log('重叠重叠重叠重叠重叠重叠',j)
        //     }
        //     if(!common.checkBlockBySide(node1,node2)){
        //         console.log('有空隙',j)
        //     }
        // }

        return arr
    },

    // 角度差值
    getDelta:(node1, node2) => {
        let delta = node1.arc - node2.arc;
        if (Math.abs(delta) > common.pi) {
            if (node2.arc > common.pi) {
                delta = (common.pi * 2 - node2.arc) + node1.arc;
            } else {
                delta = (common.pi * 2 - node1.arc) + node2.arc;
            }
        }
        return Math.abs(delta)
    },

    // 检测两个是否重叠（碰撞预测）
    checkBlackIsOverlap: (node1, node2) => {
        let delta = common.getDelta(node1, node2);
        if (delta.toFixed(6) < (node1.selfArcHarf + node2.selfArcHarf).toFixed(6)) { // 角度差 小于两个球各一半的占位角度,则碰撞
            return true;
        }
        return false;
    },

    // 检测两个是否嵌套
    checkBlackIsInside:(nodeA, nodeB) => {
        // 有重叠才会有嵌套，跨越3个现象的会计算出错，先判断是否重叠
        let isOverlap = common.checkBlackIsOverlap(nodeA, nodeB);
        if (!isOverlap) return false;
        let pi2 = common.pi * 2; //360度
        let pi90 = common.pi / 2; // 90度
        // 获取两个球与环上切点的角度
        let a1 = nodeA.arc + nodeA.selfArcHarf;
        let a2 = nodeA.arc - nodeA.selfArcHarf;
        let b1 = nodeB.arc + nodeB.selfArcHarf;
        let b2 = nodeB.arc - nodeB.selfArcHarf;
        // 如果是负数或者大于360度的，则转为360度内的数值
        if (a1 > pi2) a1 = a1 - pi2;
        if (a1 < 0) a1 = pi2 + a1;
        if (a2 > pi2) a2 = a2 - pi2;
        if (a2 < 0) a2 = pi2 + a2;
        if (b1 > pi2) b1 = b1 - pi2;
        if (b1 < 0) b1 = pi2 - b1;
        if (b2 > pi2) b2 = b2 - pi2;
        if (b2 < 0) b2 = pi2 + b2;
        // 球跨越第一和第四象限的时候
        if (a1 < pi90 && a2 > (pi2 - pi90)) {
            //在第四象限的点都变成负数
            a2 = a2 - pi2;
            if (b1 > (pi2 - pi90)) b1 = b1 - pi2;
            if (b2 > (pi2 - pi90)) b2 = b2 - pi2;
        }
        // 球跨越第一和第四象限的时候
        if (b1 < pi90 && b2 > (pi2 - pi90)) {
            //在第四象限的点都变成负数
            b2 = b2 - pi2;
            if (a1 > (pi2 - pi90)) a1 = a1 - pi2;
            if (a2 > (pi2 - pi90)) a2 = a2 - pi2;
        }
        if (nodeA.width > nodeB.width) {
            if (a1 >= b1 && a2 <= b2) {
                return true;
            } else {
                return false;
            }
        } else {
            if (b1 >= a1 && b2 <= a2) {
                return true;
            } else {
                return false;
            }
        }
    },

    //检测两个球是否挨着
    checkBlockBySide:(node1, node2) => {
        let delta = common.getDelta(node1, node2);
        // 0.0348 两度，为了避免误差
        if (delta.toFixed(6) > ((node1.selfArcHarf + node2.selfArcHarf+0.0348).toFixed(6))) { // 角度差 大于两球各一半的占位角度,则不挨
            return false;
        }
        return true;
    },

    // 获取两个球之间重叠的角度
    getOverlapArc:(nodeLfet, nodeRight) => {
        let pi2 = common.pi * 2; //360度
        let pi90 = common.pi / 2; // 90度
        let b1 = common.changeArc(nodeRight.selfArcHarf + nodeRight.arc);
        let a2 = common.changeArc(nodeLfet.arc - nodeLfet.selfArcHarf);
        // nodeRight 在第一和nodeLfet在第四象限的时候
        if (b1 < pi90 && a2 > (pi2 - pi90)) {
            //在第四象限的点都变成负数
            a2 = a2 - pi2;
        }
        // nodeLfet 在第一和nodeRight在第四象限的时候
        if (a2 < pi90 && b1 > (pi2 - pi90)) {
            //在第四象限的点都变成负数
            b1 = b1 - pi2;
        }
        let num = b1 - a2;
        return num; // 两个球之间重叠部分的占位角度
    },

    // 判断球在ctrlBlock的右边还是左边，也可以用作判断其他球之间，返回结果是第一个参数球在第二个参数球的左（右）边
    isBlockLfetOrRight:(node, ctrlBlock) => {
        if (ctrlBlock === undefined || node === undefined) {
            return '';
        }
        let ctrlBlockArc = ctrlBlock.arc;
        let oppositeArc = ctrlBlockArc > common.pi ? ctrlBlockArc - common.pi : ctrlBlockArc + common.pi; // 发射球的对角位置度数
        if (ctrlBlockArc <= common.pi) { //发射球所在角度小于180度
            if (node.arc > ctrlBlockArc && node.arc < oppositeArc) {
                return 'left';
            } else {
                return 'right';
            }
        } else {
            if (node.arc < ctrlBlockArc && node.arc > oppositeArc) {
                return 'right';
            } else {
                return 'left';
            }
        }
    },

    //重新排序，以发射球左边为第一个,从左到右排序
    // IndexLeft发射球左边第一个球的index
    reSort:(IndexLeft,blockArr) => {
        let aArr = [],
            bArr = [];
        aArr = blockArr.slice(IndexLeft, blockArr.length);
        bArr = blockArr.slice(0, IndexLeft);
        return aArr.concat(bArr);
    },

    //从右到左排序
    // arr :是从小到大排序的
    sortRightToLeft:(blockArr) =>{
        // 只有两个球的时候判断顺序
        if (blockArr.length == 2) {
            if (common.isBlockLfetOrRight(blockArr[0], blockArr[1]) == 'left') {
                return blockArr.reverse();
            }
        }
        for (let i = 0; i < blockArr.length; i++) {
            let node = blockArr[i];
            let preNode = blockArr[i - 1];
            if (node.x == 0 && node.y == 0) continue;
            let isBySide = null; // 和左边球是否挨着
            if (i != 0) {
                isBySide = common.checkBlockBySide(node, preNode);
                if (!isBySide) {
                    let a = blockArr.slice(0, i);
                    let b = blockArr.slice(i, blockArr.length);
                    return b.concat(a);
                }
            }
        }
        return blockArr;
    },
    

}

module.exports = common;
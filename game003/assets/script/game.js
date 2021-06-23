cc.Class({
    extends: cc.Component,

    properties: {
        blockBox: cc.Node, // 环形上的球的集合
        ctrlBlockArea: cc.Node, // 发射球和待发射球的集合
        // blockAtlas: cc.SpriteAtlas,
        block1: cc.SpriteFrame,
        block2: cc.SpriteFrame,
        block3: cc.SpriteFrame,
        block4: cc.SpriteFrame,
        block5: cc.SpriteFrame,
        block6: cc.SpriteFrame,
        block7: cc.SpriteFrame,
        block8: cc.SpriteFrame,
        motionPrefal: cc.Prefab,
        boomPrefal: cc.Prefab,
        scoreLabel: cc.Label,
        gameOver: cc.Node,
        gameOverScore: cc.Label,
    },
    test() {
        let arr = [

        ]
        this.testB = { x: 240.4539643366011, y: -35.084056704043725, level: 4 }
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            let num = item.level;
            aa = new cc.Node('Sprite');
            let sp = aa.addComponent(cc.Sprite);
            sp.sizeMode = 'CUSTOM';
            sp.spriteFrame = this[`block${num}`];
            aa.parent = this.blockBox;
            aa.setPosition(cc.v2(item.x, item.y));
            let r = this.blockSize + ((num - 1) * this.blockSizeAdd);
            aa.setContentSize(cc.size(r, r));
            aa.selfArcHarf = item.selfArcHarf;
            aa.arc = item.arc;
            aa.level = num;
            // if (i == 0) {
            //     aa.zIndex = 999;

            // }
        }
        // this.createBlock(true, this.testB.level)
        this.arrToSort()

    },
    testClick() {
        this.ctrlBlcokGo(this.testB);
    },

    init() {
        this.gameOver.active = false;
        this.ctrlBlockArea.destroyAllChildren();
        this.blockBox.destroyAllChildren();
        this.scoreLabel.string = 0;
        this.colorArr = ['',
            new cc.Color(0, 133, 255, 255),
            new cc.Color(255, 0, 20, 255),
            new cc.Color(143, 13, 216, 255),
            new cc.Color(255, 245, 0, 255),
            new cc.Color(246, 126, 7, 255),
            new cc.Color(246, 7, 88, 255),
            new cc.Color(0, 255, 5, 255),
        ];
        this.blockSize = 40; //最小球值
        this.blockSizeAdd = 20; //levelup +20
        this.maxLevel = 7; //最大的值，西瓜的值
        this.canCtrlBlcokLevel = 4; // 可以发射的球的最大等级
        this.pi = 3.1415926; //Π
        this.circleRadius = 243; //环的半径
        this.speedMillisecond = 200; // 发射时间毫秒 speedMillisecond  与 speedSecond 相互对应一直
        this.speedSecond = 0.2; // 发射时间秒
        this.speedMove = 0.2; // 球在环上移动时间秒
        this.speedScaleTo = 0.5; // 发射球出现动画时间秒
        this.ctrlBlock = null; // 发射球
        this.clickFlag = false; // 控制是否可发射，执行完一个球，createBlock成功后才可发射
        this.blockArr = []; // 所有球
        this.maxNumInCircle = parseInt(6.28 / this.getBlcokArc((this.blockSize + ((this.maxLevel - 1) * this.blockSizeAdd) / 2)));
        this.isGameOver = false; // 是否游戏结束
        this.randomBlock = {
            num: 0,
            dir: true
        };
        // this.test(); //debug
        // this.testNum = 0; //debug
        // this.testarr = [2, 7, 4, 7, 3, 2, 5, ]; //debug

        //第一个球
        this.createBlock(true, 1);
        this.setTouch();
    },

    //随机球1-4 
    randomNum(canCtrlBlcokLevel) {
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

    //移除球射出的拖尾效果
    romoveMotion() {
        this.ctrlBlock.getChildByName('motion') ? this.ctrlBlock.getChildByName('motion').destroy() : null;
    },

    // 发射成功并且所有流程走完后，ctrlBlock 即可转成 blockbox里面的球
    changeCtrlBlock() {
        // 复制ctrlBlock
        // let block = cc.instantiate(this.ctrlBlock);
        if (this.ctrlBlock.level <= this.maxLevel) {
            let block = new cc.Node('Sprite');
            let sp = block.addComponent(cc.Sprite);
            sp.sizeMode = 'CUSTOM';
            sp.spriteFrame = this.ctrlBlock.getChildByName('ctrlBlock').getComponent(cc.Sprite).spriteFrame;
            block.parent = this.blockBox;
            block.setPosition(cc.v2(this.ctrlBlock.x, this.ctrlBlock.y));
            block.setContentSize(cc.size(this.ctrlBlock.width, this.ctrlBlock.height));
            block.level = this.ctrlBlock.level;
        }
        // 移除ctrlBlock
        this.ctrlBlock.destroy();
        // 换成新的ctrlBlock
        this.ctrlBlock = this.waitBlcok;
        this.arrToSort() //环上的球重新获取并排序
    },

    // 创造新的随机球的发射球
    createBlock(isFirst, level) {
        let num = level ? level : this.randomNum(this.canCtrlBlcokLevel);
        // this.waitBlcok = cc.instantiate(this.blockPrefal);
        this.waitBlcok = new cc.Node('Node');
        this.waitBlcok.parent = this.ctrlBlockArea;
        let Sprite = new cc.Node('Sprite');
        Sprite.parent = this.waitBlcok;
        Sprite.name = 'ctrlBlock';
        let sp = Sprite.addComponent(cc.Sprite);
        sp.sizeMode = 'CUSTOM';
        sp.spriteFrame = this[`block${num}`];
        this.waitBlcok.setPosition(cc.v2(0, 0));
        this.waitBlcok.setScale(cc.v2(0, 0));
        let r = this.blockSize + ((num - 1) * this.blockSizeAdd);
        this.waitBlcok.setContentSize(cc.size(r, r));
        Sprite.setContentSize(cc.size(r, r));
        this.waitBlcok.selfArcHarf = this.getBlcokArc(r / 2) / 2; // 固定球占位角度数的一半
        this.waitBlcok.level = num;
        // 爆炸效果
        let boom = cc.instantiate(this.boomPrefal);
        boom.parent = this.waitBlcok;
        boom.color = this.colorArr[num];

        console.log('waitBlcok', this.waitBlcok)
        let scaleTo = cc.scaleTo(this.speedScaleTo, 1, 1);
        let seq = cc.sequence(
            scaleTo,
            cc.callFunc(() => {
                // 拖尾效果 先设置拖尾效果导致缩放时会出新一条线，放这里就不会
                let MotionStreak = cc.instantiate(this.motionPrefal);
                MotionStreak.zIndex = -1;
                let Motion = MotionStreak.getComponent(cc.MotionStreak);
                Motion.fadeTime = 0.1;
                Motion.stroke = r;
                Motion.color = this.colorArr[num];
                MotionStreak.parent = this.waitBlcok;

                if (isFirst) {
                    this.ctrlBlock = this.waitBlcok;
                    this.clickFlag = true;
                }
            })
        );
        this.waitBlcok.runAction(seq);
    },

    // 创造新的随机球 是否和附件相同，相同则改成不同的
    createBlockCheckIsSame(num) {
        switch (num) {
            case 1:
                return num + 1;
                break;
            case 2:
                return num - 1;
                break;
            default:
                return num - 1;
        }
    },

    // 创造新的随机球 在圆环上
    // arr :从右到左排序
    createBlockByCircle(arr) {
        let num = this.randomNum(3);
        let lastNode = null;
        if (this.randomBlock.dir) { //left
            if (num == arr[0].level) {
                num = this.createBlockCheckIsSame(num);
            }
        } else {
            if (num == arr[arr.length - 1].level) {
                num = this.createBlockCheckIsSame(num);
            }
        }
        let node = new cc.Node('Node');
        let Sprite = new cc.Node('Sprite');
        Sprite.parent = node;
        let sp = Sprite.addComponent(cc.Sprite);
        sp.sizeMode = 'CUSTOM';
        sp.spriteFrame = this[`block${num}`];
        node.setScale(cc.v2(0, 0));
        let r = this.blockSize + ((num - 1) * this.blockSizeAdd);
        node.setContentSize(cc.size(r, r));
        Sprite.setContentSize(cc.size(r, r));
        node.selfArcHarf = this.getBlcokArc(r / 2) / 2; // 固定球占位角度数的一半
        node.level = num;
        let pos = {},
            arc = null;
        if (this.randomBlock.dir) { //left
            arc = arr[0].arc - arr[0].selfArcHarf - node.selfArcHarf;
            lastNode = arr[arr.length - 1];
        } else { //right
            let index = arr.length - 1;
            arc = arr[index].arc + arr[index].selfArcHarf + node.selfArcHarf;
            lastNode = arr[0];
        }
        node.arc = arc;
        pos = this.getPosition(arc, this.circleRadius);
        node.setPosition(cc.v2(pos.x, pos.y));
        // 判断随机增加的球是否和另一侧最后一个球重叠，重叠则结束游戏
        this.isGameOver = arr.length > this.maxNumInCircle ? this.checkBlackIsOverlap(lastNode, node) : false;
        node.parent = this.blockBox;
        let scaleTo = cc.scaleTo(0.2, 1, 1);
        let seq = cc.sequence(
            scaleTo,
            cc.callFunc(() => {
                if (this.isGameOver) {
                    arr.push(node);
                    this.gameOverAction(lastNode, node, arr, []);
                    return;
                }
            })
        );
        node.runAction(seq);

    },

    setTouch() {
        this.node.on('touchend', function(event) {
            if (!this.clickFlag) return;
            let pos = event.getLocation();
            pos = this.node.convertToNodeSpaceAR(pos);
            this.ctrlBlcokGo(pos);
            // this.testNum++
            // this.createBlock(false, this.testarr[this.testNum]); //test
            this.randomBlock.num = this.randomBlock.num + 1;
            this.createBlock(false); // 射出发后马上生成下一个球
        }, this)
    },
    // 点击发射球 获取发射到的位置
    ctrlBlcokGo(pos) {
        this.clickFlag = false;
        let aPos = this.getArcAndRadius(pos.x, pos.y); //获取发射角度
        let bPos = this.getPosition(aPos.arc, this.circleRadius); //获取发射到环上的xy位置
        this.actionBy = cc.moveTo(this.speedSecond, cc.v2(bPos.x, bPos.y)); //移动到xy位置的运动
        this.ctrlBlock.arc = aPos.arc;
        console.log('发射求的位置xy', { x: bPos.x, y: bPos.y, level: this.ctrlBlock.level })
        this.checkBlack();
    },

    // 获取球的占位角度数
    getBlcokArc(blockRadius) { //blockRadius:球半径
        let arc = Math.asin(blockRadius / 2 / this.circleRadius) * 2;
        return arc * 2;
    },

    // 获取点击的角度(xy坐标转角坐标)
    getArcAndRadius(x, y) {
        let pos = {};
        pos.r = Math.sqrt(x * x + y * y);
        pos.arc = Math.atan(y / x);
        // II +180
        if (y > 0 && x < 0) {
            pos.arc = pos.arc + this.pi;
        }
        // III +180
        else if (y < 0 && x < 0) {
            pos.arc = pos.arc + this.pi;

        }
        // VI +360
        else if (y < 0 && x > 0) {
            pos.arc = pos.arc + 2 * this.pi;
        }
        return pos;
    },

    // 获取点击后对应圆圈上的点（角坐标转xy坐标）
    getPosition(arc, radius) {
        let newPos = {};
        newPos.x = radius * Math.cos(arc);
        newPos.y = radius * Math.sin(arc);
        return newPos
    },

    //从小到大排序
    sortMinToMax(arr) {
        if (arr.length > 0) {
            for (let i = 0; i < arr.length; i++) {
                var item = arr[i];
                item.arc = this.getArcAndRadius(item.x, item.y).arc;
                item.selfArcHarf = this.getBlcokArc(item.width / 2) / 2; // 固定球占位角度数的一半
            }
            arr = arr.sort((a, b) => a.arc - b.arc);
        }
        return arr
    },
    //从右到左排序
    // arr :是从小到大排序的
    sortRightToLeft(blockArr) {
        for (let i = 0; i < blockArr.length; i++) {
            let node = blockArr[i];
            let preNode = blockArr[i - 1];
            if (node.x == 0 && node.y == 0) continue;
            let isBySide = null; // 和左边球是否挨着
            if (i != 0) {
                isBySide = this.checkBlockBySide(node, preNode);
                if (!isBySide) {
                    let a = blockArr.slice(0, i);
                    let b = blockArr.slice(i, blockArr.length);
                    return b.concat(a);
                }
            }
        }
        return blockArr;
    },

    // 获取每个球所在角度+从小到大排序
    arrToSort() {
        if (this.randomBlock.num == 3) {
            let arr = this.blockBox.children;
            arr = this.sortMinToMax(arr);
            arr = this.sortRightToLeft(arr);
            this.createBlockByCircle(arr);
            this.randomBlock.num = 0;
            this.randomBlock.dir = !this.randomBlock.dir;
        }
        // 
        if (!this.isGameOver) {
            let arr = this.blockBox.children;
            this.blockArr = this.sortMinToMax(arr);
            this.clickFlag = true; // 排序后才可以点击发射
        }
    },

    // 检测是否碰撞
    checkBlack() {
        let moveArcLeft = 0, //左边球需要移动的角度
            moveArcRight = 0, //右边球需要移动的角度
            overlapIndexLeft = null, //发射球的左边第一个球在序列中的index
            overlapIndexRight = null; //发射球的右边第一个球在序列中的index
        //第一个球，不需要做任何处理
        if (this.blockArr.length == 0) {
            let seq = cc.sequence(
                this.actionBy,
                cc.callFunc(() => {
                    this.romoveMotion();
                    this.changeCtrlBlock();
                })
            );
            this.ctrlBlock.runAction(seq);
            return
        }
        // 检测发射球是否嵌套在大球内
        for (let i = 0; i < this.blockArr.length; i++) {
            let node = this.blockArr[i];
            if (node.x == 0 && node.y == 0) continue;
            let isInside = this.checkBlackIsInside(node, this.ctrlBlock); //是否嵌套
            let newArc = this.ctrlBlock.selfArcHarf + node.selfArcHarf;
            if (isInside) {
                if (this.isBlockLfetOrRight(node, this.ctrlBlock) == 'left') { //判断在发射球左（右）边
                    newArc = node.arc - newArc;
                    moveArcLeft = null;
                    moveArcRight = this.ctrlBlock.selfArcHarf * 2;
                    overlapIndexLeft = i;
                } else {
                    newArc = node.arc + newArc;
                    moveArcLeft = this.ctrlBlock.selfArcHarf * 2;
                    moveArcRight = null;
                    overlapIndexLeft = (i == (this.blockArr.length - 1)) ? 0 : i + 1;
                }
                this.ctrlBlock.arc = newArc;
                let pos = this.getPosition(newArc, this.circleRadius);
                this.actionBy = cc.moveTo(this.speedSecond, cc.v2(pos.x, pos.y));
                // 把发射球改变发射到的位置，改成嵌套求的左（右）边
                let seq = cc.sequence(
                    this.actionBy,
                    cc.callFunc(() => {
                        this.romoveMotion();
                    })
                );
                this.ctrlBlock.runAction(seq);
                this.moveAllBlcok(moveArcLeft, moveArcRight, overlapIndexLeft, overlapIndexRight);
                return
            }
        }
        // 判断是否有重叠
        for (let i = 0; i < this.blockArr.length; i++) {
            let node = this.blockArr[i];
            if (node.x == 0 && node.y == 0) continue;
            let isOverlap = this.checkBlackIsOverlap(node, this.ctrlBlock);
            if (isOverlap) {
                if (this.isBlockLfetOrRight(node, this.ctrlBlock) == 'left') {
                    // 在发射球的左侧
                    moveArcLeft = this.getOverlapArc(node, this.ctrlBlock);
                    overlapIndexLeft = i;
                } else {
                    // 在发射球的右侧
                    moveArcRight = this.getOverlapArc(this.ctrlBlock, node);
                    overlapIndexRight = i;
                }
            }
        }
        if (moveArcLeft || moveArcRight) { //有碰撞
            let seq = cc.sequence(
                this.actionBy,
                cc.callFunc(() => {
                    this.romoveMotion();
                })
            );
            this.ctrlBlock.runAction(seq);
            this.moveAllBlcok(moveArcLeft, moveArcRight, overlapIndexLeft, overlapIndexRight);
        } else { // 没碰撞，则需要移动到最近的球傍边
            this.moveToNearestBlock();
        }
    },

    // 检测两个是否嵌套(ctrlBlock是否嵌套在node内)
    checkBlackIsInside(nodeA, nodeB) {
        // 有重叠才会有嵌套，跨越3个现象的会计算出错，先判断是否重叠
        let isOverlap = this.checkBlackIsOverlap(nodeA, nodeB);
        if (!isOverlap) return false;
        let pi2 = this.pi * 2; //360度
        let pi90 = this.pi / 2; // 90度
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

    // 检测两个是否重叠（碰撞预测）
    checkBlackIsOverlap(node1, node2) {
        let delta = this.getDelta(node1, node2);
        if (delta.toFixed(6) < (node1.selfArcHarf + node2.selfArcHarf).toFixed(6)) { // 角度差 小于两个球各一半的占位角度,则碰撞
            return true;
        }
        return false;
    },

    //检测两个球是否挨着
    checkBlockBySide(node1, node2) {
        let delta = this.getDelta(node1, node2);
        // console.log('delta3', Math.abs(delta).toFixed(6), (node1.selfArcHarf + node2.selfArcHarf).toFixed(6))
        // console.log('delta4', delta, node1.selfArcHarf + node2.selfArcHarf)
        // console.log('+0.082327', node1.selfArcHarf + node2.selfArcHarf + 0.082327)
        // 不知道那里导致球与球之间右细微的距离，所有加上0.00001
        if (delta.toFixed(6) > ((node1.selfArcHarf + node2.selfArcHarf + 0.00001).toFixed(6))) { // 角度差 大于两球各一半的占位角度,则不挨
            return false;
        }
        return true;
    },

    // 获取两个球之间重叠的角度
    getOverlapArc(nodeLfet, nodeRight) {
        let b1 = nodeRight.selfArcHarf + nodeRight.arc;
        let a2 = nodeLfet.arc - nodeLfet.selfArcHarf;
        return b1 - a2; // 两个球之间重叠部分的占位角度
    },

    //重新排序，以发射球左边为第一个,从左到右排序
    // IndexLeft发射球左边第一个球的index
    reSort(IndexLeft) {
        let aArr = [],
            bArr = [];
        aArr = this.blockArr.slice(IndexLeft, this.blockArr.length);
        bArr = this.blockArr.slice(0, IndexLeft);
        return aArr.concat(bArr);
    },

    // 拆分成两个数组，左右两边各一个
    splitBlockArr(blockArr) {
        for (let i = 0; i < blockArr.length; i++) {
            let node = blockArr[i];
            let preNode = blockArr[i - 1];
            if (node.x == 0 && node.y == 0) continue;
            let isBySide = null; // 和左边球是否挨着
            let isBlockLfetOrRight = null;
            if (i == 0) {
                // 第一个球和发射球对比是否挨着
                isBySide = this.checkBlockBySide(this.ctrlBlock, node);
                isBlockLfetOrRight = this.isBlockLfetOrRight(node, this.ctrlBlock);
                if (blockArr.length > 1 && (this.ctrlBlock.arc - this.ctrlBlock.selfArcHarf) < node.arc) {
                    // 如果发射球因发射在比自身大的球的内部偏左，发射球则自己向左移动到大球左边，
                    // 则发射球左边第一个球如果半径小于发射球，则isBlockLfetOrRight返回right，但其实该球是在发射球的left
                    isBlockLfetOrRight = 'left';
                }
            } else {
                isBySide = this.checkBlockBySide(preNode, node);
                isBlockLfetOrRight = this.isBlockLfetOrRight(node, preNode);
            }
            // 如果没挨着|| 挨着但是在球的右边（当只有两个球的时候会出现这情况） || 没有左边球（暂时没有这情况）
            // 则断开，分成左右两边的数组
            if (!isBySide || isBlockLfetOrRight == 'right' || isBlockLfetOrRight == '') {
                let obj = {
                    leftArr: blockArr.slice(0, i),
                    rightArr: blockArr.slice(i, blockArr.length).reverse(),
                }
                return obj;
            }
        }
        // 从头到尾没有断开的话，就是都在左侧
        let obj = {
            leftArr: blockArr.slice(0, blockArr.length),
            rightArr: [],
        }
        return obj;

    },

    // 有碰撞,球向两边移开
    // moveArcLeft：左边球需要移动的角度
    // moveArcRight：右边球需要移动的角度
    // overlapIndexLeft：发射球的左边第一个球在序列中的index
    // overlapIndexRight：发射球的右边第一个球在序列中的index
    moveAllBlcok(moveArcLeft, moveArcRight, overlapIndexLeft, overlapIndexRight) {
        let blockArr = []; //重新排序，以overlapIndexLeft为第一个
        if (overlapIndexLeft == null) {
            overlapIndexLeft = overlapIndexRight + 1;
        }
        blockArr = this.reSort(overlapIndexLeft);

        // test测试打印
        let testArr = [];
        for (let i = 0; i < blockArr.length; i++) {
            let item = blockArr[i]
            testArr[i] = { 'x': item.x, 'y': item.y, 'level': item.level, 'acr': item.arc, 'selfArcHarf': item.selfArcHarf };
        }
        console.log('copyArray', testArr)

        let obj = { leftArr: [], rightArr: [] }; // 拆分成两边，leftArr为发射球左边，rightArr发射球右边
        // if (blockArr.length == 1) {
        //     //  只有一个的时候，只要判断往左还是右移动即可
        //     if (moveArcLeft) {
        //         obj = {
        //             leftArr: blockArr,
        //             rightArr: [],
        //         }
        //     }
        //     if (moveArcRight) {
        //         obj = {
        //             leftArr: [],
        //             rightArr: blockArr,
        //         }
        //     }
        // } else {
        obj = this.splitBlockArr(blockArr);
        // }
        // 判断是否游戏结束
        this.isGameOver = blockArr.length > this.maxNumInCircle ? this.checkIsGameOver(obj.leftArr, obj.rightArr, moveArcLeft, moveArcRight) : false;
        // 还有问题，需要做好左右移动完后，才执行moveAllOverCallFun
        // 左边往左移动
        this.moveAllBlcokToLeftOrRight('left', moveArcLeft, obj.leftArr, () => {
                if (obj.rightArr.length == 0) {
                    if (this.isGameOver) {
                        return
                    }
                    this.moveAllOverCallFun(obj.leftArr, obj.rightArr);
                }
            })
            // 右边边往右移动
        this.moveAllBlcokToLeftOrRight('right', moveArcRight, obj.rightArr, () => {
            if (this.isGameOver) {
                return
            }
            this.moveAllOverCallFun(obj.leftArr, obj.rightArr);
        })
    },

    // 往（左）右移动
    // direction: 移动方向
    // moveArc: 移动的角度
    moveAllBlcokToLeftOrRight(direction, moveArc, arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            let node = arr[i];
            let arc = direction == 'left' ? node.arc + moveArc : node.arc - moveArc;
            node.arc = arc;
            let newPos = this.getPosition(arc, this.circleRadius);
            let moveTo = cc.moveTo(this.speedMove, cc.v2(newPos.x, newPos.y));
            if (i == arr.length - 1) {
                let seq = cc.sequence(
                    moveTo,
                    cc.callFunc(() => {
                        // 最后一个移动完执行callback
                        callback && callback();
                    })
                );
                node.runAction(seq);
            } else {
                let seq = cc.sequence(
                    moveTo,
                    cc.callFunc(() => {})
                );
                node.runAction(seq);
            }
        }
    },

    //碰撞移动完成后检测是否同level
    // leftArr：发射球左边数组
    // rightArr：发射球右边数组
    moveAllOverCallFun(leftArr, rightArr) {
        let leftFlag = leftArr.length > 0 ? this.checkLevel(leftArr[0]) : false; //左边相同
        let rightFlag = rightArr.length > 0 ? this.checkLevel(rightArr[0]) : false; //右边相同
        // 左右没有相同等级，结束本轮
        if (!leftFlag && !rightFlag) {
            setTimeout(() => {
                this.changeCtrlBlock();
            }, this.speedMillisecond)
            return
        }
        // 如果两边球都相同
        if (leftFlag && rightFlag) {
            leftArr[0].destroy();
            leftArr.splice(0, 1);
            rightArr[0].destroy();
            rightArr.splice(0, 1);
            this.ctrlBlockLevelUp('mid', () => {
                // 还有问题，需要做好左右移动完后，才执行moveAllOverCallFun
                if (leftArr.length > 0) {
                    let moveArc = this.getOverlapArc(leftArr[0], this.ctrlBlock);
                    this.moveAllBlcokToLeftOrRight('left', moveArc, leftArr, () => {
                        if (rightArr.length == 0) {
                            this.moveAllOverCallFun(leftArr, rightArr);
                        }
                    })
                }
                if (rightArr.length > 0) {
                    let moveArc = this.getOverlapArc(this.ctrlBlock, rightArr[0]);
                    this.moveAllBlcokToLeftOrRight('right', moveArc, rightArr, () => {
                        this.moveAllOverCallFun(leftArr, rightArr);
                    })
                }
                // 合并球后，数组为空的情况
                if (leftArr.length == 0 && rightArr.length == 0) {
                    this.moveAllOverCallFun(leftArr, rightArr);
                }
            });

            return
        }
        // 左边球相同
        if (leftFlag) {
            leftArr[0].destroy();
            leftArr.splice(0, 1);
            this.ctrlBlockLevelUp('right', () => {
                // leftArr右移动靠拢
                if (leftArr.length > 0) {
                    let moveArc = 0;
                    if (leftArr[0].arc > this.ctrlBlock.arc) {
                        // 在同一侧
                        moveArc = leftArr[0].arc - this.ctrlBlock.arc - leftArr[0].selfArcHarf - this.ctrlBlock.selfArcHarf;
                    } else {
                        // 在0角度左右
                        moveArc = leftArr[0].arc + (2 * this.pi - this.ctrlBlock.arc) - leftArr[0].selfArcHarf - this.ctrlBlock.selfArcHarf;
                    }
                    this.moveAllBlcokToLeftOrRight('right', moveArc, leftArr, () => {
                        if (this.ctrlBlock.level > this.maxLevel) {
                            // 最大球爆炸后，this.ctrlBlock代替数组中的球去检测碰撞
                            this.oneBlcokChangeCtrlBlock(rightArr[0]);
                            rightArr[0].destroy();
                            rightArr.splice(0, 1);
                        }
                        this.moveAllOverCallFun(leftArr, rightArr);
                    })
                } else {
                    this.moveAllOverCallFun(leftArr, rightArr);
                }
            });

            return
        }
        // 右边球相同
        if (rightFlag) {
            rightArr[0].destroy();
            rightArr.splice(0, 1);
            this.ctrlBlockLevelUp('left', () => {
                // rightArr 左移动靠拢
                if (rightArr.length > 0) {
                    let moveArc = 0;
                    if (this.ctrlBlock.arc > rightArr[0].arc) {
                        // 在同一侧
                        moveArc = this.ctrlBlock.arc - rightArr[0].arc - rightArr[0].selfArcHarf - this.ctrlBlock.selfArcHarf;
                    } else {
                        // 在0角度左右
                        moveArc = this.ctrlBlock.arc + (2 * this.pi - rightArr[0].arc) - rightArr[0].selfArcHarf - this.ctrlBlock.selfArcHarf;
                    }
                    this.moveAllBlcokToLeftOrRight('left', moveArc, rightArr, () => {
                        if (this.ctrlBlock.level > this.maxLevel) {
                            // 最大球爆炸后，this.ctrlBlock代替数组中的球去检测碰撞
                            this.oneBlcokChangeCtrlBlock(leftArr[0]);
                            leftArr[0].destroy();
                            leftArr.splice(0, 1);
                        }
                        this.moveAllOverCallFun(leftArr, rightArr);
                    })
                } else {
                    this.moveAllOverCallFun(leftArr, rightArr);
                }
            });
            return
        }
    },

    // 判断球在ctrlBlock的右边还是左边，也可以用作判断其他球之间，返回结果是第一个参数球在第二个参数球的左（右）边
    isBlockLfetOrRight(node, ctrlBlock) {
        if (ctrlBlock === undefined || node === undefined) {
            return '';
        }
        let ctrlBlockArc = ctrlBlock.arc;
        let oppositeArc = ctrlBlockArc > this.pi ? ctrlBlockArc - this.pi : ctrlBlockArc + this.pi; // 发射球的对角位置度数
        if (ctrlBlockArc <= this.pi) { //发射球所在角度小于180度
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

    // 没碰撞，移动到最近的球附近
    moveToNearestBlock() {
        let blockArr = this.blockArr;
        let newBlockArr = [];
        let ctrlBlockArc = this.ctrlBlock.arc;
        // 发射第二个球的时候
        if (blockArr.length == 1) {
            if (this.isBlockLfetOrRight(this.ctrlBlock, blockArr[0]) == 'left') {
                this.moveToBlockByCircle(blockArr, 'left', 0);
            } else {
                this.moveToBlockByCircle(blockArr, 'right', 0);
            }
            return;
        }
        // 所在角度比最小角度的球小的时候，则球在角度最大最小球之间
        if (ctrlBlockArc < blockArr[0].arc) {
            newBlockArr = this.reSort(0); //从0开始从左到右排序
            let toLeftArc = newBlockArr[0].arc - ctrlBlockArc; // 发射球与左边球距离
            let toRightArc = ctrlBlockArc + (2 * this.pi - newBlockArr[newBlockArr.length - 1].arc); // 发射球与右边球距离
            if (toLeftArc < toRightArc) { //向左边靠拢
                this.moveToBlockByCircle(newBlockArr, 'right', 0);
            } else {
                this.moveToBlockByCircle(newBlockArr, 'left', newBlockArr.length - 1);
            }
            return;
        }
        // 所在角度比最大角度的球大的时候，则球在角度最大最小球之间
        if (ctrlBlockArc > blockArr[blockArr.length - 1].arc) {
            newBlockArr = this.reSort(0); //从0开始从左到右排序
            let toLeftArc = newBlockArr[0].arc + (2 * this.pi - ctrlBlockArc); // 发射球与左边球距离
            let toRightArc = ctrlBlockArc - newBlockArr[newBlockArr.length - 1].arc; // 发射球与右边球距离
            if (toLeftArc < toRightArc) { //向左边靠拢
                this.moveToBlockByCircle(newBlockArr, 'right', 0);
            } else {
                this.moveToBlockByCircle(newBlockArr, 'left', newBlockArr.length - 1);
            }
            return;
        }
        // 循环找出发射球所在位置
        for (let i = 0; i < blockArr.length; i++) {
            // 在数组中间
            if (ctrlBlockArc > blockArr[i].arc && ctrlBlockArc < blockArr[i + 1].arc) {
                newBlockArr = this.reSort(i + 1); //从左到右排序
                let toLeftArc = newBlockArr[0].arc - ctrlBlockArc; // 发射球与左边球距离
                let toRightArc = ctrlBlockArc - newBlockArr[newBlockArr.length - 1].arc; // 发射球与右边球距离
                if (toLeftArc < toRightArc) { //向左边靠拢
                    this.moveToBlockByCircle(newBlockArr, 'right', 0);
                } else {
                    this.moveToBlockByCircle(newBlockArr, 'left', newBlockArr.length - 1);
                }
            }
        }
    },

    // 获取球需要移动到的的位置，并且移动
    // newBlockArr：从左到右排序
    // toLeftOrRight：移动到最近球的左边还是右边
    // index：往数组第一个或者最后一个靠拢
    moveToBlockByCircle(newBlockArr, toLeftOrRight, index) {
        let pi2 = this.pi * 2; //360度
        let narestBlock = newBlockArr[index];
        //  获取最近的球的左（右）边位置，也就是球最终要移动到的位置
        let newArc = this.ctrlBlock.selfArcHarf + narestBlock.selfArcHarf;
        if (toLeftOrRight == 'right') {
            newArc = narestBlock.arc - newArc;
        } else {
            newArc = narestBlock.arc + newArc;
        }
        // 转成角坐标存在的值
        if (newArc < 0) newArc = pi2 + newArc;
        if (newArc > pi2) newArc = newArc - pi2;
        let oldArc = this.ctrlBlock.arc;
        this.ctrlBlock.arc = newArc;
        let delta = Math.abs(newArc - oldArc); //角度差，要移动的角度
        if (toLeftOrRight == 'right') {
            // 从第三四象限到一二象限，跨越0度，间距计算方式
            if (oldArc > this.pi && newArc < this.pi) {
                delta = Math.abs(pi2 - oldArc + newArc);
            }
        } else {
            // 从第一二象限到三四象限，跨越0度，间距计算方式
            if (newArc > this.pi && oldArc < this.pi) {
                delta = Math.abs(pi2 - newArc + oldArc);
            }
        }
        let moveMax = 0.015; //每次移动最大度数
        let seq = cc.sequence(
            this.actionBy,
            cc.callFunc(() => {
                this.romoveMotion();
                let actArray = [];
                let callFunc = cc.callFunc(() => {
                    this.moveToBlockByCircleCallFun(newBlockArr, index);
                });

                if (delta > moveMax) { //移动距离太大，需要分段移动，形成环形移动效果
                    let num = parseInt(delta / moveMax);
                    let time = ((num + 1) * 0.000005) + 0.0016;
                    for (let i = 0; i < num + 1; i++) {
                        if (i == num) {
                            let pos = this.getPosition(newArc, this.circleRadius);
                            let moveTo = cc.moveTo(time - (i * 0.000005), cc.v2(pos.x, pos.y));
                            actArray.push(moveTo);
                            actArray.push(callFunc);
                        } else {
                            let arc = toLeftOrRight == 'right' ? oldArc + (moveMax * (i + 1)) : oldArc - (moveMax * (i + 1));
                            let pos = this.getPosition(arc, this.circleRadius);
                            let moveTo = cc.moveTo(time - (i * 0.000005), cc.v2(pos.x, pos.y));
                            actArray.push(moveTo);
                        }
                    }
                } else {
                    let pos = this.getPosition(newArc, this.circleRadius);
                    let moveTo = cc.moveTo(this.speedMove, cc.v2(pos.x, pos.y));
                    actArray.push(moveTo);
                    actArray.push(callFunc);
                }
                let seq2 = cc.sequence(actArray);
                setTimeout(() => {

                    this.ctrlBlock.runAction(seq2);
                }, 100)
            })
        );
        this.ctrlBlock.runAction(seq);
    },

    // ctrlBlock移动完成后检测是否同level
    // newBlockArr：从左到右排序
    // index：往数组第一个或者最后一个靠拢
    moveToBlockByCircleCallFun(newBlockArr, index) {
        let narestBlock = newBlockArr[index];
        if (this.checkLevel(narestBlock)) {
            // 只有一个球的情况
            if (index == 0 && newBlockArr.length == 1) {
                newBlockArr[0].destroy();
                this.ctrlBlockLevelUp('mid', () => {
                    this.changeCtrlBlock();
                });
                return
            } else
            if (index == 0) {
                // 与左边球相同
                newBlockArr[index].destroy();
                newBlockArr.splice(index, 1);
                this.ctrlBlockLevelUp('right', () => {
                    if (newBlockArr.length > 0) {
                        // 减去第一个球，第二个球变成第一个球，index还是0
                        let moveArc = 0;
                        moveArc = newBlockArr[0].arc - this.ctrlBlock.arc - newBlockArr[0].selfArcHarf - this.ctrlBlock.selfArcHarf;
                        this.moveAllBlcokToLeftOrRight('right', moveArc, newBlockArr, () => {
                            this.moveToBlockByCircleCallFun(newBlockArr, 0);
                        })
                    } else {
                        this.changeCtrlBlock();
                    }
                });
                return
            } else {
                // 与右边球相同
                newBlockArr[index].destroy();
                newBlockArr.splice(index, 1);
                this.ctrlBlockLevelUp('left', () => {
                    if (newBlockArr.length > 0) {
                        let moveArc = 0;
                        // 减去最后一个球，index要-1
                        moveArc = this.ctrlBlock.arc - newBlockArr[index - 1].arc - newBlockArr[index - 1].selfArcHarf - this.ctrlBlock.selfArcHarf;
                        this.moveAllBlcokToLeftOrRight('left', moveArc, newBlockArr, () => {
                            this.moveToBlockByCircleCallFun(newBlockArr, index - 1);
                        })
                    } else {
                        this.changeCtrlBlock();

                    }
                });
                return
            }
        } else {
            this.changeCtrlBlock();
        }
    },

    // 是否和ctrlBlock相同等级的球
    checkLevel(node) {
        if (node.level == this.ctrlBlock.level) {
            return true;
        }
        return false;
    },

    // 球升级
    // direction:固定位置（left：left固定，xy往右，mid：中间，xy不变，）
    ctrlBlockLevelUp(direction, callback) {
        // 爆炸
        var anim = this.ctrlBlock.getChildByName('boom').getComponent(cc.Animation);
        anim.play();
        this.scoreLabel.string = parseInt(this.scoreLabel.string) + parseInt(this.ctrlBlock.level);
        let r = this.blockSize + (this.ctrlBlock.level * this.blockSizeAdd); //升级球的直径
        let levelUpSelfArcHarf = this.getBlcokArc(r / 2) / 2; // 升级球的占位角度的一半
        let levelUpArc = this.ctrlBlock.arc;
        if (direction == 'right') {
            levelUpArc = (this.ctrlBlock.arc - this.ctrlBlock.selfArcHarf) + levelUpSelfArcHarf;
        } else if (direction == 'left') {
            levelUpArc = (this.ctrlBlock.arc + this.ctrlBlock.selfArcHarf) - levelUpSelfArcHarf;
        }
        let newPos = this.getPosition(levelUpArc, this.circleRadius);
        this.ctrlBlock.getChildByName('ctrlBlock').runAction(cc.scaleTo(0.2, 0, 0));
        setTimeout(() => {
            this.ctrlBlock.level = this.ctrlBlock.level + 1;
            this.ctrlBlock.setPosition(cc.v2(newPos.x, newPos.y));
            if (this.ctrlBlock.level < this.maxLevel + 1) {
                this.ctrlBlock.setContentSize(cc.size(r, r));
                this.ctrlBlock.getChildByName('ctrlBlock').setContentSize(cc.size(r, r));
                this.ctrlBlock.getChildByName('ctrlBlock').getComponent(cc.Sprite).spriteFrame = this[`block${this.ctrlBlock.level}`];
                this.ctrlBlock.getChildByName('ctrlBlock').runAction(cc.scaleTo(0.2, 1, 1));
                this.ctrlBlock.getChildByName('boom').color = this.colorArr[this.ctrlBlock.level];
                this.ctrlBlock.selfArcHarf = levelUpSelfArcHarf;
                this.ctrlBlock.arc = levelUpArc;
            } else {
                this.ctrlBlock.setContentSize(cc.size(0, 0));
                this.ctrlBlock.getChildByName('ctrlBlock').setContentSize(cc.size(0, 0));
                if (direction == 'right') {
                    levelUpArc = levelUpArc - levelUpSelfArcHarf;
                } else if (direction == 'left') {
                    levelUpArc = levelUpArc + levelUpSelfArcHarf;
                }
                this.ctrlBlock.arc = levelUpArc;
                this.ctrlBlock.selfArcHarf = 0;
            }
            callback && callback();
        }, 200)
    },

    //  最大球爆炸后，this.ctrlBlock代替数组中的球去检测碰撞
    oneBlcokChangeCtrlBlock(node) {
        this.ctrlBlock.level = node.level;
        this.ctrlBlock.setPosition(cc.v2(node.x, node.y));
        this.ctrlBlock.setContentSize(cc.size(node.width, node.height));
        this.ctrlBlock.getChildByName('ctrlBlock').setContentSize(cc.size(node.width, node.height));
        this.ctrlBlock.getChildByName('ctrlBlock').getComponent(cc.Sprite).spriteFrame = node.getComponent(cc.Sprite).spriteFrame;
        this.ctrlBlock.getChildByName('boom').color = this.colorArr[this.ctrlBlock.level];
        this.ctrlBlock.selfArcHarf = node.selfArcHarf;
        this.ctrlBlock.arc = node.arc;
    },

    // 角度差值
    getDelta(node1, node2) {
        let delta = node1.arc - node2.arc;
        if (Math.abs(delta) > this.pi) {
            if (node2.arc > this.pi) {
                delta = (this.pi * 2 - node2.arc) + node1.arc;
            } else {
                delta = (this.pi * 2 - node1.arc) + node2.arc;
            }
        }
        return Math.abs(delta)
    },

    // 游戏结束效果
    gameOverAction(node1, node2, leftArr, rightArr) {
        let rep = cc.repeat(cc.sequence(
            cc.scaleTo(0.5, 0.7, 0.7),
            cc.scaleTo(0.5, 1, 1)
        ), 3);
        let rep2 = cc.repeat(cc.sequence(
            cc.scaleTo(0.5, 0.7, 0.7),
            cc.scaleTo(0.5, 1, 1)
        ), 2);
        node1.runAction(rep);
        node2.runAction(rep2);
        // 
        setTimeout(() => {
            if (leftArr.length > 0 && rightArr.length > 0) {
                leftArr = leftArr.reverse();
                rightArr = rightArr.reverse();
                for (let i = 0; i < leftArr.length + 1; i++) {
                    if (i == leftArr.length) {
                        if (leftArr.length >= rightArr.length) {
                            setTimeout(() => {
                                var anim = this.ctrlBlock.getChildByName('boom').getComponent(cc.Animation);
                                anim.play();
                                this.ctrlBlock.destroy();
                                this.gameOverScene();
                            }, 150 * i)
                        }
                    } else {
                        setTimeout(() => {
                            this.boomArr(leftArr[i]);
                        }, 150 * i)
                    }
                }
                for (let i = 0; i < rightArr.length + 1; i++) {
                    if (i == rightArr.length) {
                        if (rightArr.length > leftArr.length) {
                            setTimeout(() => {
                                var anim = this.ctrlBlock.getChildByName('boom').getComponent(cc.Animation);
                                anim.play();
                                this.ctrlBlock.destroy();
                                this.gameOverScene();
                            }, 150 * i)
                        }
                    } else {
                        setTimeout(() => {
                            this.boomArr(rightArr[i]);
                        }, 150 * i)
                    }
                }
            }
            if (leftArr.length == 0 || rightArr.length == 0) {
                let arr = leftArr.length > 0 ? leftArr : rightArr;
                arr = arr.reverse();
                for (let i = 0; i < arr.length + 1; i++) {
                    if (i == arr.length) {
                        setTimeout(() => {
                            var anim = this.ctrlBlock.getChildByName('boom').getComponent(cc.Animation);
                            anim.play();
                            this.ctrlBlock.destroy();
                            this.gameOverScene()
                        }, 150 * i)
                    } else {
                        setTimeout(() => {
                            this.boomArr(arr[i]);
                        }, 150 * i)
                    }
                }
            }
        }, 2000)
    },
    // boomArr
    boomArr(node) {
        let boom = cc.instantiate(this.boomPrefal);
        boom.color = this.colorArr[node.level];
        boom.setPosition(cc.v2(node.x, node.y));
        boom.parent = this.blockBox;
        var anim = boom.getComponent(cc.Animation);
        anim.play();
        node.destroy();
    },

    // 判断是否游戏结束
    checkIsGameOver(leftArr, rightArr, moveArcLeft, moveArcRight) {
        if (leftArr.length > 0 && rightArr.length > 0) {
            let node1 = leftArr[leftArr.length - 1];
            let node2 = rightArr[rightArr.length - 1];
            let delta = this.getDelta(node1, node2) - node1.selfArcHarf - node2.selfArcHarf;
            if (delta <= this.ctrlBlock.selfArcHarf * 2) {
                this.gameOverAction(node1, node2, leftArr, rightArr);
                return true;
            }
            return false;
        }
        if (leftArr.length == 0) {
            let node1 = rightArr[rightArr.length - 1];
            let node2 = this.ctrlBlock;
            let delta = this.getDelta(node1, node2) - node1.selfArcHarf - node2.selfArcHarf;
            if (delta <= moveArcRight) {
                this.gameOverAction(node1, node2, leftArr, rightArr);
                return true;
            }
            return false;
        }
        if (rightArr.length == 0) {
            let node1 = leftArr[leftArr.length - 1];
            let node2 = this.ctrlBlock;
            let delta = this.getDelta(node1, node2) - node1.selfArcHarf - node2.selfArcHarf;
            if (delta <= moveArcLeft) {
                this.gameOverAction(node1, node2, leftArr, rightArr);
                return true;
            }
            return false;
        }
    },

    // 游戏结束切换结束页，并重新开始
    gameOverScene() {
        // reset all param
        this.gameOverScore.string = this.scoreLabel.string;
        this.gameOver.active = true;
    },
    // 点击开始
    clickStart() {
        this.init();
    },

    onLoad() {
        this.init();
    },

    start() {

    },

    update(dt) {

    },
});
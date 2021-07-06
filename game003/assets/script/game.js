const common = require("./common");

cc.Class({
    extends: cc.Component,

    properties: {
        main: cc.Node,
        blockBox: cc.Node, // 环形上的球的集合
        ctrlBlockArea: cc.Node, // 发射球和待发射球的集合
        blockAtlas: cc.SpriteAtlas,
        numberAtlas: cc.SpriteAtlas,
        motionPrefal: cc.Prefab,
        boomPrefal: cc.Prefab,
        audioClip: cc.AudioClip,
        boomAudioClip: cc.AudioClip,
        handNode: cc.Node,
        scoreImgBox: cc.Node,
        scoreImgPrefab: cc.Prefab,
        gameOverNode: cc.Node,
    },
    test() {
        let arr = [
            {x: -149.9357447997648, y: -165.07050745466253, level: 1, acr: 3.974999756571179, selfArcHarf: 0.08971618416929489},
 {x: -100.60762101767565, y: -199.01534260745765, level: 3, acr: 4.244329532482892, selfArcHarf: 0.179613538152625},
 {x: -34.16565121603093, y: -220.36721234563123, level: 2, acr: 4.5585739260165425, selfArcHarf: 0.13463080179123252},
 {x: 45.505398559752386, y: -218.30771562617315, level: 4, acr: 4.917892364973209, selfArcHarf: 0.224687583575641},
 {x: 143.6720783030873, y: -170.55009210220783, level: 5, acr: 5.412456499791622, selfArcHarf: 0.2698765512427715},
 {x: 207.14595427782908, y: -82.58058867753081, level: 4, acr: 5.903835434610035, selfArcHarf: 0.224687583575641},
 {x: 222.9117344138634, y: 6.273648109609809, level: 3, acr: 0.028136663517886136, selfArcHarf: 0.179613538152625},
 {x: -188.45333636952273, y: -119.2239070455062, level: 3, acr: 3.705669980659466, selfArcHarf: 0.179613538152625}
        ]
        this.testB = {x: -184.56490646513976, y: -125.15907998029633, level: 4}
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            let num = item.level;
            aa = new cc.Node('Sprite');
            let sp = aa.addComponent(cc.Sprite);
            sp.sizeMode = 'CUSTOM';
            sp.spriteFrame = this.blockAtlas.getSpriteFrame(num.toString());
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
        this.createBlock(true, this.testB.level)
        this.arrToSort()

    },
    testClick() {
        this.ctrlBlcokGo(this.testB);
        this.createBlock(false); // 射出发后马上生成下一个球
    },

    init(str) {
        // this.gameOverNode.getComponent('gameOver').gameOverScoreImg(199);
        // this.gameOverNode.active = true;
        // test
        this.gameOverNode.active = false;
        this.ctrlBlockArea.destroyAllChildren();
        this.blockBox.destroyAllChildren();
        if (str != 'fuhuo') {
            this.scoreImg(0);
        }
        this.colorArr = ['',
            new cc.Color(50, 125, 243, 255),
            new cc.Color(110, 8, 159, 255),
            new cc.Color(218, 27, 19, 255),
            new cc.Color(243, 205, 28, 255),
            new cc.Color(254, 114, 29, 255),
            new cc.Color(234, 138, 155, 255),
            new cc.Color(128, 196, 119, 255),
            new cc.Color(113, 68, 12, 255),
            new cc.Color(48, 154, 0, 255),
        ];
        this.blockSize = 40; //最小球值
        this.blockSizeAdd = 20; //levelup +20
        this.maxLevel = 9; //最大的值，西瓜的值
        this.canCtrlBlcokLevel = 4; // 可以发射的球的最大等级
        this.pi = 3.1415926; //Π
        window.circleRadius = 223;
        this.circleRadius = 223; //环的半径
        this.speedMillisecond = 200; // 发射时间毫秒 speedMillisecond  与 speedSecond 相互对应一直
        this.speedSecond = 0.2; // 发射时间秒
        this.speedMove = 0.2; // 球在环上移动时间秒
        this.speedScaleTo = 0.5; // 发射球出现动画时间秒
        this.ctrlBlock = null; // 发射球
        this.clickFlag = false; // 控制是否可发射，执行完一个球，createBlock成功后才可发射
        this.blockArr = []; // 所有球
        this.maxNumInCircle = parseInt(6.28 / common.getBlcokArc((this.blockSize + ((this.maxLevel - 1) * this.blockSizeAdd) / 2)));
        this.isGameOver = false; // 是否游戏结束
        this.randomBlock = {
            num: 0,
            dir: true
        };
        this.blockBox.zIndex = 1;
        this.ctrlBlockArea.zIndex = 9;
        this.handNode.zIndex = 10;
        this.gameOverNode.zIndex = 11;
        // this.test(); //debug
        // this.testNum = 0; //debug
        // this.testarr = [4, 5, 6,7 , 8, 9,7, 2, 3]; //debug

        //第一个球
        this.firstBlockInCricle();
        this.createBlock(true, 1);
        this.setTouch();
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
            sp.srcBlendFactor = cc.macro.BlendFactor.ONE;
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

    // 初始化第一个球再环上
    firstBlockInCricle() {
        let num = 1;
        let node = new cc.Node('Node');
        let Sprite = new cc.Node('Sprite');
        Sprite.parent = node;
        let sp = Sprite.addComponent(cc.Sprite);
        sp.sizeMode = 'CUSTOM';
        sp.spriteFrame = this.blockAtlas.getSpriteFrame(num.toString());
        sp.srcBlendFactor = cc.macro.BlendFactor.ONE;
        let r = this.blockSize + ((num - 1) * this.blockSizeAdd);
        node.setContentSize(cc.size(r, r));
        Sprite.setContentSize(cc.size(r, r));
        node.selfArcHarf = common.getBlcokArc(r / 2) / 2; // 固定球占位角度数的一半
        node.level = num;
        node.arc = common.getArcAndRadius(0, -this.circleRadius).arc;
        node.setPosition(cc.v2(0, -this.circleRadius));
        node.parent = this.blockBox;
        this.arrToSort();
        this.handNode.active = true;
        this.handPlay();
    },

    // 创造新的随机球的发射球
    // isCtrlBlock: 是否直接变成控制球
    createBlock(isCtrlBlock, level) {
        let num = level ? level : common.randomNum(this.canCtrlBlcokLevel);
        this.waitBlcok = new cc.Node('Node');
        this.waitBlcok.parent = this.ctrlBlockArea;
        let Sprite = new cc.Node('Sprite');
        Sprite.parent = this.waitBlcok;
        Sprite.name = 'ctrlBlock';
        let sp = Sprite.addComponent(cc.Sprite);
        sp.sizeMode = 'CUSTOM';
        sp.spriteFrame = this.blockAtlas.getSpriteFrame(num.toString());
        sp.srcBlendFactor = cc.macro.BlendFactor.ONE;
        this.waitBlcok.setPosition(cc.v2(0, 0));
        this.waitBlcok.setScale(cc.v2(0, 0));
        let r = this.blockSize + ((num - 1) * this.blockSizeAdd);
        this.waitBlcok.setContentSize(cc.size(r, r));
        Sprite.setContentSize(cc.size(r, r));
        this.waitBlcok.selfArcHarf = common.getBlcokArc(r / 2) / 2; // 固定球占位角度数的一半
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

                if (isCtrlBlock) {
                    this.ctrlBlock = this.waitBlcok;
                    this.waitBlcok = null;
                    this.clickFlag = true;
                }
            })
        );
        this.waitBlcok.runAction(seq);
    },

    

    // 创造新的随机球 在圆环上
    // arr :从右到左排序
    createBlockByCircle(arr) {
        let num = common.randomNum(3);
        let lastNode = null;
        if (this.randomBlock.dir) { //left
            if (num == arr[0].level) {
                num = common.createBlockCheckIsSame(num);
            }
        } else {
            if (num == arr[arr.length - 1].level) {
                num = common.createBlockCheckIsSame(num);
            }
        }
        let node = new cc.Node('Node');
        let Sprite = new cc.Node('Sprite');
        Sprite.parent = node;
        let sp = Sprite.addComponent(cc.Sprite);
        sp.sizeMode = 'CUSTOM';
        sp.spriteFrame = this.blockAtlas.getSpriteFrame(num.toString());;
        sp.srcBlendFactor = cc.macro.BlendFactor.ONE;
        node.setScale(cc.v2(0, 0));
        let r = this.blockSize + ((num - 1) * this.blockSizeAdd);
        node.setContentSize(cc.size(r, r));
        Sprite.setContentSize(cc.size(r, r));
        node.selfArcHarf = common.getBlcokArc(r / 2) / 2; // 固定球占位角度数的一半
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
        pos = common.getPosition(arc, this.circleRadius);
        node.setPosition(cc.v2(pos.x, pos.y));
        // 判断随机增加的球是否和另一侧最后一个球重叠，重叠则结束游戏
        this.isGameOver = arr.length > this.maxNumInCircle ? common.checkBlackIsOverlap(lastNode, node) : false;
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
        this.main.on('touchend', function(event) {
            if (!this.clickFlag) return;
            if (this.handNode.active) {
                this.handNode.active = false;
                this.handStop();
            }
            let pos = event.getLocation();
            pos = this.main.convertToNodeSpaceAR(pos);
            this.ctrlBlcokGo(pos);
            this.randomBlock.num = this.randomBlock.num + 1;

            // this.testNum++;//debug
            // this.createBlock(false, this.testarr[this.testNum]); //debug
            this.createBlock(false); // 射出发后马上生成下一个球
        }, this)
    },
    // 点击发射球 获取发射到的位置
    ctrlBlcokGo(pos) {
        this.clickFlag = false;
        let aPos = common.getArcAndRadius(pos.x, pos.y); //获取发射角度
        let bPos = common.getPosition(aPos.arc, this.circleRadius); //获取发射到环上的xy位置
        this.actionBy = cc.moveTo(this.speedSecond, cc.v2(bPos.x, bPos.y)); //移动到xy位置的运动
        this.ctrlBlock.arc = aPos.arc;
        console.log('发射求的位置xy', { x: bPos.x, y: bPos.y, level: this.ctrlBlock.level })
        this.checkBlack();
    },

    // 获取每个球所在角度+从小到大排序
    arrToSort() {
        if (this.randomBlock.num == 3) {
            let arr = this.blockBox.children;
            arr = common.sortMinToMax(arr);
            arr = common.sortRightToLeft(arr);
            this.createBlockByCircle(arr);
            this.randomBlock.num = 0;
            this.randomBlock.dir = !this.randomBlock.dir;
        }
        // 
        if (!this.isGameOver) {
            let arr = this.blockBox.children;
            this.blockArr = common.sortMinToMax(arr);
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
            this.playEffect();
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
            let isInside = common.checkBlackIsInside(node, this.ctrlBlock); //是否嵌套
            let newArc = this.ctrlBlock.selfArcHarf + node.selfArcHarf;
            if (isInside) {
                if (common.isBlockLfetOrRight(node, this.ctrlBlock) == 'left') { //判断在发射球左（右）边
                    newArc = node.arc - newArc;
                    newArc = common.changeArc(newArc);
                    moveArcLeft = null;
                    moveArcRight = this.ctrlBlock.selfArcHarf * 2;
                    overlapIndexLeft = i;
                } else {
                    newArc = node.arc + newArc;
                    newArc = common.changeArc(newArc);
                    moveArcLeft = this.ctrlBlock.selfArcHarf * 2;
                    moveArcRight = null;
                    overlapIndexLeft = (i == (this.blockArr.length - 1)) ? 0 : i + 1;
                }
                this.ctrlBlock.arc = newArc;
                let pos = common.getPosition(newArc, this.circleRadius);
                this.actionBy = cc.moveTo(this.speedSecond, cc.v2(pos.x, pos.y));
                // 把发射球改变发射到的位置，改成嵌套求的左（右）边
                this.playEffect();
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
            let isOverlap = common.checkBlackIsOverlap(node, this.ctrlBlock);
            if (isOverlap) {
                if (common.isBlockLfetOrRight(node, this.ctrlBlock) == 'left') {
                    // 在发射球的左侧
                    moveArcLeft = common.getOverlapArc(node, this.ctrlBlock);
                    overlapIndexLeft = i;
                } else {
                    // 在发射球的右侧
                    moveArcRight = common.getOverlapArc(this.ctrlBlock, node);
                    overlapIndexRight = i;
                }
            }
        }
        if (moveArcLeft || moveArcRight) { //有碰撞
            this.playEffect();
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
                isBySide = common.checkBlockBySide(this.ctrlBlock, node);
                isBlockLfetOrRight = common.isBlockLfetOrRight(node, this.ctrlBlock);
                if (blockArr.length > 1 && (this.ctrlBlock.arc - this.ctrlBlock.selfArcHarf) < node.arc) {
                    // 如果发射球因发射在比自身大的球的内部偏左，发射球则自己向左移动到大球左边，
                    // 则发射球左边第一个球如果半径小于发射球，则isBlockLfetOrRight返回right，但其实该球是在发射球的left
                    isBlockLfetOrRight = 'left';
                }
            } else {
                isBySide = common.checkBlockBySide(preNode, node);
                isBlockLfetOrRight = common.isBlockLfetOrRight(node, preNode);
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
        blockArr = common.reSort(overlapIndexLeft,this.blockArr);

        // test测试打印
        let testArr = [];
        for (let i = 0; i < blockArr.length; i++) {
            let item = blockArr[i]
            testArr[i] = { 'x': item.x, 'y': item.y, 'level': item.level, 'acr': item.arc, 'selfArcHarf': item.selfArcHarf };
        }
        console.log('copyArray', testArr,overlapIndexLeft)

        let obj = { leftArr: [], rightArr: [] }; // 拆分成两边，leftArr为发射球左边，rightArr发射球右边
        obj = this.splitBlockArr(blockArr);
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
            let oldArc = node.arc;
            let newArc = direction == 'left' ? node.arc + moveArc : node.arc - moveArc;
            // 转成角坐标存在的值
            let newArcToNode = common.changeArc(newArc);
            node.arc = newArcToNode;
            let newPos = common.getPosition(newArc, this.circleRadius);
            let moveTo = cc.moveTo(this.speedMove, cc.v2(newPos.x, newPos.y));
            if (i == arr.length - 1) {
                // 移动太长，两个西瓜爆炸后
                let moveMax = 0.01;
                let actArray = [];
                let callFunc = cc.callFunc(() => {
                    callback && callback();
                });
                if (moveArc > 0.66) {
                    let num = parseInt(moveArc / moveMax);
                    for (let j = 0; j < num + 1; j++) {
                        if (j == num) {
                            let moveToItem = cc.moveTo(0.003, cc.v2(newPos.x, newPos.y));
                            actArray.push(moveToItem);
                            actArray.push(callFunc);
                        } else {
                            let arc = direction == 'left' ? oldArc + (moveMax * (j + 1)) : oldArc - (moveMax * (j + 1));
                            let pos = common.getPosition(arc, this.circleRadius);
                            let moveToItem = cc.moveTo(0.003, cc.v2(pos.x, pos.y));
                            actArray.push(moveToItem);
                        }
                    }
                    let seq = cc.sequence(actArray);
                    node.runAction(seq);
                } else {
                    // 正常情况
                    let seq = cc.sequence(
                        moveTo,
                        cc.callFunc(() => {
                            // 最后一个移动完执行callback
                            callback && callback();
                        })
                    );
                    node.runAction(seq);
                }
            } else {
                // 移动太长，两个西瓜爆炸后
                let moveMax = 0.01;
                let actArray = [];
                if (moveArc > 0.66) {
                    let num = parseInt(moveArc / moveMax);
                    for (let j = 0; j < num + 1; j++) {
                        if (j == num) {
                            let moveToItem = cc.moveTo(0.003, cc.v2(newPos.x, newPos.y));
                            actArray.push(moveToItem);
                        } else {
                            let arc = direction == 'left' ? oldArc + (moveMax * (j + 1)) : oldArc - (moveMax * (j + 1));
                            let pos = common.getPosition(arc, this.circleRadius);
                            let moveToItem = cc.moveTo(0.003, cc.v2(pos.x, pos.y));
                            actArray.push(moveToItem);
                        }
                    }
                    let seq = cc.sequence(actArray);
                    node.runAction(seq);
                } else {
                    // 正常情况
                    let seq = cc.sequence(
                        moveTo,
                        cc.callFunc(() => {})
                    );
                    node.runAction(seq);
                }
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
                    let moveArc = common.getOverlapArc(leftArr[0], this.ctrlBlock);
                    this.moveAllBlcokToLeftOrRight('left', moveArc, leftArr, () => {
                        if (rightArr.length == 0) {
                            this.moveAllOverCallFun(leftArr, rightArr);
                        }
                    })
                }
                if (rightArr.length > 0) {
                    let moveArc = common.getOverlapArc(this.ctrlBlock, rightArr[0]);
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
                            setTimeout(() => { //爆炸动画执行完再执行
                                if (rightArr.length == 0) {
                                    this.moveAllOverCallFun(leftArr, rightArr);
                                    return;
                                }
                                this.oneBlcokChangeCtrlBlock(rightArr[0], () => {
                                    rightArr[0].destroy();
                                    rightArr.splice(0, 1);
                                    this.moveAllOverCallFun(leftArr, rightArr);
                                });
                            }, 100)
                        } else {
                            this.moveAllOverCallFun(leftArr, rightArr);
                        }
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
                            setTimeout(() => { //爆炸动画执行完再执行
                                if (leftArr.length == 0) {
                                    this.moveAllOverCallFun(leftArr, rightArr);
                                    return;
                                }
                                this.oneBlcokChangeCtrlBlock(leftArr[0], () => {
                                    leftArr[0].destroy();
                                    leftArr.splice(0, 1);
                                    this.moveAllOverCallFun(leftArr, rightArr);
                                });
                            }, 100)
                        } else {
                            this.moveAllOverCallFun(leftArr, rightArr);
                        }
                    })
                } else {
                    this.moveAllOverCallFun(leftArr, rightArr);
                }
            });
            return
        }
    },

    
    // 没碰撞，移动到最近的球附近
    moveToNearestBlock() {
        let blockArr = this.blockArr;
        let newBlockArr = [];
        let ctrlBlockArc = this.ctrlBlock.arc;
        // 发射第二个球的时候
        if (blockArr.length == 1) {
            if (common.isBlockLfetOrRight(this.ctrlBlock, blockArr[0]) == 'left') {
                this.moveToBlockByCircle(blockArr, 'left', 0);
            } else {
                this.moveToBlockByCircle(blockArr, 'right', 0);
            }
            return;
        }
        // 所在角度比最小角度的球小的时候，则球在角度最大最小球之间
        if (ctrlBlockArc < blockArr[0].arc) {
            newBlockArr = common.reSort(0,this.blockArr); //从0开始从左到右排序
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
            newBlockArr = common.reSort(0,this.blockArr); //从0开始从左到右排序
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
                newBlockArr = common.reSort(i + 1,this.blockArr); //从左到右排序
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
        newArc = common.changeArc(newArc);
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
        let moveMax = 0.01; //每次移动最大度数
        this.playEffect();
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
                    for (let i = 0; i < num + 1; i++) {
                        if (i == num) {
                            let pos = common.getPosition(newArc, this.circleRadius);
                            let moveTo = cc.moveTo(0.003, cc.v2(pos.x, pos.y));
                            actArray.push(moveTo);
                            actArray.push(callFunc);
                        } else {
                            let arc = toLeftOrRight == 'right' ? oldArc + (moveMax * (i + 1)) : oldArc - (moveMax * (i + 1));
                            let pos = common.getPosition(arc, this.circleRadius);
                            let moveTo = cc.moveTo(0.003, cc.v2(pos.x, pos.y));
                            actArray.push(moveTo);
                        }
                    }
                } else {
                    let pos = common.getPosition(newArc, this.circleRadius);
                    let moveTo = cc.moveTo(this.speedMove, cc.v2(pos.x, pos.y));
                    actArray.push(moveTo);
                    actArray.push(callFunc);
                }
                let seq2 = cc.sequence(actArray);
                setTimeout(() => {
                    this.ctrlBlock.runAction(seq2);
                }, 10)
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
        this.playEffectBoomAudioClip();
        var anim = this.ctrlBlock.getChildByName('boom').getComponent(cc.Animation);
        anim.play();
        this.scoreImg(parseInt(this.score) + parseInt(this.ctrlBlock.level));
        let r = this.blockSize + (this.ctrlBlock.level * this.blockSizeAdd); //升级球的直径
        let levelUpSelfArcHarf = common.getBlcokArc(r / 2) / 2; // 升级球的占位角度的一半
        let levelUpArc = this.ctrlBlock.arc;
        if (direction == 'right') {
            levelUpArc = (this.ctrlBlock.arc - this.ctrlBlock.selfArcHarf) + levelUpSelfArcHarf;
        } else if (direction == 'left') {
            levelUpArc = (this.ctrlBlock.arc + this.ctrlBlock.selfArcHarf) - levelUpSelfArcHarf;
        }
        let newPos = common.getPosition(levelUpArc, this.circleRadius);
        this.ctrlBlock.getChildByName('ctrlBlock').runAction(cc.scaleTo(0.2, 0, 0));
        setTimeout(() => {
            this.ctrlBlock.level = this.ctrlBlock.level + 1;
            this.ctrlBlock.setPosition(cc.v2(newPos.x, newPos.y));
            if (this.ctrlBlock.level < this.maxLevel + 1) {
                this.ctrlBlock.setContentSize(cc.size(r, r));
                this.ctrlBlock.getChildByName('ctrlBlock').setContentSize(cc.size(r, r));
                this.ctrlBlock.getChildByName('ctrlBlock').getComponent(cc.Sprite).spriteFrame = this.blockAtlas.getSpriteFrame(this.ctrlBlock.level.toString());
                this.ctrlBlock.getChildByName('ctrlBlock').getComponent(cc.Sprite).srcBlendFactor = cc.macro.BlendFactor.ONE;
                this.ctrlBlock.getChildByName('ctrlBlock').runAction(cc.scaleTo(0.2, 1, 1));
                setTimeout(() => {
                    // 不延迟，上一个爆咋的时候，颜色突然会变成下一个
                    this.ctrlBlock.getChildByName('boom').color = this.colorArr[this.ctrlBlock.level];
                }, 400)
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
        }, this.speedMillisecond)
    },

    //  最大球爆炸后，this.ctrlBlock代替数组中的球去检测碰撞
    oneBlcokChangeCtrlBlock(node, callback) {
        let num = node.level;
        let newNode = new cc.Node('Node');
        let Sprite = new cc.Node('Sprite');
        Sprite.parent = newNode;
        Sprite.name = 'ctrlBlock';
        let sp = Sprite.addComponent(cc.Sprite);
        sp.sizeMode = 'CUSTOM';
        sp.spriteFrame = this.blockAtlas.getSpriteFrame(num.toString());
        sp.srcBlendFactor = cc.macro.BlendFactor.ONE;
        newNode.setPosition(cc.v2(node.x, node.y));
        let r = this.blockSize + ((num - 1) * this.blockSizeAdd);
        newNode.setContentSize(cc.size(r, r));
        Sprite.setContentSize(cc.size(r, r));
        newNode.selfArcHarf = node.selfArcHarf;
        newNode.arc = node.arc;
        newNode.level = num;
        newNode.parent = this.ctrlBlockArea;
        // 爆炸效果
        let boom = cc.instantiate(this.boomPrefal);
        boom.parent = newNode;
        boom.color = this.colorArr[num];
        // 移除ctrlBlock
        this.ctrlBlock.destroy();
        // 换成新的ctrlBlock
        this.ctrlBlock = newNode;
        callback && callback();
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
                                this.playEffectBoomAudioClip();
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
                                this.playEffectBoomAudioClip();
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
                            this.playEffectBoomAudioClip();
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
        this.playEffectBoomAudioClip();
        var anim = boom.getComponent(cc.Animation);
        anim.play();
        node.destroy();
    },

    // 判断是否游戏结束
    checkIsGameOver(leftArr, rightArr, moveArcLeft, moveArcRight) {
        if (leftArr.length > 0 && rightArr.length > 0) {
            let node1 = leftArr[leftArr.length - 1];
            let node2 = rightArr[rightArr.length - 1];
            let delta = common.getDelta(node1, node2) - node1.selfArcHarf - node2.selfArcHarf;
            if (delta <= this.ctrlBlock.selfArcHarf * 2) {
                this.gameOverAction(node1, node2, leftArr, rightArr);
                return true;
            }
            return false;
        }
        if (leftArr.length == 0) {
            let node1 = rightArr[rightArr.length - 1];
            let node2 = this.ctrlBlock;
            let delta = common.getDelta(node1, node2) - node1.selfArcHarf - node2.selfArcHarf;
            if (delta <= moveArcRight) {
                this.gameOverAction(node1, node2, leftArr, rightArr);
                return true;
            }
            return false;
        }
        if (rightArr.length == 0) {
            let node1 = leftArr[leftArr.length - 1];
            let node2 = this.ctrlBlock;
            let delta = common.getDelta(node1, node2) - node1.selfArcHarf - node2.selfArcHarf;
            if (delta <= moveArcLeft) {
                this.gameOverAction(node1, node2, leftArr, rightArr);
                return true;
            }
            return false;
        }
    },

    // 游戏结束切换结束页
    gameOverScene() {
        this.gameOverNode.getComponent('gameOver').gameOverScoreImg(this.score);
        this.gameOverNode.active = true;
    },

    // 点击 重新开始
    clickStart() {
        let self = this;
        let ad = null;
        // 插播视频
        FBInstant.getInterstitialAdAsync(
            '541606183515187_542798350062637'
        ).then(function(interstitial) {
            let ad = interstitial;
            return ad.loadAsync();
            // interstitial.getPlacementID(); // 'my_placement_id'
        }).then(function() {
            // Ad loaded
            self.init();
            return ad.showAsync();
        }).catch(function(err) {
            console.log(err);
        });
    },

    // 点击 复活
    clickFuhuo(event, customEventData) {
        let self = this;
        let ad = null;
        // 激励视频
        FBInstant.getRewardedVideoAsync(
            '541606183515187_542797943396011'
        ).then(function(rewardedVideo) {
            if (typeof rewardedVideo !== 'undefined') {
                if (typeof rewardedVideo.getPlacementID() === 'undefined') {
                    console.log('can not get placement ID')
                }
                ad = rewardedVideo;
                return rewardedVideo.loadAsync()
            } else {
                return Promise.reject(new Error('rewardedVideo is undefined'))
            }
        }).then(function() {
            // Ad loaded
            return ad.showAsync();
        }).then(function() {
            // Ad watched
            if (customEventData == 'fuhuo') {
                self.init('fuhuo');
            } else {
                // change
                let num = common.randomNum(4);
                let level = this.ctrlBlock.level;
                this.waitBlcok && this.waitBlcok.destroy();
                this.ctrlBlock && this.ctrlBlock.destroy();
                if (num == level) {
                    num = common.createBlockCheckIsSame(num);
                }
                this.createBlock(true, num)
            }

        }).catch(function(err) {
            console.log(err);
        });
    },

    // 分享
    shareGame() {
        FBInstant.context.chooseAsync().then(function() {
            FBInstant.updateAsync({
                action: "CUSTOM",
                template: "top_score",
                cta: "Race " + FBInstant.player.getName(),
                image: 'BASE64',
                text: {
                    default: "I Challenge You To A Race!"
                },
                data: {
                    myReplayData: "..."
                },
                strategy: "LAST",
                notification: "NO_PUSH"
            }).then(function() {});
        });
    },

    // 播放音效
    playEffect() {
        cc.audioEngine.play(this.audioClip, false, 1);
    },

    playEffectBoomAudioClip() {
        cc.audioEngine.play(this.boomAudioClip, false, 1);
    },

    // hand  动画
    handPlay() {
        var anim = this.handNode.getComponent(cc.Animation);
        anim.play();
    },

    // hand  动画
    handStop() {
        var anim = this.handNode.getComponent(cc.Animation);
        anim.stop();
    },

    // 分数图片
    scoreImg(num) {
        this.score = num;
        num = this.score.toString().split("");
        let len = this.scoreImgBox.children.length;
        if(len<num.length){
            for(let i=0;i<(num.length-len);i++) {
                let node = cc.instantiate(this.scoreImgPrefab);
                node.parent = this.scoreImgBox;
            }
        }
        let children = this.scoreImgBox.children;
        for(let i=0;i<num.length;i++) {
            children[i].getComponent(cc.Sprite).spriteFrame = this.numberAtlas.getSpriteFrame(num[i].toString());
        }
    },

    onLoad() {
        this.init();
    },

    start() {

    },

    update(dt) {

    },
});
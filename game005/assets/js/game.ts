const { ccclass, property } = cc._decorator;
import groupNodeClass from "./groupNodeClass"; 

@ccclass
export default class ganme extends cc.Component {

    @property(cc.Node)
    table: cc.Node = null;

    @property(cc.Node)
    bgBox: cc.Node = null;

    @property(cc.Node)
    moveBox: cc.Node = null;

    @property(cc.Prefab)
    bgBlock: cc.Prefab = null;

    @property(cc.Prefab)
    groupNode: cc.Prefab = null;

    @property
    row: Array<object> = [];

    @property
    col: Array<object> = [];

    @property
    blockWidth: number = 50;

    // 高亮的可放置点数组
    @property
    PullDowmArr: Array<cc.Node> = [];

    @property
    allBlock: Array<Array<cc.Node>> = [];

    // 铺bg
    setBgBlcok() {
        for (let i = 0; i < 9; i++) {
            let arr = [];
            for (let j = 0; j < 9; j++) {
                let bgBlock = cc.instantiate(this.bgBlock);
                bgBlock.parent = this.bgBox;
                bgBlock.getChildByName("1").active = true;
                bgBlock.getComponent('bgBlock').col = i;
                bgBlock.getComponent('bgBlock').row = j;
                bgBlock.getComponent('bgBlock').active = 1;
                arr.push(bgBlock);
            }
            this.allBlock.push(arr);
        }
    }

    // 生产一个组合块
    creatorBlcok() {
        // let groupNode = cc.instantiate(this.groupNode);
        // groupNode.parent = this.moveBox;
        // groupNode.width = this.blockWidth * 2;
        // groupNode.height = this.blockWidth;
        // groupNode.position = cc.v3(0, -300);
        // groupNode.getComponent('groupNode').type = 1;
        // groupNode.getComponent('groupNode').setTypeArr(1);
        // for (let i = 0; i < 2; i++) {
        //     let groupBlock = cc.instantiate(this.bgBlock);
        //     groupBlock.parent = groupNode;
        //     groupBlock.getChildByName("2").active = true;
        //     switch (i) {
        //         case 0:
        //             groupBlock.position = cc.v3(0, 0);
        //             break;
        //         case 1:
        //             groupBlock.position = cc.v3(groupBlock.width, 0);
        //             break;
        //     }
        // }
        let groupNode = groupNodeClass(1,this.blockWidth,this.bgBlock,this.groupNode,this.moveBox);
        console.log('groupNode',groupNode)
        this.setTouch(groupNode);
    }

    // 转世界坐标
    touchChangeLocation(event) {
        let pos = event.getLocation();
        return pos = this.node.convertToNodeSpaceAR(pos);
    }

    // 绑定touch事件
    setTouch(groupNode) {
        groupNode.on('touchstart', (event) => {
            let pos = this.touchChangeLocation(event);
            groupNode.x = pos.x;
            groupNode.y = pos.y;

        })
        groupNode.on('touchmove', (event) => {
            let pos = this.touchChangeLocation(event);
            groupNode.x = pos.x;
            groupNode.y = pos.y;
            this.check(groupNode, pos);
            

        })
        groupNode.on('touchend', (event) => {
            let pos = this.touchChangeLocation(event);
            groupNode.x = pos.x;
            groupNode.y = pos.y;
            this.groupNodePullDown(groupNode);
        })
        groupNode.on('touchcancel', (event) => {

        })
    }

    // 判断距离最近的点
    searchClosestBlock(pos) {
        for (let i = 0; i < this.allBlock.length; i++) {
            let arr = this.allBlock[i];
            for(let j = 0; j < arr.length; j++){
                let item = arr[j];
                let href = this.blockWidth/2;
                if(item.x-href <= pos.x && pos.x < item.x+href && item.y-href <= pos.y && pos.y < item.y+href){
                    return item;
                }
            }
        }
        return null

    }

    // 改变block颜色
    changeBlockColor(name,arr) {
        for(let i= 0;i<arr.length;i++) {
            arr[i].getComponent('bgBlock').active = name;
            arr[i].children.forEach((element) => {
                if(element.name == name){
                    element.active = true;
                }else{
                    element.active = false;
                }
            });
        }
    }
    
    //  移动时候检测是否有可放置的位置
    check(groupNode, pos) {
        // 清空之前的置灰
        if(this.PullDowmArr.length>0){
            this.changeBlockColor(1,this.PullDowmArr);
            this.PullDowmArr = [];
        }
        let closestBlock = this.searchClosestBlock(pos);
        let isCanPullDown = true;
        // 获取最靠近的bgblock
        if(closestBlock){
            let col = closestBlock.getComponent('bgBlock').col;
            let row = closestBlock.getComponent('bgBlock').row;
            let PullDowmArr = [];// arr:  准备放的位置数组
            let typeArr = groupNode.getComponent('groupNode').typeArr;// typeArr：groupNode类型块的位置
            PullDowmArr.push(closestBlock);
            if(closestBlock.getComponent('bgBlock').isBlock){
                //这个位置已经有block了
                isCanPullDown = false;
            }else{
                for(let i= 1;i<typeArr.length;i++) {
                    let nextCol = col+typeArr[i].col;
                    let nextRow = row+typeArr[i].row;
                    if(nextCol>8 || nextRow>8){
                        //超出范围了
                        isCanPullDown = false;
                        break;
                    }
                    let nextNode = this.allBlock[nextCol][nextRow];
                    if(nextNode.getComponent('bgBlock').isBlock){
                        //这个位置已经有block了
                        isCanPullDown = false;
                        break;
                    }
                    PullDowmArr.push(nextNode);
                }
            }
            if(isCanPullDown) {
                // 可放置位置高亮
                this.changeBlockColor(3,PullDowmArr);
                this.PullDowmArr = PullDowmArr;
            }
            



        }
    }

    // 放下groupNode
    groupNodePullDown(groupNode) {
        if(this.PullDowmArr.length > 0) {
            cc.tween(groupNode)
            .to(0.2, { x:this.PullDowmArr[0].x, y:this.PullDowmArr[0].y}, { easing: 'backOut' })
            .call(() => {
                this.changeBlockColor(2,this.PullDowmArr);
                groupNode.destroy();
            })
            .start()
        }else{
            cc.tween(groupNode)
            .to(0.3, { x:0, y:-300}, { easing: 'backOut' })
            .call(() => {})
            .start() 
        }
    }


    onLoad() {
        this.setBgBlcok();
        this.creatorBlcok();
    }

    start() {

    }

}

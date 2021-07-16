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

    // 1:铺面颜色，2：放置颜色，3：可防止高亮颜色，4：可消除颜色
    @property(cc.Prefab)
    bgBlock: cc.Prefab = null;

    @property(cc.Prefab)
    groupNode: cc.Prefab = null;

    @property
    pickUpHeight: number = 300;

    @property
    blockWidth: number = 50;

    // 高亮的可放置点数组
    @property
    PullDowmArr: Array<cc.Node> = [];

    // 可消除的点数组集合
    @property
    canDesArr: Array<Array<cc.Node>> = [];

    @property
    allBlock: Array<Array<cc.Node>> = [];

    @property
    testNum: number = 0;

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
        // 大方块-换颜色
        let color = new cc.Color(74,74,74,255);
        let colorFlag = false;
        for(let x=0;x<3;x++){
            for(let i=0;i<3;i++){
                let arr = [];
                if(colorFlag){
                    color =  new cc.Color(42,42,42,255);
                }else{
                    color = new cc.Color(74,74,74,255);
                }
                colorFlag = !colorFlag;
                for(let j=0;j<3;j++){//col
                    for(let k=0;k<3;k++){//row
                        let block = this.allBlock[3*x+j][3*i+k];
                        block.getChildByName('1').color = color;
                    }
                }
            }
        }
    }

    // 生产一个组合块
    creatorBlcok() {
        // 每次出现3个
        for(let i= 0;i<3;i++){
            let groupNode = groupNodeClass(this.testNum,this.blockWidth,this.bgBlock,this.groupNode,this.moveBox,i);
            this.setTouch(groupNode);
            if(this.testNum == 10){
                this.testNum = 0;
                return;
            }
            this.testNum = this.testNum+1;
            if(!this.checkGroupNodeCanPullDown(groupNode)){
                this.changeBlockColor(1,groupNode.getChildByName('groupMid').children);
            }
        }
    }

    // 转世界坐标
    touchChangeLocation(event) {
        let pos = event.getLocation();
        return pos = this.table.convertToNodeSpaceAR(pos);
    }

    // 绑定touch事件
    setTouch(groupNode) {
        groupNode.on('touchstart', (event) => {
            let pos = this.touchChangeLocation(event);
            groupNode.x = pos.x;
            groupNode.y = pos.y;
            this.groupNodePickUp(groupNode);
        })
        groupNode.on('touchmove', (event) => {
            let pos = this.touchChangeLocation(event);
            groupNode.x = pos.x;
            groupNode.y = pos.y;
            this.check(groupNode);
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

    // 获取距离最近的block
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
    changeBlockColor(showName,arr,color) {
        // showName： 0 复原
        for(let i= 0;i<arr.length;i++) {
            arr[i].getComponent('bgBlock').active = showName;
            arr[i].children.forEach((element) => {
                if(showName == 0){
                    if(arr[i].getComponent('bgBlock').isBlock && element.name == 2){
                        element.active = true;
                    }else
                    if(!arr[i].getComponent('bgBlock').isBlock && element.name == 1){
                        element.active = true;
                    }else{
                        element.active = false;
                    }
                }else{
                    if(element.name == showName){
                        element.active = true;
                    }else{
                        element.active = false;
                    }
                }
                if(color && element.name == '2'){
                    element.color = color;
                }
            });
            if(showName == '2') {
                arr[i].getComponent('bgBlock').isBlock = true;
            }
            if(showName == '1') {
                arr[i].getComponent('bgBlock').isBlock = false;
            }
        }
        
    }

    // 是否可放置
    canPullDown(closestBlock,groupNode) {
        let row = closestBlock.getComponent('bgBlock').row;
        let col = closestBlock.getComponent('bgBlock').col;
        let PullDowmArr = [];// arr:  准备放的位置数组
        let typeArr = groupNode.getComponent('groupNode').typeArr;// typeArr：groupNode类型块的位置
        PullDowmArr.push(closestBlock);
        if(closestBlock.getComponent('bgBlock').isBlock){
            //这个位置已经有block了
            return false;
        }else{
            for(let i= 1;i<typeArr.length;i++) {
                let nextRow = row+typeArr[i].row;
                let nextCol = col+typeArr[i].col;
                if(nextCol<0 || nextCol>8 || nextRow>8 || nextRow<0){
                    //超出范围了
                    return false;
                }
                let nextNode = this.allBlock[nextCol][nextRow];
                if(nextNode.getComponent('bgBlock').isBlock){
                    //这个位置已经有block了
                    return false;
                }
                PullDowmArr.push(nextNode);
            }
            return PullDowmArr;
        }
    }
    
    //  移动时候检测是否有可放置的位置
    check(groupNode) {
        let pos = {x:groupNode.x,y:groupNode.y+this.pickUpHeight};
        // 清空之前的可防止高亮
        if(this.PullDowmArr.length>0){
            this.changeBlockColor(1,this.PullDowmArr);
            this.PullDowmArr = [];
        }
        // 清空之前的可消除高亮
        if(this.canDesArr.length>0){
            for(let i=0;i<this.canDesArr.length;i++){
                this.changeBlockColor(0,this.canDesArr[i]);
            }
            this.canDesArr = [];
        }
        let closestBlock = this.searchClosestBlock(pos);
        // 获取最靠近的bgblock
        if(closestBlock){
            // let row = closestBlock.getComponent('bgBlock').row;
            // let col = closestBlock.getComponent('bgBlock').col;
            // let PullDowmArr = [];// arr:  准备放的位置数组
            // let typeArr = groupNode.getComponent('groupNode').typeArr;// typeArr：groupNode类型块的位置
            // PullDowmArr.push(closestBlock);
            // if(closestBlock.getComponent('bgBlock').isBlock){
            //     //这个位置已经有block了
            //     isCanPullDown = false;
            // }else{
            //     for(let i= 1;i<typeArr.length;i++) {
            //         let nextRow = row+typeArr[i].row;
            //         let nextCol = col+typeArr[i].col;
            //         if(nextCol<0 || nextCol>8 || nextRow>8 || nextRow<0){
            //             //超出范围了
            //             isCanPullDown = false;
            //             break;
            //         }
            //         let nextNode = this.allBlock[nextCol][nextRow];
            //         if(nextNode.getComponent('bgBlock').isBlock){
            //             //这个位置已经有block了
            //             isCanPullDown = false;
            //             break;
            //         }
            //         PullDowmArr.push(nextNode);
            //     }
            // }
            let PullDowmArr = this.canPullDown(closestBlock,groupNode);
            if(PullDowmArr) {
                // 可放置位置高亮
                this.changeBlockColor(3,PullDowmArr);
                this.PullDowmArr = PullDowmArr;
                this.checkBlcokColOrRow();
            }
        }
    }

    // 拿起groupNode
    groupNodePickUp(groupNode) {
        let groupMid = groupNode.getChildByName('groupMid');
        cc.tween(groupNode)
        .to(0.2, { scale:1}, { easing: 'backOut' })
        .call(() => {})
        .start();

        cc.tween(groupMid)
        .to(0.2, { y:this.pickUpHeight}, { easing: 'backOut' })
        .call(() => {})
        .start();
        this.groupBlockScale(groupMid.children,0.95);
    }

    // block 缩放
    groupBlockScale(children,scale) {
        children.forEach(element => {
            cc.tween(element)
            .to(0.2, {scale: scale}, { easing: 'backOut' })
            .call(() => {})
            .start();
        });
    }

    // 放下groupNode
    groupNodePullDown(groupNode) {
        this.groupBlockScale(groupNode.getChildByName('groupMid').children,1);
        if(this.PullDowmArr.length > 0) {
            let color = groupNode.getComponent('groupNode').color;
            cc.tween(groupNode)
            .to(0.2, { x:this.PullDowmArr[0].x, y:this.PullDowmArr[0].y-this.pickUpHeight}, { easing: 'backOut' })
            .call(() => {
                this.changeBlockColor(2,this.PullDowmArr,color);
                this.PullDowmArr = [];
                groupNode.destroy();
                this.destroyBlock();
                setTimeout(()=>{
                    if(this.moveBox.children.length == 0){
                        this.creatorBlcok();
                    }
                    this.checkGroupNodeCanPullDownBy3();
                },0)
            })
            .start()
        }else{
            cc.tween( groupNode.getChildByName('groupMid'))
            .to(0.3, { y:0}, { easing: 'backOut' })
            .call(() => {})
            .start()

            cc.tween(groupNode)
            .to(0.2, { scale:0.7}, { easing: 'backOut' })
            .call(() => {})
            .start();

            let pos = groupNode.getComponent('groupNode').pos;
            cc.tween(groupNode)
            .to(0.3, { x:pos.x, y:pos.y}, { easing: 'backOut' })
            .call(() => {})
            .start() 
        }
    }

    // 消除
    destroyBlock() {
        if(this.canDesArr.length>0) {
            for(let i=0;i<this.canDesArr.length;i++){
                this.changeBlockColor(1,this.canDesArr[i]);
            }
        }
    }

    // 检测横竖大方格是否铺满
    checkBlcokColOrRow() {
        //row
        let allBlock = this.allBlock;
        for(let i=0;i<allBlock.length;i++) {
            let row = allBlock[i];
            let rowIsOk = true;
            for(let j=0;j<row.length;j++) {
                let bgBlockParam = row[j].getComponent('bgBlock');
                if(bgBlockParam.isBlock || bgBlockParam.active == 3 || bgBlockParam.active == 4){
                }else{
                    rowIsOk = false;
                    break;
                }
            }
            if(rowIsOk){
                this.changeBlockColor(4,row);
                this.canDesArr.push(row);
            } 
        }

        // col
        for(let i=0;i<9;i++) {
            let colIsOk = true;
            let col = [];
            for(let j=0;j<9;j++) {
                col.push(allBlock[j][i]);
                let bgBlockParam = allBlock[j][i].getComponent('bgBlock');
                if(bgBlockParam.isBlock || bgBlockParam.active == 3 || bgBlockParam.active == 4){

                }else{
                    colIsOk = false;
                    break;
                }
            }
            if(colIsOk){
                this.changeBlockColor(4,col);
                this.canDesArr.push(col);
            } 
        }

        // 大方块消除
        for(let x=0;x<3;x++){
            for(let i=0;i<3;i++){
                let arr = [];
                let isOk = true;
                for(let j=0;j<3;j++){//col
                    for(let k=0;k<3;k++){//row
                        arr.push(allBlock[3*x+j][3*i+k]);
                        let bgBlockParam = allBlock[3*x+j][3*i+k].getComponent('bgBlock');
                        if(bgBlockParam.isBlock || bgBlockParam.active == 3 || bgBlockParam.active == 4){
                        }else{
                            isOk = false;
                            break;
                        }
                    }
                }
                if(isOk){
                    this.changeBlockColor(4,arr);
                    this.canDesArr.push(arr);
                } 
            }
        }

    }

    // 检测groupNode是否没有位置放了
    checkGroupNodeCanPullDown(groupNode) {
        for(let i=0;i<this.allBlock.length;i++){
            let row = this.allBlock[i];
            for(let j=0;j<row.length;j++){
                if(this.canPullDown(this.allBlock[i][j],groupNode)){
                    return true;
                }
            }
        }
        return false;
    }

    // 3个groupNode检测
    checkGroupNodeCanPullDownBy3() {
        let children = this.moveBox.children;
        let falseLen = 0;
        for(let i=0;i<children.length;i++){
            let groupNode = children[i];
            if(!this.checkGroupNodeCanPullDown(groupNode)){
                falseLen++;
                this.changeBlockColor(1,groupNode.getChildByName('groupMid').children);
            }else{
                this.changeBlockColor(2,groupNode.getChildByName('groupMid').children);
            }
        }
        if(falseLen == children.length){
            return false;
        }
        return true;
    }


    onLoad() {
        this.setBgBlcok();
        this.creatorBlcok();
    }

    update() {
        
    }

}

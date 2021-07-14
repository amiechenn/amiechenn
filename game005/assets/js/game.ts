const {ccclass, property} = cc._decorator;

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

    @property
    row: Array<object> = [];

    @property
    col: Array<object> = [];

    // 铺bg
    setBgBlcok() {
        for(let i = 0;i < 81;i++){
            let bgBlock = cc.instantiate(this.bgBlock);
            bgBlock.parent = this.bgBox;
            bgBlock.children[0].active = true;
        }
    }

    // 生产一个组合块
    creatorBlcok() {
        let groupNode = new cc.Node('Node');
        groupNode.parent = this.moveBox;
        groupNode.position = cc.v3(0,-300);
        for(let i = 0;i < 2;i++){
            let groupBlock = cc.instantiate(this.bgBlock);
            groupBlock.parent = groupNode;
            groupBlock.children[1].active = true;
            switch(i){
                case 0 :
                    groupBlock.position = cc.v3(0,0);
                   break;
                case 1 :
                    groupBlock.position = cc.v3(groupBlock.width,0);
                   break;
            }
        }
    }

    // 转世界坐标
    touchChangeLocation(event) {
        let pos = event.getLocation();
        return pos = this.node.convertToNodeSpaceAR(pos);
    }

    setTouch() {
        this.node.on('touchstart',(event) => {
            let pos = this.touchChangeLocation(event);
            
        })
        this.node.on('touchmove',(event) => {
            let pos = this.touchChangeLocation(event);
            
        })
        this.node.on('touchend',(event) => {
            let pos = this.touchChangeLocation(event);
        })
        this.node.on('touchcancel',(event) => {
           
        })
    }

    onLoad () {
        this.setBgBlcok();
        this.creatorBlcok();
    }

    start () {

    }

}
